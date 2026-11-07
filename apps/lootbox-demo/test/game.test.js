import test from 'node:test';
import assert from 'node:assert/strict';
import { BOXES, getBox } from '../src/catalog.js';
import {
  createSession,
  grantDemoCredits,
  openBox,
} from '../src/game.js';

test('creates a session with 1.000 créditos e inventário vazio', () => {
  const session = createSession(() => 'session-1');

  assert.equal(session.id, 'session-1');
  assert.equal(session.balance, 1000);
  assert.deepEqual(session.inventory, []);
  assert.deepEqual(session.history, []);
});

test('catálogo tem custos e probabilidades públicas válidas', () => {
  assert.ok(BOXES.length >= 2);

  for (const box of BOXES) {
    assert.ok(box.cost > 0);
    assert.equal(box.odds.reduce((sum, entry) => sum + entry.weight, 0), 10000);
    assert.ok(box.cards.length > 0);
    assert.equal(getBox(box.id).id, box.id);
  }
});

test('abre caixa, cobra custo, entrega carta e registra histórico', () => {
  const session = createSession(() => 'session-2');
  const box = BOXES[0];
  const result = openBox(session, box.id, 'request-1', {
    randomInt: () => 0,
    now: () => 123,
    id: () => 'transaction-1',
  });

  assert.equal(result.balance, 1000 - box.cost);
  assert.equal(result.card.id, box.cards[0].id);
  assert.equal(result.transactionId, 'transaction-1');
  assert.equal(session.inventory.length, 1);
  assert.equal(session.history.length, 1);
  assert.equal(session.history[0].requestId, 'request-1');
});

test('rejeita saldo insuficiente sem mutar sessão', () => {
  const session = createSession(() => 'session-3');
  session.balance = 0;

  assert.throws(
    () => openBox(session, BOXES[0].id, 'request-2'),
    (error) => error.code === 'INSUFFICIENT_BALANCE' && error.statusCode === 409,
  );
  assert.equal(session.balance, 0);
  assert.equal(session.history.length, 0);
});

test('rejeita replay sem cobrar ou duplicar recompensa', () => {
  const session = createSession(() => 'session-4');
  const box = BOXES[0];
  openBox(session, box.id, 'request-3', { randomInt: () => 0 });

  assert.throws(
    () => openBox(session, box.id, 'request-3', { randomInt: () => 0 }),
    (error) => error.code === 'REQUEST_REPLAY' && error.statusCode === 409,
  );
  assert.equal(session.history.length, 1);
  assert.equal(session.inventory.length, 1);
  assert.equal(session.balance, 1000 - box.cost);
});

test('créditos de demonstração só aceitam inteiro positivo', () => {
  const session = createSession(() => 'session-5');

  grantDemoCredits(session, 250);
  assert.equal(session.balance, 1250);
  assert.throws(
    () => grantDemoCredits(session, 0),
    (error) => error.code === 'INVALID_CREDIT_AMOUNT',
  );
  assert.throws(
    () => grantDemoCredits(session, 1.5),
    (error) => error.code === 'INVALID_CREDIT_AMOUNT',
  );
});
