# Stack unificada — PT-BR

“Todos juntos” significa roteamento coordenado, não carregar todas as instruções em toda chamada. Claude Code e Codex usam a mesma arquitetura, mas cada cliente mantém seus próprios arquivos globais e configuração MCP.

## Arquitetura

| Camada | Responsabilidade | Componentes |
|---|---|---|
| Planejamento | definir escopo, riscos e critérios | Planning with Files, Writing Plans |
| Paralelismo | dividir tarefas independentes | Superpowers, Cavecrew, worktrees |
| Execução | implementar no domínio certo | frontend, browser, web, media, apps |
| Contexto | reduzir exploração e desatualização | Graphify, Context7, RTK |
| Qualidade | testar, revisar e integrar | TDD, Testing Best Practices, Code Review |
| Segurança | auditar skills e aplicações | Agent Security Skills, Strix |
| Verificação | provar que o resultado funciona | Verification Before Completion |

## Fluxo padrão

1. **Entender:** identificar objetivo, arquivos, dependências e restrições.
2. **Planejar:** criar plano curto e critérios verificáveis.
3. **Dividir:** separar somente tarefas independentes.
4. **Executar:** cada agente recebe escopo, arquivos e resultado esperado.
5. **Integrar:** resolver conflitos em uma etapa coordenada e sequencial.
6. **Revisar:** rodar testes, revisão de código e checagem de segurança.
7. **Verificar:** executar os comandos finais e registrar evidências.

## Regras de paralelização

- Paralelo: documentação independente, testes de módulos diferentes, pesquisa separada e componentes sem arquivos compartilhados.
- Sequencial: migrações, alterações no mesmo arquivo, decisões de arquitetura, integração e publicação.
- Cada worker deve informar: escopo, arquivos alterados, testes executados, riscos e commit.
- O coordenador verifica conflitos; não aceite “terminado” sem teste ou evidência.
- Acesso externo, envio de dados, analytics, OAuth e pentest exigem aprovação explícita.

## Roteamento por tarefa

- **UI:** 21st.dev, UI/UX Pro Max, Design Taste e Vercel.
- **Navegador:** Playwright para testes estruturados; agent-browser para automação geral.
- **Web:** Firecrawl para busca/scraping; Context7 para documentação atual.
- **Produto:** PostHog para analytics, flags, experimentos e replay; Composio para apps externos autenticados.
- **Mídia:** HyperFrames para vídeo, motion graphics e legendas via código.
- **Qualidade:** TDD, testes, revisão e verificação.
- **Segurança:** auditoria de skills e Strix somente em alvos autorizados.
- **Descoberta:** Find Skills quando a habilidade exata ainda não estiver no catálogo; o upstream atual precisa de correção YAML antes da instalação.

## Como ativar

O perfil `unified` lista todos os componentes aprovados, mas não executa instaladores remotos nem configura credenciais automaticamente:

```powershell
pwsh ./scripts/install-profile.ps1 -Profile unified -WhatIf
```

Para instalar globalmente nos dois agentes, siga [instalacao-global.md](instalacao-global.md). O roteamento que deve ser carregado por cada cliente está em [`AGENTS.md`](../../AGENTS.md), [`CLAUDE.md`](../../CLAUDE.md) e [`manifests/stack.json`](../../manifests/stack.json).
