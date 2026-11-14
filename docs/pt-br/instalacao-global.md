# Instalação global — Claude Code + OpenAI Codex

Este guia instala as skills nos diretórios globais dos dois agentes e deixa os MCPs opcionais separados. O catálogo não copia os monorepos inteiros: instala apenas as skills necessárias e referencia os servidores oficiais.

## 1. Pré-requisitos

Abra o PowerShell e confirme:

```powershell
node --version       # Node.js 20+
npm --version
git --version
```

Para os recursos opcionais:

- Docker: Firecrawl local e Strix.
- Chrome/Chromium: Playwright e agent-browser.
- `uv`: Strix.
- Conta/API key: Firecrawl, PostHog, Composio e 21st.dev.

O diretório global do Codex é `$HOME\.agents\skills`; o do Claude Code é `$HOME\.claude\skills`. O instalador abaixo grava nos dois com `-a claude-code -a codex -g`.

## 2. Instalar a base global

Execute em um terminal novo:

```powershell
npx -y skills@latest add obra/superpowers -a claude-code -a codex -g --copy -y
npx -y skills@latest add DietrichGebert/ponytail -a claude-code -a codex -g --copy -y
npx -y skills@latest add JuliusBrussee/caveman -a claude-code -a codex -g --copy -y
npx -y skills@latest add howardhsieh/agent-security-skills -a claude-code -a codex -g --copy -y
npx -y skills@latest add adewale/testing-best-practices -a claude-code -a codex -g --copy -y
npx -y skills@latest add OthmanAdi/planning-with-files -a claude-code -a codex -g --copy -y
npx -y skills@latest add Graphify-Labs/graphify -a claude-code -a codex -g --copy -y
```

`--copy` deixa uma cópia independente em cada diretório do agente. Sem essa opção, alguns instaladores podem criar links para o cache local.

## 3. Instalar a camada de trabalho paralelo

Use `dispatching-parallel-agents` para tarefas independentes, `using-git-worktrees` para isolamento e `subagent-driven-development` para coordenar a integração:

```powershell
npx -y skills@latest add obra/superpowers `
  --skill dispatching-parallel-agents `
  --skill subagent-driven-development `
  --skill using-git-worktrees `
  -a claude-code -a codex -g --copy -y

npx -y skills@latest add JuliusBrussee/caveman `
  --skill cavecrew `
  -a claude-code -a codex -g --copy -y
```

Regra: agentes podem trabalhar em paralelo somente quando não editam os mesmos arquivos e não dependem da saída uns dos outros. Integração, revisão e verificação final são sequenciais.

## 4. Instalar qualidade, frontend e navegador

```powershell
npx -y skills@latest add mattpocock/skills -a claude-code -a codex -g --copy -y
npx -y skills@latest add addyosmani/agent-skills -a claude-code -a codex -g --copy -y
npx -y skills@latest add vercel-labs/agent-skills -a claude-code -a codex -g --copy -y
npx -y skills@latest add nextlevelbuilder/ui-ux-pro-max-skill -a claude-code -a codex -g --copy -y
npx -y skills@latest add Leonxlnx/taste-skill --skill design-taste-frontend -a claude-code -a codex -g --copy -y
npx -y skills@latest add 21st-dev/skill --all -a claude-code -a codex -g --copy -y
npx -y skills@latest add pbakaus/impeccable --skill impeccable -a claude-code -a codex -g --copy -y
npx -y skills@latest add jakubkrehel/skills --skill state-machine -a claude-code -a codex -g --copy -y
npx -y skills@latest add vercel-labs/agent-browser -a claude-code -a codex -g --copy -y
npm install --global agent-browser @playwright/cli
agent-browser install
```

Para vídeo/motion, instale apenas quando necessário:

```powershell
npx -y skills@latest add heygen-com/hyperframes -a claude-code -a codex -g --copy -y
```

Impeccable e `state-machine` foram instalados globalmente nesta máquina. O catálogo usa Impeccable apenas na rota `frontend-audit` e `state-machine` apenas na rota `frontend-states`; não carregue ambos como substitutos de toda a camada de UI.

