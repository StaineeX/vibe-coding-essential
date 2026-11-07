# Demo de caixas de futebol — Design

## Intenção

Adicionar ao catálogo uma aplicação local e auditável para testar a experiência visual de caixas, cartas e inventário no estilo de jogos de futebol. O objetivo é validar interface, regras e segurança sem envolver dinheiro, apostas reais, credenciais ou contas do eFootball.

## Objetivos

- Abrir caixas usando somente créditos virtuais de demonstração.
- Exibir cartas fictícias com raridade e valor apenas visual.
- Manter inventário e histórico da sessão.
- Tornar probabilidades e custo visíveis antes da abertura.
- Impedir saldo negativo, custo adulterado no cliente, duplicação por replay e entrada inválida.
- Incluir testes automatizados das regras e uma auditoria de segurança reproduzível.
- Usar PT-BR como idioma principal e nenhuma dependência externa obrigatória.

## Fora do escopo

- Dinheiro real, pagamento, saque, prêmio, marketplace ou conversão de créditos.
- Login, senha, token, troca ou acesso a contas do eFootball.
- Integração com Konami, Steam, Discord, PostHog, Composio ou qualquer serviço externo.
- Copiar marcas, logos, jogadores reais ou assets protegidos.
- Prometer aleatoriedade criptográfica ou fairness para uso comercial.

## Antiobjetivos

- Não chamar o protótipo de cassino real.
- Não coletar dados pessoais.
- Não colocar a autoridade de saldo, preço ou recompensa somente no JavaScript do navegador.
- Não usar `eval`, HTML inserido sem necessidade, comandos shell derivados de entrada ou armazenamento de segredos.

## Abordagens consideradas

1. **Demo estática no navegador:** simples, mas deixa saldo e recompensas totalmente manipuláveis no cliente. Rejeitada como implementação principal porque não permite auditar fronteiras de confiança.
2. **Servidor local mínimo com Node padrão + HTML/CSS/JS:** escolhido. Mantém dependências zero, centraliza regras no servidor, permite testes de API e ainda é fácil de rodar localmente.
3. **Full-stack com banco e autenticação:** mais próximo de produção, mas desnecessário para validar a experiência e adiciona superfície, dependências e dados sensíveis.

## Design escolhido

O app ficará em `apps/lootbox-demo/` e terá:

- servidor HTTP local com Node.js padrão;
- API de sessão anônima em memória;
- catálogo de caixas e cartas definido no servidor;
- endpoint de estado, concessão de créditos virtuais, abertura de caixa e histórico;
- `crypto.randomInt` no servidor para sortear a recompensa;
- `requestId` único por abertura para rejeitar replay;
- validação de método, JSON, tamanho, campos e caixa permitida;
- cabeçalhos de segurança, limite simples por sessão, respostas de erro genéricas e sem logs sensíveis;
- frontend sem dependências, com aviso explícito de “simulação local”; 
- testes com `node --test`, usando apenas a biblioteca padrão.

## Critérios de aceite

- `npm test` ou comando equivalente executa todos os testes sem falha.
- Abrir uma caixa custa exatamente o valor definido no servidor.
- Cliente não consegue escolher raridade ou recompensa.
- Repetir o mesmo `requestId` não cobra nem entrega duas vezes.
- Saldo insuficiente, caixa inexistente, método incorreto e payload inválido retornam erro seguro.
- O servidor não aceita credenciais, contas externas ou valores monetários.
- O guia explica como executar e como auditar o protótipo.

## Decisões de construção

- O servidor escuta somente em `127.0.0.1`; não há exposição na rede local.
- Cada sessão começa com 1.000 créditos virtuais. A reposição fica restrita a uma rota de desenvolvimento explicitamente marcada e não existe compra ou saque.
- A sessão usa identificador aleatório em memória e cookie `HttpOnly`, `SameSite=Strict` e `Secure` quando executada sobre HTTPS.
- A auditoria obrigatória usa testes nativos do Node.js; Strix/OWASP fica como verificação opcional para um ambiente autorizado.
- Nomes, cartas, imagens e clubes são fictícios. Não haverá jogadores, logos, contas ou dados reais do eFootball.
