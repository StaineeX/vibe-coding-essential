import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { BOXES } from './catalog.js';
import {
  STARTING_BALANCE,
  createSession,
  openBox,
} from './game.js';

const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT ?? 4173);
const MAX_BODY_BYTES = 4096;
const SESSION_COOKIE = 'lootbox_demo_sid';
const PUBLIC_DIR = join(import.meta.dirname, '..', 'public');
const STATIC_FILES = Object.freeze({
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
});

function applySecurityHeaders(response) {
  response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'no-referrer');
}

function sendJson(response, status, value, { noStore = false } = {}) {
  applySecurityHeaders(response);
  if (noStore) response.setHeader('Cache-Control', 'no-store');
  const body = JSON.stringify(value);
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(body);
}

function sendError(response, status, code, message) {
  sendJson(response, status, { error: { code, message } }, { noStore: true });
}

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').flatMap((part) => {
    const [key, ...rest] = part.trim().split('=');
    return key && rest.length ? [[key, rest.join('=')]] : [];
  }));
}

function sessionCookie(value, secure) {
  return `${SESSION_COOKIE}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=3600${secure ? '; Secure' : ''}`;
}

function getOrCreateSession(request, response, sessions, secureCookie) {
  const candidate = parseCookies(request.headers.cookie)[SESSION_COOKIE];
  const validId = typeof candidate === 'string' && /^[0-9a-f-]{36}$/i.test(candidate);
  let session = validId ? sessions.get(candidate) : undefined;
  if (!session) {
    session = createSession(randomUUID);
    sessions.set(session.id, session);
    response.setHeader('Set-Cookie', sessionCookie(session.id, secureCookie));
  }
  return session;
}

function publicState(session) {
  return {
    balance: session.balance,
    boxes: BOXES.map((box) => ({
      id: box.id,
      name: box.name,
      description: box.description,
      cost: box.cost,
      odds: box.odds,
    })),
    inventory: session.inventory,
    history: session.history,
  };
}

function readBody(request) {
  const declaredLength = Number(request.headers['content-length'] ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return new Promise((resolve, reject) => {
      request.resume();
      request.once('end', () => reject(Object.assign(new Error('payload too large'), { statusCode: 413, code: 'PAYLOAD_TOO_LARGE' })));
      request.once('error', reject);
    });
  }

  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    let tooLarge = false;
    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      size += Buffer.byteLength(chunk);
      if (size > MAX_BODY_BYTES) {
        tooLarge = true;
        return;
      }
      if (!tooLarge) body += chunk;
    });
    request.on('end', () => {
      if (tooLarge) {
        reject(Object.assign(new Error('payload too large'), { statusCode: 413, code: 'PAYLOAD_TOO_LARGE' }));
        return;
      }
      resolve(body);
    });
    request.on('error', reject);
  });
}

async function parseJson(request) {
  const body = await readBody(request);
  if (!body) throw Object.assign(new Error('invalid json'), { statusCode: 400, code: 'INVALID_JSON' });
  try {
    const parsed = JSON.parse(body);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not object');
    return parsed;
  } catch {
    throw Object.assign(new Error('invalid json'), { statusCode: 400, code: 'INVALID_JSON' });
  }
}

function assertOpenPayload(payload) {
  const keys = Object.keys(payload).sort();
  if (keys.length !== 2 || keys[0] !== 'boxId' || keys[1] !== 'requestId') {
    throw Object.assign(new Error('invalid fields'), { statusCode: 400, code: 'INVALID_FIELDS' });
  }
  if (typeof payload.boxId !== 'string' || typeof payload.requestId !== 'string') {
    throw Object.assign(new Error('invalid fields'), { statusCode: 400, code: 'INVALID_FIELDS' });
  }
}

function makeRateLimiter(limit, now) {
  const requests = new Map();
  return (sessionId) => {
    const current = now();
    const recent = (requests.get(sessionId) ?? []).filter((timestamp) => current - timestamp < 60000);
    if (recent.length >= limit) return false;
    recent.push(current);
    requests.set(sessionId, recent);
    return true;
  };
}

export function createServer({ env = process.env.NODE_ENV ?? 'development', rateLimit = 60, now = Date.now, secureCookie = false } = {}) {
  const sessions = new Map();
  const allowRequest = makeRateLimiter(rateLimit, now);

  return http.createServer(async (request, response) => {
    applySecurityHeaders(response);
    const url = new URL(request.url ?? '/', `http://${HOST}`);

    if (url.pathname.startsWith('/api/')) {
      const session = getOrCreateSession(request, response, sessions, secureCookie);
      if (!allowRequest(session.id)) {
        sendError(response, 429, 'RATE_LIMITED', 'Muitas requisições. Tente novamente em instantes.');
        return;
      }

      try {
        if (url.pathname === '/api/state' && request.method === 'GET') {
          sendJson(response, 200, publicState(session), { noStore: true });
          return;
        }

        if (url.pathname === '/api/open' && request.method === 'POST') {
          const payload = await parseJson(request);
          assertOpenPayload(payload);
          const result = openBox(session, payload.boxId, payload.requestId);
          sendJson(response, 200, { ...result, state: publicState(session) }, { noStore: true });
          return;
        }

        if (url.pathname === '/api/dev/reset' && request.method === 'POST') {
          if (env === 'production') {
            sendError(response, 404, 'NOT_FOUND', 'Rota não encontrada.');
            return;
          }
          session.balance = STARTING_BALANCE;
          session.inventory = [];
          session.history = [];
          session.usedRequestIds.clear();
          sendJson(response, 200, publicState(session), { noStore: true });
          return;
        }

        if (url.pathname === '/api/state' || url.pathname === '/api/open' || url.pathname === '/api/dev/reset') {
          sendError(response, 405, 'METHOD_NOT_ALLOWED', 'Método não permitido.');
          return;
        }
        sendError(response, 404, 'NOT_FOUND', 'Rota não encontrada.');
      } catch (error) {
        sendError(response, error.statusCode ?? 500, error.code ?? 'INTERNAL_ERROR', error.statusCode ? error.message : 'Erro interno.');
      }
      return;
    }

    if (request.method !== 'GET') {
      sendError(response, 405, 'METHOD_NOT_ALLOWED', 'Método não permitido.');
      return;
    }

    const file = STATIC_FILES[url.pathname];
    if (!file) {
      sendError(response, 404, 'NOT_FOUND', 'Arquivo não encontrado.');
      return;
    }
    try {
      const body = await readFile(join(PUBLIC_DIR, file[0]));
      applySecurityHeaders(response);
      response.writeHead(200, { 'content-type': file[1], 'cache-control': 'no-cache' });
      response.end(body);
    } catch {
      sendError(response, 500, 'STATIC_ERROR', 'Não foi possível carregar a interface.');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log(`Demo local em http://${HOST}:${PORT}`);
  });
}
