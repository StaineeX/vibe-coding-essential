# Demo de caixas de futebol

Aplicação local para testar uma experiência de caixas, cartas e inventário. Ela usa somente créditos virtuais e dados fictícios. Não é cassino, não aceita dinheiro, não tem saque, não acessa contas do eFootball e não se conecta a serviços externos.

## Executar

Requisito: Node.js 20 ou superior.

```powershell
cd apps/lootbox-demo
npm test
npm start
```

Abra [http://127.0.0.1:4173](http://127.0.0.1:4173). O servidor escuta apenas no loopback; outro dispositivo da rede não deve acessá-lo.

## O que testar

1. Abra a Caixa Aurora e a Caixa Neon.
2. Observe que custo, probabilidades e saldo são visíveis antes da ação.
3. Confira a carta recebida no inventário e o histórico da sessão.
4. Tente abrir até o saldo ficar insuficiente.
5. Use “Reiniciar demo” para voltar a 1.000 créditos.
6. Abra o DevTools e confirme que a interface não usa `innerHTML` nem `localStorage` para a sessão.

## Limites de segurança

- O servidor é a autoridade do saldo, custo, carta e raridade.
- O navegador envia apenas `boxId` e um `requestId` aleatório.
- `crypto.randomInt` sorteia no servidor; o cliente não escolhe a recompensa.
- Repetir o mesmo `requestId` retorna conflito e não cobra novamente.
- A sessão é anônima, em memória, com cookie `HttpOnly` e `SameSite=Strict`.
- JSON, tamanho do corpo, métodos, campos, caminho estático e frequência são validados.
- Cabeçalhos CSP, `X-Content-Type-Options`, `X-Frame-Options` e `Referrer-Policy` são enviados.
- Nenhuma entrada da API é renderizada via `innerHTML`.

## Testes e auditoria

```powershell
npm test
npm run audit
```

Os testes cobrem saldo, custo, pesos, recompensa server-side, replay, payload grande, campos adulterados, traversal, cookie, método HTTP, rate limit e reset de desenvolvimento.

Uma análise adicional com Strix/OWASP pode ser executada somente em ambiente local autorizado e depois de revisar o comando. Ela é opcional; a suíte nativa não afirma que o protótipo é seguro para produção.

## Não transformar em produto de apostas sem uma nova revisão

Adicionar dinheiro, pagamentos, prêmios, troca de contas, autenticação, marketplace, dados pessoais ou serviços de terceiros muda o threat model e o escopo legal. Isso exigiria um novo design, revisão jurídica e auditoria independente; não é uma extensão automática desta demo.
