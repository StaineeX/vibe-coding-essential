const balanceElement = document.querySelector('#balance');
const boxesElement = document.querySelector('#boxes');
const inventoryElement = document.querySelector('#inventory');
const historyElement = document.querySelector('#history');
const inventoryCountElement = document.querySelector('#inventory-count');
const statusElement = document.querySelector('#status');
const resetButton = document.querySelector('#reset-button');

const formatCredits = (amount) => new Intl.NumberFormat('pt-BR').format(amount);

function setStatus(message, kind = '') {
  statusElement.textContent = message;
  statusElement.className = `status ${kind}`.trim();
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message ?? 'Não foi possível concluir a operação.');
  return data;
}

function appendText(parent, tag, text, className = '') {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  parent.append(element);
  return element;
}

function renderBoxes(boxes) {
  boxesElement.replaceChildren();
  for (const box of boxes) {
    const article = document.createElement('article');
    article.className = 'box-card';

    const cardTop = document.createElement('div');
    cardTop.className = 'box-card-top';
    appendText(cardTop, 'span', 'DROP / ' + box.id.toUpperCase(), 'card-index');
    appendText(cardTop, 'span', formatCredits(box.cost) + ' cr', 'box-cost');
    article.append(cardTop);

    const art = document.createElement('div');
    art.className = `box-art box-art-${box.id}`;
    appendText(art, 'span', '✦', 'box-symbol');
    appendText(art, 'span', box.name, 'box-art-label');
    article.append(art);

    appendText(article, 'h3', box.name);
    appendText(article, 'p', box.description, 'box-description');

    const odds = document.createElement('div');
    odds.className = 'odds-list';
    for (const entry of box.odds) {
      const row = document.createElement('div');
      row.className = 'odds-row';
      appendText(row, 'span', entry.rarity);
      appendText(row, 'strong', `${(entry.weight / 100).toFixed(2)}%`);
      odds.append(row);
    }
    article.append(odds);

    const button = document.createElement('button');
    button.className = 'button button-primary';
    button.type = 'button';
    button.textContent = 'Abrir caixa';
    button.addEventListener('click', () => openBox(box.id, button));
    article.append(button);
    boxesElement.append(article);
  }
}

function renderInventory(inventory) {
  inventoryElement.replaceChildren();
  inventoryCountElement.textContent = `${inventory.length} ${inventory.length === 1 ? 'carta' : 'cartas'}`;
  if (!inventory.length) {
    inventoryElement.className = 'inventory-grid empty-state';
    inventoryElement.textContent = 'Abra uma caixa para receber sua primeira carta.';
    return;
  }
  inventoryElement.className = 'inventory-grid';
  for (const card of inventory) {
    const item = document.createElement('article');
    item.className = 'player-card';
    item.style.setProperty('--card-color', card.color);
    appendText(item, 'span', card.rarity.toUpperCase(), 'player-rarity');
    appendText(item, 'strong', String(card.rating), 'player-rating');
    appendText(item, 'span', card.name, 'player-name');
    appendText(item, 'span', 'carta fictícia', 'player-meta');
    inventoryElement.append(item);
  }
}

function renderHistory(history) {
  historyElement.replaceChildren();
  if (!history.length) {
    historyElement.className = 'history-list empty-state';
    historyElement.textContent = 'Nenhuma abertura registrada.';
    return;
  }
  historyElement.className = 'history-list';
  for (const entry of history) {
    const item = document.createElement('div');
    item.className = 'history-item';
    appendText(item, 'strong', entry.cardId);
    appendText(item, 'span', `${entry.boxId} · -${formatCredits(entry.cost)} cr`);
    historyElement.append(item);
  }
}

function renderState(state) {
  balanceElement.textContent = formatCredits(state.balance);
  renderBoxes(state.boxes);
  renderInventory(state.inventory);
  renderHistory(state.history);
}

async function loadState() {
  try {
    const state = await api('/api/state');
    renderState(state);
    setStatus('Sessão pronta. Escolha uma caixa para começar.');
  } catch (error) {
    setStatus(error.message, 'error');
  }
}

async function openBox(boxId, button) {
  button.disabled = true;
  setStatus('Abrindo caixa e sorteando no servidor...');
  try {
    const result = await api('/api/open', {
      method: 'POST',
      body: JSON.stringify({ boxId, requestId: crypto.randomUUID() }),
    });
    renderState(result.state);
    setStatus(`Você recebeu ${result.card.name} · ${result.card.rarity}.`, 'success');
  } catch (error) {
    setStatus(error.message, 'error');
  } finally {
    button.disabled = false;
  }
}

resetButton.addEventListener('click', async () => {
  resetButton.disabled = true;
  try {
    const state = await api('/api/dev/reset', { method: 'POST' });
    renderState(state);
    setStatus('Sessão reiniciada com 1.000 créditos virtuais.');
  } catch (error) {
    setStatus(error.message, 'error');
  } finally {
    resetButton.disabled = false;
  }
});

loadState();
