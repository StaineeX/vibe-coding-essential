const cards = {
  aurora: [
    { id: 'aurora-keeper', name: 'Goleiro Aurora', rarity: 'comum', color: '#8b9bb4', rating: 78 },
    { id: 'aurora-runner', name: 'Corredor Aurora', rarity: 'raro', color: '#4ba3ff', rating: 84 },
    { id: 'aurora-orbit', name: 'Órbita Aurora', rarity: 'épico', color: '#a86cff', rating: 91 },
    { id: 'aurora-signal', name: 'Sinal Aurora', rarity: 'lendário', color: '#ffc857', rating: 97 },
  ],
  neon: [
    { id: 'neon-anchor', name: 'Âncora Neon', rarity: 'comum', color: '#8b9bb4', rating: 80 },
    { id: 'neon-pulse', name: 'Pulso Neon', rarity: 'raro', color: '#4ba3ff', rating: 86 },
    { id: 'neon-comet', name: 'Cometa Neon', rarity: 'épico', color: '#a86cff', rating: 93 },
    { id: 'neon-prime', name: 'Prime Neon', rarity: 'lendário', color: '#ffc857', rating: 99 },
  ],
};

export const BOXES = Object.freeze([
  Object.freeze({
    id: 'aurora',
    name: 'Caixa Aurora',
    description: 'Cartas de uma noite elétrica e fictícia.',
    cost: 100,
    odds: Object.freeze([
      Object.freeze({ rarity: 'comum', weight: 7000 }),
      Object.freeze({ rarity: 'raro', weight: 2200 }),
      Object.freeze({ rarity: 'épico', weight: 700 }),
      Object.freeze({ rarity: 'lendário', weight: 100 }),
    ]),
    cards: Object.freeze(cards.aurora.map((card) => Object.freeze(card))),
  }),
  Object.freeze({
    id: 'neon',
    name: 'Caixa Neon',
    description: 'Edição de alta voltagem com cartas fictícias.',
    cost: 250,
    odds: Object.freeze([
      Object.freeze({ rarity: 'comum', weight: 5200 }),
      Object.freeze({ rarity: 'raro', weight: 3000 }),
      Object.freeze({ rarity: 'épico', weight: 1500 }),
      Object.freeze({ rarity: 'lendário', weight: 300 }),
    ]),
    cards: Object.freeze(cards.neon.map((card) => Object.freeze(card))),
  }),
]);

export function getBox(boxId) {
  return BOXES.find((box) => box.id === boxId);
}

export function drawCard(box, randomInt) {
  const roll = randomInt(10000);
  let cursor = 0;
  let rarity = box.odds[box.odds.length - 1].rarity;

  for (const entry of box.odds) {
    cursor += entry.weight;
    if (roll < cursor) {
      rarity = entry.rarity;
      break;
    }
  }

  const eligible = box.cards.filter((card) => card.rarity === rarity);
  return eligible[randomInt(eligible.length)];
}
