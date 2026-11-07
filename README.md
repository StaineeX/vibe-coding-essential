# Vibe Coding Essential

![Logo Vibe Coding Essential](assets/vibe-coding-essential-logo.png)

Curadoria bilíngue de skills, ferramentas e guardrails para Claude Code e OpenAI Codex.

English version: [README.en.md](README.en.md).

## O que este projeto resolve

Um agente de código precisa de método, contexto curto, documentação atual e verificação real. Este repositório organiza um conjunto pequeno e auditável de componentes, sem copiar repositórios inteiros nem ativar tudo globalmente.

## Perfis

| Perfil | Foco |
|---|---|
| `core` | Superpowers, Ponytail, Caveman, RTK e segurança |
| `orchestration` | Trabalho paralelo, subagentes, worktrees e revisão de integração |
| `quality` | TDD, debugging, revisão e testes |
| `context` | Planejamento persistente, Graphify e Context7 |
| `integrations` | Pacote multiplataforma de 24/25 skills e integrações opcionais |
| `engineering` | Práticas de engenharia e performance |
| `frontend` | UI/UX, React, 21st.dev e design anti-genérico |
| `browser` | Automação e testes de navegador |
| `media` | Vídeo e motion com HyperFrames |
| `discovery` | Encontrar skills sob demanda |
| `web` | Busca, scraping e interação com páginas via Firecrawl |
| `observability` | Analytics, flags, experimentos e skills via PostHog MCP |
| `security` | Auditoria de skills e pentest autorizado com Strix |
| `experimental` | Token Optimizer, GStack e ECC; revisar antes |
| `optional` | Hallmark, Claude-Mem, T3 Code e OpenBot; avaliar antes |
| `unified` | Roteamento completo; skills carregadas sob demanda |

## Instalação

Pré-requisitos: Git, Node.js 20+ e `npx skills`. Para revisar um perfil, execute o script; ele apenas imprime comandos remotos para inspeção.

```powershell
pwsh ./scripts/verify-manifest.ps1
pwsh ./scripts/install-profile.ps1 -Profile core -WhatIf
```

O script não executa instaladores remotos. Isso mantém a revisão explícita. Skills e hooks de terceiros podem executar comandos com os privilégios do agente; leia [docs/pt-br/security.md](docs/pt-br/security.md) antes de instalar.

### Instalação global para Claude e Codex

O guia completo, em português, explica os comandos para instalar nos dois diretórios globais, ativar RTK, configurar MCPs e verificar o resultado: [docs/pt-br/instalacao-global.md](docs/pt-br/instalacao-global.md).

Comando-base:

```powershell
npx -y skills@latest add obra/superpowers -a claude-code -a codex -g --copy -y
```

Repita o padrão para os pacotes desejados. `-g` significa global; `-a` escolhe os agentes; `--copy` evita depender de links do cache.

### Paralelização

Use `orchestration` quando houver tarefas independentes. Cada agente recebe escopo isolado; tarefas que compartilham arquivos ficam sequenciais. Depois, rode revisão e verificação no conjunto integrado.

## Economia de tokens

- RTK compacta a saída de comandos shell.
- Caveman reduz texto repetitivo e mantém código, paths e erros exatos.
- Planning with Files evita recomeçar depois de compactação.
- Graphify reduz exploração repetida de repositórios grandes.
- Context7 reduz consultas baseadas em documentação desatualizada.
- 21st.dev ajuda a buscar e gerar componentes React/shadcn; o MCP exige configuração própria.
- Playwright oferece MCP/CLI para automação estruturada; Firecrawl adiciona busca e scraping com API/MCP.
- PostHog e Composio exigem credenciais próprias e podem acessar dados/serviços externos.
- Strix executa pentest ativo: use somente em alvos próprios ou autorizados por escrito.

### Novos candidatos filtrados

Os seis repositórios solicitados foram comparados com o catálogo e com as rotas existentes. A seleção instalada globalmente foi deliberadamente pequena:

- **Impeccable:** instalado para Claude Code e Codex como auditoria visual opcional; hooks, Live e telemetria ficam desligados por padrão.
- **Jakub Krehel `state-machine`:** instalado para Claude Code e Codex, somente por invocação explícita, para exercitar estados reais de componentes.
- **Hallmark:** não instalado porque se sobrepõe à rota de UI atual e ao Impeccable; fica como alternativa temática.
- **Claude-Mem:** não instalado porque altera retenção, hooks, worker e fluxo de dados de memória persistente.
- **T3 Code/OpenBot:** não instalados porque são aplicativos de controle de agentes, não skills; OpenBot ainda tem licença não comercial na revisão avaliada.

O relatório auditável, com revisões fixadas, licenças, riscos e fontes primárias está em [docs/research/2026-11-07-candidate-skills.md](docs/research/2026-11-07-candidate-skills.md).

Os monorepos não são copiados para este catálogo: isso evita duplicação, bloat, permissões inesperadas e conflitos de licença.

### Como eles trabalham juntos

O fluxo unificado mantém uma única rota por responsabilidade: planejar → dividir tarefas independentes → implementar UI → auditar com Impeccable → exercitar estados com `state-machine` → verificar com Playwright → revisar segurança e qualidade. Não carregue duas skills gerais de design na mesma etapa; use Hallmark somente quando o projeto pedir seus temas.

Para entender o que foi instalado, qual agente atende cada etapa e como os componentes trabalham juntos, consulte [docs/pt-br/unified-stack.md](docs/pt-br/unified-stack.md) e [manifests/stack.json](manifests/stack.json).

## Demo local de caixas

Há também uma aplicação segura para testar UI, regras e auditoria de loot boxes sem dinheiro real, contas do eFootball ou serviços externos: [docs/pt-br/lootbox-demo.md](docs/pt-br/lootbox-demo.md). O código fica em `apps/lootbox-demo` e usa apenas Node.js padrão.

Menos tokens de saída não garantem menor custo total. Verifique qualidade, chamadas adicionais e taxa de retrabalho.

## Verificação

O fluxo recomendado é: entender → planejar → testar → implementar → revisar → verificar. “Feito” exige comando executado, diff revisado e evidência registrada.

## Licenças e fontes

Este catálogo é MIT. Cada item continua sob a licença do upstream. Consulte [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Estado

Catálogo em evolução. Estatísticas de estrelas são apenas um sinal de popularidade; GitHub não expõe um ranking comparável de downloads para repositórios sem assets de release.

