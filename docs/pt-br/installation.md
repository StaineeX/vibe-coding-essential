# Instalação — PT-BR

## Ordem segura

1. Leia `manifests/skills.json`.
2. Rode `verify-manifest.ps1`.
3. Rode o perfil com `-WhatIf`.
4. Revise os comandos exibidos.
5. Execute manualmente somente os comandos aprovados.
6. Reinicie Claude Code ou Codex.

## Perfis sugeridos

Comece por `core`, `orchestration` e `quality`. Adicione `context` para repositórios grandes. Use `frontend`, `browser`, `web`, `observability` e `media` apenas quando a tarefa precisar.

O script é somente um preview seguro; não executa comandos remotos. O perfil `integrations` contém skills que podem acessar serviços externos. O perfil `security` inclui Strix, que executa pentest ativo e exige autorização explícita do alvo.

