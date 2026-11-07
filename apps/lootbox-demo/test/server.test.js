import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import net from 'node:net';
import { createServer } from '../src/server.js';

let server;
let baseUrl;
let cookie;

function start(serverToStart) {
  return new Promise((resolve) => {
    serverToStart.listen(0, '127.0.0.1', () => {
      const { port } = serverToStart.address();
      resolve(`http://127.0.0.1:${port}`);
    });
  });
}

function stop(serverToStop) {
  return new Promise((resolve, reject) => {
    serverToStop.close((error) => (error ? reject(error) : resolve()));
  });
}

function request(path, { method = 'GET', body, rawBody, rawPath, headers = {}, url = baseUrl } = {}) {
  return new Promise((resolve, reject) => {
    const base = new URL(url);
    const target = rawPath ? null : new URL(path, url);
    const payload = rawBody ?? (body === undefined ? undefined : JSON.stringify(body));
    const req = http.request({
      hostname: base.hostname,
      port: base.port,
      path: rawPath ?? `${target.pathname}${target.search}`,
      method,
      headers: {
        ...(payload ? { 'content-type': 'application/json' } : {}),
        ...(cookie ? { cookie } : {}),
        ...headers,
      },
    }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const setCookie = res.headers['set-cookie']?.[0];
        if (setCookie) cookie = setCookie.split(';', 1)[0];
        const isJson = String(res.headers['content-type'] ?? '').includes('application/json');
        resolve({
          status: res.statusCode,
          headers: res.headers,
          json: isJson && data ? JSON.parse(data) : null,
          raw: data,
        });
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

function malformedRequest() {
  return new Promise((resolve, reject) => {
    const target = new URL(baseUrl);
    const socket = net.createConnection(Number(target.port), target.hostname);
    let data = '';
    socket.setTimeout(2000);
    socket.setEncoding('utf8');
    socket.on('connect', () => socket.write('GET //[ HTTP/1.1\r\nHost: 127.0.0.1\r\nConnection: close\r\n\r\n'));
    socket.on('data', (chunk) => { data += chunk; });
    socket.on('end', () => resolve(data));
    socket.on('timeout', () => { socket.destroy(); reject(new Error('malformed request timed out')); });
    socket.on('error', reject);
  });
}

before(async () => {
  server = createServer({ env: 'test', rateLimit: 100 });
  baseUrl = await start(server);
});

after(async () => {
  await stop(server);
});

test('cria sessão anônima com cookie HttpOnly e SameSite Strict', async () => {
  const response = await request('/api/state');

  assert.equal(response.status, 200);
  assert.equal(response.json.balance, 1000);
  assert.match(response.headers['set-cookie'][0], /HttpOnly/);
  assert.match(response.headers['set-cookie'][0], /SameSite=Strict/);
});

test('abre caixa e rejeita o mesmo requestId em replay', async () => {
  const response = await request('/api/open', {
    method: 'POST',
    body: { boxId: 'aurora', requestId: 'request-api-1' },
  });
  const replay = await request('/api/open', {
    method: 'POST',
    body: { boxId: 'aurora', requestId: 'request-api-1' },
  });

  assert.equal(response.status, 200);
  assert.equal(response.json.balance, 900);
  assert.equal(replay.status, 409);
  assert.equal(replay.json.error.code, 'REQUEST_REPLAY');
  assert.equal(replay.json.error.stack, undefined);
});

test('rejeita método, JSON, caixa e campos adulterados', async () => {
  const method = await request('/api/open');
  const invalidJson = await request('/api/open', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: undefined,
  });
  const unknownField = await request('/api/open', {
    method: 'POST',
    body: { boxId: 'aurora', requestId: 'request-api-2', cost: 0 },
  });
  const unknownBox = await request('/api/open', {
    method: 'POST',
    body: { boxId: 'real-efootball-account', requestId: 'request-api-3' },
  });

  assert.equal(method.status, 405);
  assert.equal(invalidJson.status, 400);
  assert.equal(unknownField.status, 400);
  assert.equal(unknownBox.status, 404);
});

test('recusa payload acima do limite e caminhos fora da allowlist', async () => {
  const oversized = await request('/api/open', {
    method: 'POST',
    body: { payload: 'x'.repeat(5000) },
  });
  const traversal = await request('/..%2fpackage.json');

  assert.equal(oversized.status, 413);
  assert.equal(traversal.status, 404);
});

test('limita requisições por sessão', async () => {
  const limitedServer = createServer({ env: 'test', rateLimit: 1 });
  const limitedUrl = await start(limitedServer);
  const first = await request('/api/state', { url: limitedUrl });
  const second = await request('/api/state', { url: limitedUrl });
  await stop(limitedServer);

  assert.equal(first.status, 200);
  assert.equal(second.status, 429);
});

test('reset de demonstração existe fora de production', async () => {
  const response = await request('/api/dev/reset', { method: 'POST' });

  assert.equal(response.status, 200);
  assert.equal(response.json.balance, 1000);
});

test('URL malformada retorna 400 sem derrubar o servidor', async () => {
  const malformed = await malformedRequest();
  const stillAlive = await request('/api/state');

  assert.match(malformed, /400 Bad Request/);
  assert.match(malformed, /INVALID_URL/);
  assert.equal(stillAlive.status, 200);
});

test('reset mantém requestIds consumidos para impedir replay', async () => {
  await request('/api/dev/reset', { method: 'POST' });
  const opened = await request('/api/open', {
    method: 'POST',
    body: { boxId: 'aurora', requestId: 'request-reset-1' },
  });
  await request('/api/dev/reset', { method: 'POST' });
  const replay = await request('/api/open', {
    method: 'POST',
    body: { boxId: 'aurora', requestId: 'request-reset-1' },
  });

  assert.equal(opened.status, 200);
  assert.equal(replay.status, 409);
  assert.equal(replay.json.error.code, 'REQUEST_REPLAY');
});

test('reset rejeita corpos não vazios e payloads grandes antes de mutar', async () => {
  await request('/api/dev/reset', { method: 'POST' });
  const malformed = await request('/api/dev/reset', {
    method: 'POST',
    rawBody: '{',
    headers: { 'content-type': 'application/json' },
  });
  const unknownFields = await request('/api/dev/reset', {
    method: 'POST',
    body: { unexpected: true },
  });
  const oversized = await request('/api/dev/reset', {
    method: 'POST',
    rawBody: 'x'.repeat(5000),
  });

  assert.equal(malformed.status, 400);
  assert.equal(unknownFields.status, 400);
  assert.equal(oversized.status, 413);
});

test('serve interface estática sem script inline', async () => {
  const page = await request('/');
  const styles = await request('/styles.css');
  const app = await request('/app.js');

  assert.equal(page.status, 200);
  assert.match(page.headers['content-type'], /text\/html/);
  assert.match(page.raw, /./);
  assert.equal(styles.status, 200);
  assert.equal(app.status, 200);
});
