# Demo de Caixas de Futebol Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma demo web local de caixas e cartas fictícias de futebol, com créditos virtuais, regras server-side, testes e auditoria de segurança.

**Architecture:** Um servidor Node.js padrão escutando somente em `127.0.0.1` serve arquivos estáticos e uma API anônima em memória. O catálogo, o sorteio, o custo, o saldo e o histórico ficam no servidor; o navegador apenas apresenta estado e envia `boxId`/`requestId`.

**Tech Stack:** Node.js 20+, `node:http`, `node:crypto`, `node:test`, HTML/CSS/JavaScript sem dependências externas.

**Spec:** `docs/superpowers/specs/2026-11-07-lootbox-futebol-demo-design.md`

## Global Constraints

- O servidor escuta somente em `127.0.0.1`.
- Cada sessão começa com 1.000 créditos virtuais.
- Não existem dinheiro real, pagamentos, saque, marketplace, contas ou credenciais.
- Todas as cartas, nomes, clubes e imagens são fictícios.
- O sorteio usa `crypto.randomInt` no servidor.
- O cookie de sessão é `HttpOnly`, `SameSite=Strict` e `Secure` quando HTTPS for usado.
- Não adicionar dependências obrigatórias nem serviços externos.
- Não usar `eval`, `innerHTML` para dados da API, SQL, shell derivado de input ou segredos.

## Review Focus

- **Replay:** o mesmo `requestId` não pode cobrar ou entregar duas vezes; testar no Task 3.
- **Autoridade do cliente:** `boxId`, custo, raridade e recompensa enviados pelo cliente não podem alterar a regra; testar no Task 2/3.
- **Entrada HTTP:** método, JSON, tamanho, campos desconhecidos e IDs inválidos devem retornar erro seguro; testar no Task 3.
- **Caminho estático:** `..`, barras invertidas e arquivos desconhecidos não podem escapar de `public/`; testar no Task 3.
- **Sessão e abuso:** cookie não deve aceitar valor arbitrário como identidade e aberturas rápidas devem ser limitadas; testar no Task 3.

### Task 1: Catálogo e regras puras

**Files:**
- Create: `apps/lootbox-demo/package.json`
- Create: `apps/lootbox-demo/src/catalog.js`
- Create: `apps/lootbox-demo/src/game.js`
- Test: `apps/lootbox-demo/test/game.test.js`

**Interfaces:**
- Produces `getBox(boxId)`, `createSession()`, `openBox(session, boxId, requestId, deps)`, `grantDemoCredits(session, amount)`.
- `createSession()` retorna `{ id, balance, inventory, history, usedRequestIds, openedAt }`.
- `openBox` retorna `{ card, balance, transactionId }` ou lança erro com `statusCode` e `code` estáveis.

- [ ] **Step 1: Escrever testes falhando** para saldo inicial de `1000`, custo de caixa, sorteio server-side por faixa, inventário, histórico, saldo insuficiente e replay.
- [ ] **Step 2: Rodar `node --test test/game.test.js`** e confirmar falha porque os módulos ainda não existem.
- [ ] **Step 3: Implementar `catalog.js` e `game.js`** com caixas/cartas fictícias, probabilidades inteiras que somam 10.000 pontos-base, `crypto.randomInt`, transação atômica em memória e limite de histórico.
- [ ] **Step 4: Rodar `node --test test/game.test.js`** e confirmar todos os testes passando.
- [ ] **Step 5: Commitar** `feat: add secure virtual lootbox rules`.

### Task 2: API local e cabeçalhos de segurança

**Files:**
- Create: `apps/lootbox-demo/src/server.js`
- Create: `apps/lootbox-demo/test/server.test.js`

**Interfaces:**
- `createServer(options)` retorna um `http.Server` configurado para `127.0.0.1`.
- `GET /api/state` retorna saldo, catálogo público, inventário e histórico sem IDs internos sensíveis.
- `POST /api/open` aceita somente `{ "boxId": string, "requestId": string }`.
- `POST /api/dev/reset` existe apenas fora de `production` e reseta a sessão atual para 1.000 créditos.

- [ ] **Step 1: Escrever testes falhando** para cookie de sessão seguro, rotas válidas, método incorreto, JSON inválido, corpo acima do limite, caixa inválida, replay e limite de requisições.
- [ ] **Step 2: Rodar `node --test test/server.test.js`** e confirmar falha pela ausência do servidor.
- [ ] **Step 3: Implementar `server.js`** com parsing limitado, cookie aleatório em memória, allowlist de rotas/arquivos, `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Cache-Control: no-store` para API, erros genéricos e bind local.
- [ ] **Step 4: Rodar `node --test test/server.test.js`** e confirmar todos os testes passando.
- [ ] **Step 5: Commitar** `feat: add local lootbox api with security boundaries`.

### Task 3: Interface PT-BR e execução

**Files:**
- Create: `apps/lootbox-demo/public/index.html`
- Create: `apps/lootbox-demo/public/styles.css`
- Create: `apps/lootbox-demo/public/app.js`
- Modify: `apps/lootbox-demo/package.json`
- Create: `docs/pt-br/lootbox-demo.md`
- Modify: `README.md`

**Interfaces:**
- `npm start` inicia o servidor local.
- `npm test` executa todos os testes com `node --test`.
- `npm run audit` executa os testes e verificações estáticas locais.

- [ ] **Step 1: Escrever o shell visual** com aviso “simulação local”, saldo, cards de caixas, probabilidades/custo, inventário e histórico; sem login, compra, saque ou conta real.
- [ ] **Step 2: Implementar `app.js`** com `fetch`, renderização por `textContent`, `crypto.randomUUID()` para `requestId`, estado de carregamento e mensagens de erro sem expor stack trace.
- [ ] **Step 3: Implementar `styles.css`** com visual escuro de cards colecionáveis, responsivo e acessível por teclado; sem assets ou marcas de terceiros.
- [ ] **Step 4: Documentar** execução, limites, testes, threat model, auditoria opcional com Strix/OWASP e comandos de desligamento.
- [ ] **Step 5: Rodar `npm test`, `npm run audit` e `git diff --check`**; confirmar saída sem falhas.
- [ ] **Step 6: Commitar** `feat: add portuguese virtual lootbox demo`.

### Task 4: Revisão integrada e publicação

**Files:**
- Modify: `docs/superpowers/plans/2026-11-07-lootbox-futebol-demo.md`
- Modify: `README.md` se o link/documentação precisar de ajuste

- [ ] **Step 1: Executar `npm test` em `apps/lootbox-demo`.**
- [ ] **Step 2: Executar `npm run audit` e revisar o código por XSS, traversal, replay, autorização e segredos.**
- [ ] **Step 3: Iniciar o app, fazer uma abertura manual e encerrá-lo; confirmar que só responde em `127.0.0.1`.**
- [ ] **Step 4: Rodar `git diff --check` e verificar `git status`/diff completo.**
- [ ] **Step 5: Atualizar esta lista com os resultados e só então publicar o commit no GitHub.**