Não instale Hallmark junto com Impeccable por padrão. Claude-Mem, T3 Code e OpenBot estão documentados como opções, mas exigem uma decisão separada sobre memória persistente, permissões do host e licença.

## 5. Instalar web, integrações e segurança opcional

```powershell
npx -y skills@latest add firecrawl/firecrawl `
  --skill firecrawl-build `
  --skill firecrawl-build-interact `
  --skill firecrawl-build-onboarding `
  --skill firecrawl-build-scrape `
  --skill firecrawl-build-search `
  -a claude-code -a codex -g --copy -y

npx -y skills@latest add composiohq/skills --skill composio -a claude-code -a codex -g --copy -y
npx -y skills@latest add usestrix/strix --all -a claude-code -a codex -g --copy -y
```

Strix é pentest ativo: só rode contra aplicações próprias ou com autorização escrita. Não instale o monorepo AGPL do Firecrawl dentro deste catálogo MIT; use as skills e o MCP oficial.

## 6. Reduzir saída e consumo de contexto

RTK reduz ruído de terminal antes do modelo receber a saída. A redução de texto não garante redução de cobrança: meça qualidade, chamadas e retrabalho.

```powershell
winget install --id rtk-ai.rtk -e --accept-source-agreements --accept-package-agreements
```

Feche e abra o terminal, então:

```powershell
rtk init -g
rtk init -g --codex
rtk gain
```

Se `rtk` não for encontrado, abra uma nova janela do PowerShell para atualizar o `PATH`.

## 7. MCPs oficiais

Skills e MCPs são camadas diferentes. Skills ensinam o agente; MCPs dão acesso a ferramentas e dados externos.

### Codex e Claude: documentação OpenAI

```powershell
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
claude mcp add --transport http --scope user openaiDeveloperDocs https://developers.openai.com/mcp
```

### Endpoints do stack

| Serviço | Endpoint/ferramenta | Credencial |
|---|---|---|
| Playwright | `npx @playwright/mcp@latest` | navegador local |
| Firecrawl | `https://mcp.firecrawl.dev/v2/mcp-oauth` | OAuth/API key |
| PostHog | `https://mcp.posthog.com/mcp?mode=cli` | API key/projeto |
| Composio | `https://connect.composio.dev/mcp` | conexão OAuth |
| Context7 | MCP oficial do upstream | conforme o fornecedor |
| 21st.dev | MCP/CLI oficial | API key |

O formato exato do comando MCP pode variar conforme a versão do cliente. Consulte `codex mcp --help` ou `claude mcp --help` antes de registrar servidores adicionais. O manifesto sem segredos está em [`manifests/stack.json`](../../manifests/stack.json).

## 8. Verificar a instalação

```powershell
npx -y skills@latest list
Get-ChildItem "$HOME\.agents\skills" | Select-Object Name
Get-ChildItem "$HOME\.claude\skills" | Select-Object Name
codex mcp list
claude mcp list
```

Depois reinicie Claude Code e Codex. Em uma conversa nova, peça primeiro planejamento; para duas tarefas independentes, peça divisão em agentes/worktrees; ao final, peça testes, revisão e verificação.

## 9. Instalar o perfil completo deste repo

O manifesto lista tudo, inclusive itens experimentais. Para revisar os comandos sem executá-los:

```powershell
pwsh ./scripts/verify-manifest.ps1
pwsh ./scripts/install-profile.ps1 -Profile unified -WhatIf
```

O script é deliberadamente um gerador de comandos: ele não instala código remoto automaticamente. Revise cada item antes de executar. `ai-skills-24` é opt-in por incluir integrações externas e permissões amplas.

### Find Skills e Jev

O perfil `discovery` mostra o comando do Find Skills oficial da Vercel. O perfil `optional` inclui Jev via skill `typesafe-ai`. Para instalação global nos dois agentes:

```powershell
npx skills add vercel-labs/skills --skill find-skills -a claude-code -a codex -g --copy -y
npx skills add typesafe-ai/skills --skill typesafe-ai -a claude-code -a codex -g --copy -y
```

