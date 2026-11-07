import { randomInt, randomUUID } from 'node:crypto';
import { drawCard, getBox } from './catalog.js';

export const STARTING_BALANCE = 1000;
const MAX_CREDITS = 1000000;
const MAX_HISTORY = 50;

function gameError(code, message, statusCode) {
  const error = new Error(message);
  error.code = code;
  error.statusCode = statusCode;
  return error;
}

function clone(value) {
  return structuredClone(value);
}

export function createSession(id = randomUUID) {
  return {
    id: id(),
    balance: STARTING_BALANCE,
    inventory: [],
    history: [],
    usedRequestIds: new Set(),
    openedAt: Date.now(),
  };
}

export function grantDemoCredits(session, amount) {
  if (!Number.isSafeInteger(amount) || amount < 1 || amount > MAX_CREDITS) {
    throw gameError('INVALID_CREDIT_AMOUNT', 'Crédito de demonstração inválido.', 400);
  }
  session.balance += amount;
  return session.balance;
}

export function openBox(session, boxId, requestId, deps = {}) {
  const box = getBox(boxId);
  const nextRandomInt = deps.randomInt ?? randomInt;
  const now = deps.now ?? Date.now;
  const makeId = deps.id ?? randomUUID;

  if (!box) {
    throw gameError('BOX_NOT_FOUND', 'Caixa não encontrada.', 404);
  }
  if (typeof requestId !== 'string' || !/^[A-Za-z0-9_-]{8,128}$/.test(requestId)) {
    throw gameError('INVALID_REQUEST_ID', 'Identificador de requisição inválido.', 400);
  }
  if (session.usedRequestIds.has(requestId)) {
    throw gameError('REQUEST_REPLAY', 'Requisição já processada.', 409);
  }
  if (session.balance < box.cost) {
    throw gameError('INSUFFICIENT_BALANCE', 'Saldo virtual insuficiente.', 409);
  }

  const card = drawCard(box, nextRandomInt);
  const transactionId = makeId();
  session.usedRequestIds.add(requestId);
  session.balance -= box.cost;
  session.inventory.unshift({ ...clone(card), obtainedAt: now(), transactionId });
  session.history.unshift({
    transactionId,
    requestId,
    boxId: box.id,
    cardId: card.id,
    rarity: card.rarity,
    cost: box.cost,
    createdAt: now(),
  });
  session.history = session.history.slice(0, MAX_HISTORY);

  return { card: clone(card), balance: session.balance, transactionId };
}
