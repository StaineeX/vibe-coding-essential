# Vibe Coding Essential

![Vibe Coding Essential cover](assets/vibe-coding-essential-cover.png)

Curadoria bilíngue de skills, ferramentas e guardrails para Claude Code e OpenAI Codex.

English version: [README.en.md](README.en.md).

## O que este projeto resolve

Um agente de código precisa de método, contexto curto, documentação atual e verificação real. Este repositório organiza um conjunto pequeno e auditável de componentes, sem copiar repositórios inteiros nem ativar tudo globalmente.

## Perfis

| Perfil | Foco |
|---|---|
| `core` | Superpowers, Ponytail, Caveman, RTK e segurança |
| `quality` | TDD, debugging, revisão e testes |
| `context` | Planejamento persistente, Graphify e Context7 |
| `integrations` | Pacote multiplataforma de 24/25 skills e integrações opcionais |
| `engineering` | Práticas de engenharia e performance |
| `frontend` | UI/UX, React, 21st.dev e design anti-genérico |
| `browser` | Automação e testes de navegador |
| `media` | Vídeo e motion com HyperFrames |
| `discovery` | Encontrar skills sob demanda |
| `security` | Auditoria de skills e pentest autorizado com Strix |
| `experimental` | Token Optimizer, GStack e ECC; revisar antes |

## Instalação

Pré-requisitos: Git, Node.js 20+ e `npx skills`. Para revisar um perfil, execute o script; ele apenas imprime comandos remotos para inspeção.

```powershell
pwsh ./scripts/verify-manifest.ps1
pwsh ./scripts/install-profile.ps1 -Profile core -WhatIf
```

O script não executa instaladores remotos. Isso mantém a revisão explícita. Skills e hooks de terceiros podem executar comandos com os privilégios do agente; leia [docs/pt-br/security.md](docs/pt-br/security.md) antes de instalar.

## Economia de tokens

- RTK compacta a saída de comandos shell.
- Caveman reduz texto repetitivo e mantém código, paths e erros exatos.
- Planning with Files evita recomeçar depois de compactação.
- Graphify reduz exploração repetida de repositórios grandes.
- Context7 reduz consultas baseadas em documentação desatualizada.
- 21st.dev ajuda a buscar e gerar componentes React/shadcn; o MCP exige configuração própria.
- Strix executa pentest ativo: use somente em alvos próprios ou autorizados por escrito.

Menos tokens de saída não garantem menor custo total. Verifique qualidade, chamadas adicionais e taxa de retrabalho.

## Verificação

O fluxo recomendado é: entender → planejar → testar → implementar → revisar → verificar. “Feito” exige comando executado, diff revisado e evidência registrada.

## Licenças e fontes

Este catálogo é MIT. Cada item continua sob a licença do upstream. Consulte [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Estado

Catálogo em evolução. Estatísticas de estrelas são apenas um sinal de popularidade; GitHub não expõe um ranking comparável de downloads para repositórios sem assets de release.