Para chamar a API do Jev, configure `TYPESAFE_API_KEY` no ambiente local. Revise o contexto antes de enviá-lo à TypeSafe.

### Skill universal `vibe-coding-essential`

Este repositório também é uma skill: `skills/vibe-coding-essential/SKILL.md` roteia cada etapa da tarefa para uma skill do catálogo. Instale nos dois agentes:

```powershell
npx -y skills@latest add StaineeX/vibe-coding-essential --skill vibe-coding-essential -a claude-code -a codex -g --copy -y
```

### Compactação verbatim (`fast-jev-compaction`)

Plugin do Claude Code (não é skill; Codex não suporta). Substitui o resumo do `/compact` por remoção de chamadas de ferramenta antigas, mantendo o resto palavra por palavra. Requer Claude Code 2.1.274+ e function hooks:

```powershell
claude plugin marketplace add tamaratran/fast-jev-compaction
claude plugin install fast-jev-compaction@fast-jev-compaction
```

Em `~/.claude/settings.json`, adicione `"env": { "CLAUDE_CODE_ENABLE_FUNCTION_HOOKS": "1" }`. Depois configure a chave com `/plugin configure fast-jev-compaction@fast-jev-compaction` ou pela variável `TYPESAFE_API_KEY`. Sem chave, o plugin volta ao resumo padrão. Com chave, a conversa (abreviada) é enviada para `api.typesafe.ai`.

### Modelos gratuitos via FreeLLMAPI

Não é skill: é um proxy local que junta os planos gratuitos de vários provedores em um endpoint compatível com OpenAI e Anthropic, com failover automático. Instalação com Docker:

```powershell
mkdir $HOMEreellmapi; cd $HOMEreellmapi
# copie o docker-compose.yml do repositório tashfeenahmed/freellmapi para esta pasta
$b = New-Object Byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b)
"ENCRYPTION_KEY=$(-join ($b | % { '{0:x2}' -f $_ }))`nPORT=3001" | Out-File -Encoding utf8 .env
docker compose up -d
```

Abra http://localhost:3001, crie a conta local, adicione as chaves dos provedores na página **Keys** e copie a chave unificada.

- Não rode `npx freellmapi setup-claude` sem decidir: ele troca o modelo do Claude Code global pelos modelos gratuitos. Prefira o comando `launch`, que vale só para aquela sessão.
- A porta fica presa em `127.0.0.1`. Não use `HOST_BIND=0.0.0.0` fora de rede confiável.
- O perfil `autoupdate` (Watchtower) usa o socket do Docker; fica desligado.
- Uso pessoal/experimental. Cada provedor mantém os próprios termos de uso.

#### Cliente recomendado: OpenCode

O OpenCode usa o FreeLLMAPI sem mexer no Claude Code e lê as skills globais de `~/.agents/skills` e `~/.claude/skills`.

```powershell
npm install -g opencode-ai
```

Em `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "freellmapi/auto",
  "provider": {
    "freellmapi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "FreeLLMAPI",
      "options": { "baseURL": "http://localhost:3001/v1" },
      "models": { "auto": { "name": "FreeLLMAPI auto (router)" }, "fusion": { "name": "FreeLLMAPI fusion" } }
    }
  }
}
```

Depois rode `opencode auth login`, escolha **Other**, informe `freellmapi` e cole a chave unificada do dashboard. A chave fica no `auth.json` do OpenCode, fora do repositório. Alternativa: `npx freellmapi setup-opencode --url http://localhost:3001 --api-key <chave>` grava os dois arquivos com o catálogo completo.

## Diagnóstico rápido

- Skill aparece no Codex, mas não no Claude: repita com `-a claude-code -a codex -g --copy` e confirme os dois diretórios.
- MCP não conecta: confira endpoint, credencial, `codex mcp list`/`claude mcp list` e reinicie o cliente.
- Terminal não mostra `rtk`: abra um novo PowerShell após o `winget`.
- Browser não abre: execute `agent-browser install` e confirme que o Playwright tem seus browsers instalados.
- Paralelização conflita: separe worktrees e mantenha arquivos compartilhados para a etapa sequencial de integração.
