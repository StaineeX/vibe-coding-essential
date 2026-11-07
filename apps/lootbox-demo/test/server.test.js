import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
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

function request(path, { method = 'GET', body, headers = {}, url = baseUrl } = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(path, url);
    const payload = body === undefined ? undefined : JSON.stringify(body);
    const req = http.request(target, {
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
        resolve({
          status: res.statusCode,
          headers: res.headers,
          json: data ? JSON.parse(data) : null,
        });
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
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
