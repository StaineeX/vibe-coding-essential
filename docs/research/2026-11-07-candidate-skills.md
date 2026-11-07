# Pesquisa de candidatos — 2026-11-07

## Escopo e método

Pesquisa documental dos seis repositórios solicitados, comparada com `C:\Users\SnyX\Documents\Codex\2026-11-07\pro\manifests\skills.json` e com o roteamento do `AGENTS.md` local. Nenhum pacote, plugin, runtime, hook ou extensão foi instalado; nenhum comando de instalação abaixo foi executado. Não houve login, clone, push ou execução de scripts dos candidatos.

Foram consultados somente GitHub oficial, API pública do GitHub e arquivos dos próprios repositórios: README, LICENSE, package.json, documentação e definições de skills. As respostas HTTPS foram lidas em memória. Conteúdo de consulta em cache divergente foi substituído pela leitura direta das revisões abaixo. Compatibilidade significa suporte documental ou metadados explícitos; a pesquisa não executou os candidatos. A instalação posterior foi auditada separadamente no adendo ao final.

O catálogo local tem **29 entradas**, atualizado em `2026-11-07`, SHA-256 `D82AF210059F57C9B84EE0DD122C36EC2BA5F09E4D53916A99CEDE6843729995`. Nenhum dos seis candidatos aparece por `source`. Aqui, **já coberto** significa sobreposição funcional, não presença literal nem comprovação de instalação local.

| Repositório | Revisão consultada, fixada nas fontes |
| --- | --- |
| Nutlope/hallmark | [407fa689f4a276f2fd389208d271d0fef08f5058](https://github.com/Nutlope/hallmark/commit/407fa689f4a276f2fd389208d271d0fef08f5058) |
| pbakaus/impeccable | [687bc381bc9091bf252c0a05303640561014a425](https://github.com/pbakaus/impeccable/commit/687bc381bc9091bf252c0a05303640561014a425) |
| pingdotgg/t3code | [a9e709f15f825cacac1b6d665fa1920c328d68b7](https://github.com/pingdotgg/t3code/commit/a9e709f15f825cacac1b6d665fa1920c328d68b7) |
| thedotmack/claude-mem | [3ab6e1a215c7bbcf716b9d8d763aa78bacba52a0](https://github.com/thedotmack/claude-mem/commit/3ab6e1a215c7bbcf716b9d8d763aa78bacba52a0) |
| jakubkrehel/skills | [157da62016338e8693dcff93d47154a9e36f2157](https://github.com/jakubkrehel/skills/commit/157da62016338e8693dcff93d47154a9e36f2157) |
| nightly-labs/openbot | [94d68167a48279954d8781264e20d3096f06608c](https://github.com/nightly-labs/openbot/commit/94d68167a48279954d8781264e20d3096f06608c) |

As recomendações são avaliação desta pesquisa. Os fatos upstream têm fontes junto ao texto; as sobreposições usam os IDs do manifesto local. Os comandos publicados apontam, em geral, para versões móveis: a revisão documental não fixa automaticamente o pacote que uma instalação futura resolveria.

## Decisão comparativa

| Candidato | Tipo real | Claude Code / Codex | Licença atual | Recomendação para este catálogo |
| --- | --- | --- | --- | --- |
| Hallmark | Skill de design com scripts; plugin Claude opcional | Ambos explícitos | MIT; fotos têm licenças próprias | **Já coberto** pela rota de UI |
| Impeccable | Skill, CLI e engine; hooks e plugins opcionais | Ambos explícitos | Apache-2.0 | **Adicionar**, somente detector CLI opcional; não somar o pacote completo de UI |
| T3 Code | App desktop/web/mobile e CLI de controle de agentes | Ambos explícitos; exige provedor configurado | MIT | **Não instalar** para ampliar o catálogo de skills |
| Claude-Mem | Plugin com hooks, CLI, worker, armazenamento, MCP e skills de consulta | Ambos documentados | Apache-2.0 | **Não instalar** por padrão; memória persistente exige decisão própria |
| Jakub Krehel Skills | Coleção de skills; plugin Claude opcional | Claude explícito; Codex com metadados próprios | MIT | **Adicionar**, somente `state-machine`, por invocação explícita |
| OpenBot | App desktop de agentes persistentes, com acesso remoto | Ambos explícitos | PolyForm-Noncommercial-1.0.0 | **Não instalar** neste stack |

Fontes dos fatos da tabela: [Hallmark README][H-R] e [LICENSE][H-L]; [Impeccable README][I-R], [package.json][I-P] e [LICENSE][I-L]; [T3 README][T-R] e [LICENSE][T-L]; [Claude-Mem README][M-R], [instalação][M-IN] e [LICENSE][M-L]; [Jakub README][J-R], [metadados Codex][J-O] e [LICENSE][J-L]; [OpenBot README][O-R], [package.json][O-P] e [LICENSE][O-L].

## 1. Nutlope/hallmark

**Propósito e classificação.** Geração, redesign e auditoria visual de páginas para reduzir padrões genéricos de IA. Combina temas, regras e verificação em navegador. É uma skill com scripts, não um servidor MCP. O `package.json` declara `hallmark` 2.0.0, entrada `skills/hallmark/SKILL.md` e harnesses suportados; não declara executável `bin`. [Manifesto][H-P]

**Compatibilidade.** Claude Code e Codex CLI são explícitos: `/hallmark` e `$hallmark`, respectivamente. O README fornece os diretórios dos dois agentes e também uma distribuição como plugin Claude. [README][H-R]

**Licença.** Código MIT. O índice de fotos aponta para arquivos externos com licenças individuais, incluindo CC BY e CC BY-SA; a licença do código não substitui os créditos e condições das imagens. [LICENSE][H-L], [seção de licença do README][H-R]

**Instalação oficial, apenas referência:**

```sh
npx skills add nutlope/hallmark -g
```

O README permite omitir `-g` para escopo do projeto. Requer Node 18+; renderização e screenshots também pedem Chrome e `npm i -g puppeteer-core`. Há instalador a partir de clone e hook Claude opcional. [Instalação][H-R]

**Riscos e permissões.** A utilização envolve leitura e edição de páginas, processos locais e navegador; a coleta de imagens adiciona rede e atribuição. Instalação global afeta todos os projetos. O hook opcional aumenta o escopo de execução. São consequências do fluxo documentado, não permissões concedidas nesta pesquisa. [Fluxo e instalação][H-R]

**Sobreposição e decisão.** `design-taste-frontend`, `ui-ux-pro-max` e `21st-dev` já ocupam criação, direção visual e revisão. O próprio README reconhece inspiração nos dois primeiros. Os temas são um diferencial, mas não justificam outra rota automática. **Já coberto**; manter como alternativa para um projeto que peça especificamente seus temas. Não adicionar junto com outra skill geral de design. [README][H-R]; comparação com manifesto e `AGENTS.md` locais.

## 2. pbakaus/impeccable

**Propósito e classificação.** Iteração e revisão de interfaces, com detector determinístico de padrões visuais. É uma combinação de skill e CLI/engine, com hooks e plugins; não um MCP. O pacote `impeccable` 4.8.0 expõe um executável próprio e requer Node >=18.19 para a CLI. [package.json][I-P]

**Compatibilidade e licença.** Claude Code e Codex CLI são explícitos; Codex usa `$impeccable`. Apache-2.0, confirmada em LICENSE e package.json. [README][I-R], [LICENSE][I-L], [manifesto][I-P]

**Instalação oficial completa, apenas referência:**

```sh
npx impeccable install
```

O instalador detecta provedores, permite projeto/global e oferece hook. O detector também tem uso independente, sem registrar a skill ou o hook:

```sh
npx impeccable detect src/
npx impeccable detect http://localhost:5173
```

Esses comandos foram copiados da documentação, não executados. `npx` ainda baixa/executa software e pode criar cache. A CLI distingue achados, saída 2, de falha de varredura, saída 1. [README][I-R]

**Riscos e permissões.** A documentação de hooks declara engine sem sandbox, herdando ambiente e rede do agente; o launcher confere o download contra checksums. O hook Codex exige confiança via `/hooks`. Essa aprovação não equivale a isolamento do processo. [Documentação de hooks][I-H]

No modo Live, Apply pode iniciar `codex` ou `claude` quando não há agente de chat consultando a sessão, com aprovações/sandbox desativados. O README documenta `IMPECCABLE_LIVE_COPY_AGENT=chat` ou `off`. Também descreve telemetria de direções visuais; desativá-la não elimina a consulta ao catálogo remoto. [README][I-R] O fluxo Live ainda solicita elevação para helpers e servidor local no Codex. [Referência Live][I-V]

**Sobreposição e decisão.** As instruções de design, crítica e polimento duplicam `21st-dev`, `ui-ux-pro-max` e `design-taste-frontend`. O ganho distinto é o detector executável e repetível: Playwright fornece navegador/testes, mas o manifesto não declara esse conjunto específico de regras. **Adicionar apenas como ferramenta CLI opcional**, inicialmente em varredura de código, sem nova rota geral de UI, hooks ou Live. A inspeção é documental; não constitui auditoria do binário.

## 3. pingdotgg/t3code

**Propósito e classificação.** Interface de controle dos agentes instalados na máquina, via desktop Electron, web e celular. Não é skill nem substituto do harness. [README][T-R], [FAQ][T-F] A CLI publicada chama-se `t3`; isso é confirmado no `apps/server/package.json`, enquanto o package.json da raiz representa o monorepo privado. [Pacote do servidor][T-P]

**Compatibilidade e licença.** Suporta Claude Code e Codex, exigindo instalação e autenticação de pelo menos um provedor. MIT. [README][T-R], [LICENSE][T-L]

**Instalação oficial no Windows, apenas referência:**

```powershell
winget install T3Tools.T3Code
```

Para a CLI, o README também publica:

```powershell
irm https://t3.codes/install.ps1 | iex
```

`npx t3@latest` é a alternativa de execução pontual documentada; também baixa/executa pacote. O script PowerShell executa conteúdo remoto diretamente. Nenhuma dessas opções foi utilizada. [README][T-R], [guia de instalação][T-IN]

**Riscos e permissões.** A documentação fixa **Full access como padrão inicial**, permitindo comandos e edições sem prompts, e oferece modos Supervised, Auto-accept edits e Auto. As garantias variam por provedor. [Modos de permissão][T-PM] Servidor, serviço em segundo plano e acesso remoto acrescentam superfície operacional. Segundo a FAQ, código/prompts seguem ao provedor; há eventos de produto, desativáveis com `T3CODE_TELEMETRY_ENABLED=false`. [Instalação][T-IN], [FAQ][T-F]

**Sobreposição e decisão.** `parallel-orchestration`, `cavecrew` e `superpowers` já cobrem organização/delegação de trabalho; não fornecem a mesma interface mobile/remota. Essa diferença pertence à escolha de aplicativo, não a uma lacuna de skill. **Não instalar para este catálogo.** Se houver demanda futura por controle remoto, é o candidato de app mais alinhado dos dois avaliados: licença MIT e modos supervisionados disponíveis, embora o padrão precise de atenção.

## 4. thedotmack/claude-mem

**Propósito e classificação.** Memória entre sessões: registra atividade, usa um observador para resumi-la e reinjeta contexto. Inclui CLI, plugin com hooks, worker, SQLite/Chroma, viewer, MCP de busca e skill `mem-search`; não é apenas um arquivo de instruções. [Arquitetura no README][M-R] O pacote 15.12.0 confirma executável, hooks e artefatos de plugin Claude/Codex. [package.json][M-P]

**Compatibilidade e licença.** Claude Code e Codex são suportados pelo instalador. Não confundir integração do agente com escolha do observador: `--provider codex` seleciona Codex para gerar as memórias, não identifica por si só qual host será integrado. Apache-2.0 na revisão atual; não usar classificações antigas sem conferir LICENSE. [Instalação][M-IN], [provedor Codex][M-C], [LICENSE][M-L]

**Instalação oficial, apenas referência:**

```sh
npx claude-mem install
```

No Claude Code, há alternativa oficial:

```text
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

`npm install -g claude-mem` sozinho instala a biblioteca/SDK, não configura hooks e worker. [README][M-R]

**Riscos e permissões.** O instalador pode obter Bun/uv, instalar dependências, registrar plugins/hooks e alterar o PATH do usuário. Também oferece desativar a memória nativa do Claude. O fluxo interativo oferece conta e seleção do provedor; há caminhos documentados sem login. Isso é uma mudança de runtime e configuração, não simples inclusão de skill. [Instalação][M-IN]

Dados ficam em `~/.claude-mem`, mas o observador pode transmitir conteúdo ao provedor mesmo com sincronização em nuvem desligada. A política distingue telemetria por padrão, sincronização opcional e inferência; registra serviço HTTP local, normalmente na porta 37777. A desativação documentada de telemetria é `npx claude-mem telemetry disable` ou `DO_NOT_TRACK=1`. Tags `<private>` são um controle de exclusão, não garantia geral contra segredos em todo o fluxo. [Segurança e privacidade][M-S] O README também informa retenção padrão de screenshots e controles separados de sync/inferência de imagens. [README][M-R]

**Sobreposição e decisão.** `planning-with-files` dá continuidade explícita por arquivos, `graphify` representa conhecimento do código e `context7` consulta documentação; nenhum é equivalente a gravação automática de sessões. Há uma lacuna real, mas capturar atividade continuamente, acrescentar provedor/custos e mexer em memória nativa amplia demais o padrão atual. **Não instalar por padrão.** Reavaliar só diante de necessidade comprovada, com escolha de retenção, provedor e dados autorizados; não vender a solução como inteiramente offline nem substituí-la por Graphify como se fossem equivalentes.

## 5. jakubkrehel/skills

**Propósito e classificação.** Coleção de skills para interfaces: tipografia, cores, acessibilidade, layout, texto, revisão, variantes e implementação a partir de design. Há também ferramentas de trabalho visual por componente e um fluxo autônomo `afk`. É um pacote de skills e plugin Claude opcional, não um MCP ou CLI próprio. [README][J-R], [plugin][J-P]

**Compatibilidade e licença.** README publica plugin Claude. Para Codex, `state-machine/agents/openai.yaml` traz interface e `allow_implicit_invocation: false`; o SKILL.md também desativa invocação automática. É evidência concreta de suporte, não inferência baseada apenas em Markdown. Licença MIT. [Metadados Codex][J-O], [skill][J-S], [LICENSE][J-L]

**Instalação oficial do pacote, apenas referência:**

```sh
npx skills add jakubkrehel/skills
```

Alternativa Claude:

```text
/plugin marketplace add jakubkrehel/skills
/plugin install interfaces@interfaces
```

Ambas constam do [README][J-R]. Para uma adoção futura seletiva, a proposta abaixo aplica os seletores já usados no catálogo local; **não é uma transcrição literal do README desse repo**:

```sh
npx skills add jakubkrehel/skills --skill state-machine -a claude-code -a codex
```

**Riscos e permissões.** `state-machine` cria uma rota temporária com o componente real, fixtures e seletor de estados; usa servidor/navegador do projeto e remove a página apenas quando solicitado. Não é modelagem formal de máquinas de estados. Precisa de permissão para escrever arquivos temporários e deve ficar fora do deploy. [Definição][J-S] O seletor tem teclado, grupos e parâmetro de URL próprios. [Referência do seletor][J-SW]

Não instalar indiscriminadamente o conjunto: `afk` prevê ler fontes conectadas e projetos vizinhos, implementar ideias por horas e criar commits locais. Apesar de limitar serviços a leitura e publicação ao pedido explícito, seu escopo é bem maior que polimento de UI. [Definição de AFK][J-A]

**Sobreposição e decisão.** `better-*`, `interface-review` e `variant` repetem a rota `21st-dev` → `ui-ux-pro-max` → `design-taste-frontend`, com apoio de `vercel-react-best-practices`. `break` também se aproxima da cobertura existente de testes e browser. **Adicionar somente `state-machine`, opcional e explícita**: sua entrega é uma bancada navegável de estados reais, não mais um parecer de design. Playwright pode verificar essa bancada, sem substituí-la. Evitar o pacote completo e manter AFK fora da seleção.

## 6. nightly-labs/openbot

**Propósito e classificação.** Workspace desktop para agentes persistentes, com filas, arquivos compartilhados, navegador e colaboração entre agentes. Suporta Codex App Server e Claude Code. É um aplicativo, não uma skill ou um MCP isolado. [README][O-R] O manifesto identifica Electron, pacote privado e versão 0.64.0. [package.json][O-P]

**Licença.** A revisão atual usa **PolyForm-Noncommercial-1.0.0**, confirmada em LICENSE e package.json. O README exige licença comercial separada para uso comercial; informa Apache-2.0 apenas até 0.1.11. Não classificar a versão atual como Apache-2.0 ou permissiva. [LICENSE][O-L], [package.json][O-P], [histórico de licença no README][O-R]

**Instalação oficial no Windows.** Baixar `OpenBot-*-x64.exe` das [releases oficiais](https://github.com/nightly-labs/openbot/releases) e executar o instalador. O README não fornece comando Windows equivalente a `npm install -g openbot`. Para este ambiente, registrar esse procedimento gráfico é mais fiel que inventar uma CLI de instalação. [README][O-R]

**Riscos e permissões.** SECURITY.md declara agentes em `danger-full-access` e `approvalPolicy: never`, sem sandbox do host. Workspaces separados não impedem acesso fora de suas pastas. A política informa que credenciais Claude/Codex permanecem com as CLIs. [SECURITY.md][O-S] Há Computer Use opcional e consentimento inicial, mas isso não cria confirmação por ação. [README][O-R]

Local-first não significa offline: conteúdo segue aos provedores, enquanto conta, acesso remoto e analytics têm fluxos próprios. A política diferencia metadados de produto de conteúdo de conversas e descreve controles de analytics. [PRIVACY.md][O-PR]

**Sobreposição e decisão.** Orquestração e browser se sobrepõem parcialmente a `parallel-orchestration`, `cavecrew`, `agent-browser` e `playwright`; persistência e UI integrada são funções adicionais de aplicativo. **Não instalar**: não resolve uma lacuna de skill, acrescenta acesso amplo ao host e impõe licença não comercial por padrão. Entre os dois apps pesquisados, T3 Code é a opção mais adequada para eventual avaliação separada; nenhum entra na seleção de skills.

## Seleção final sem duplicar

1. **Jakub Krehel: apenas `state-machine`.** Melhor acréscimo de skill: entrega distinta, sem serviço contínuo e com invocação explícita nos metadados dos dois agentes. Não promover o pacote inteiro.
2. **Impeccable: apenas detector CLI, opcional.** Melhor acréscimo de ferramenta: verificação determinística complementar à rota existente. Não adotar por consequência hooks, Live, extensão ou nova skill geral de UI.
3. **Manter as rotas atuais** para design, revisão e automação de navegador. Hallmark fica como alternativa temática; os dois apps e a memória automática não são dependências necessárias do catálogo.

“Adicionar” nesta seção significa a seleção de componentes, não copiar monorepos nem ativar todos os recursos. A integração efetiva no manifesto e a instalação global dos dois componentes escolhidos estão registradas no adendo abaixo.

## Limites e validação documental

- Revisões, comandos e licenças foram conferidos em fontes do próprio upstream; não foram usados tutoriais, rankings, mirrors ou descrições de terceiros.
- Todos os candidatos têm propósito, categoria, compatibilidade, licença, instalação, permissões, sobreposição e decisão registrados acima.
- A comparação é contra entradas declaradas no manifesto e o roteamento local; não atesta que cada integração existente esteja instalada ou funcionando.
- Não houve teste de binários, dependências transitivas ou eficácia dos detectores. Riscos descritos são comportamentos documentados e suas implicações, não resultados de pentest.
- Único arquivo produzido por esta pesquisa: `docs/research/2026-11-07-candidate-skills.md`. A pasta `docs/research` foi criada para acomodá-lo.

## Adendo de instalação e auditoria — 2026-11-07

Após a pesquisa, foram instalados globalmente para os dois agentes somente:

- `impeccable`, em `C:\Users\SnyX\.agents\skills\impeccable` e `C:\Users\SnyX\.claude\skills\impeccable`;
- `state-machine`, em `C:\Users\SnyX\.agents\skills\state-machine` e `C:\Users\SnyX\.claude\skills\state-machine`.

O scanner local `skill-supply-chain-audit` encontrou zero achados críticos/altos no `state-machine`. No Impeccable, ele marcou uma heurística crítica em `scripts/modern-screenshot.umd.js` e vários alertas de conteúdo minificado, comentários e rede. A inspeção do trecho crítico mostrou conversão de dados de imagem `data:` com `atob` para `Blob`, sem `eval` ou `new Function`; por isso o alerta foi classificado como falso positivo contextual. A condição operacional permanece: não ativar hooks, Live, telemetria ou download de engine automaticamente. Os hashes das cópias Codex auditadas estão em [`docs/security/skill-locks`](../security/skill-locks).

Essa auditoria é estática e não prova segurança absoluta. Atualizações devem ser comparadas aos locks antes de serem promovidas ao perfil `unified`.

## Fontes primárias fixadas

[H-R]: https://github.com/Nutlope/hallmark/blob/407fa689f4a276f2fd389208d271d0fef08f5058/README.md
[H-P]: https://github.com/Nutlope/hallmark/blob/407fa689f4a276f2fd389208d271d0fef08f5058/package.json
[H-L]: https://github.com/Nutlope/hallmark/blob/407fa689f4a276f2fd389208d271d0fef08f5058/LICENSE
[I-R]: https://github.com/pbakaus/impeccable/blob/687bc381bc9091bf252c0a05303640561014a425/README.md
[I-P]: https://github.com/pbakaus/impeccable/blob/687bc381bc9091bf252c0a05303640561014a425/package.json
[I-L]: https://github.com/pbakaus/impeccable/blob/687bc381bc9091bf252c0a05303640561014a425/LICENSE
[I-H]: https://github.com/pbakaus/impeccable/blob/687bc381bc9091bf252c0a05303640561014a425/skill/reference/hooks.md
[I-V]: https://github.com/pbakaus/impeccable/blob/687bc381bc9091bf252c0a05303640561014a425/skill/reference/live.md
[T-R]: https://github.com/pingdotgg/t3code/blob/a9e709f15f825cacac1b6d665fa1920c328d68b7/README.md
[T-P]: https://github.com/pingdotgg/t3code/blob/a9e709f15f825cacac1b6d665fa1920c328d68b7/apps/server/package.json
[T-L]: https://github.com/pingdotgg/t3code/blob/a9e709f15f825cacac1b6d665fa1920c328d68b7/LICENSE
[T-IN]: https://github.com/pingdotgg/t3code/blob/a9e709f15f825cacac1b6d665fa1920c328d68b7/docs/user/install.md
[T-PM]: https://github.com/pingdotgg/t3code/blob/a9e709f15f825cacac1b6d665fa1920c328d68b7/docs/user/permission-modes.md
[T-F]: https://github.com/pingdotgg/t3code/blob/a9e709f15f825cacac1b6d665fa1920c328d68b7/docs/user/faq.md
[M-R]: https://github.com/thedotmack/claude-mem/blob/3ab6e1a215c7bbcf716b9d8d763aa78bacba52a0/README.md
[M-P]: https://github.com/thedotmack/claude-mem/blob/3ab6e1a215c7bbcf716b9d8d763aa78bacba52a0/package.json
[M-L]: https://github.com/thedotmack/claude-mem/blob/3ab6e1a215c7bbcf716b9d8d763aa78bacba52a0/LICENSE
[M-IN]: https://github.com/thedotmack/claude-mem/blob/3ab6e1a215c7bbcf716b9d8d763aa78bacba52a0/docs/public/installation.mdx
[M-C]: https://github.com/thedotmack/claude-mem/blob/3ab6e1a215c7bbcf716b9d8d763aa78bacba52a0/docs/codex-provider.md
[M-S]: https://github.com/thedotmack/claude-mem/blob/3ab6e1a215c7bbcf716b9d8d763aa78bacba52a0/.github/SECURITY.md
[J-R]: https://github.com/jakubkrehel/skills/blob/157da62016338e8693dcff93d47154a9e36f2157/README.md
[J-P]: https://github.com/jakubkrehel/skills/blob/157da62016338e8693dcff93d47154a9e36f2157/.claude-plugin/plugin.json
[J-L]: https://github.com/jakubkrehel/skills/blob/157da62016338e8693dcff93d47154a9e36f2157/LICENSE
[J-S]: https://github.com/jakubkrehel/skills/blob/157da62016338e8693dcff93d47154a9e36f2157/skills/state-machine/SKILL.md
[J-SW]: https://github.com/jakubkrehel/skills/blob/157da62016338e8693dcff93d47154a9e36f2157/skills/state-machine/switcher.md
[J-O]: https://github.com/jakubkrehel/skills/blob/157da62016338e8693dcff93d47154a9e36f2157/skills/state-machine/agents/openai.yaml
[J-A]: https://github.com/jakubkrehel/skills/blob/157da62016338e8693dcff93d47154a9e36f2157/skills/afk/SKILL.md
[O-R]: https://github.com/nightly-labs/openbot/blob/94d68167a48279954d8781264e20d3096f06608c/README.md
[O-P]: https://github.com/nightly-labs/openbot/blob/94d68167a48279954d8781264e20d3096f06608c/package.json
[O-L]: https://github.com/nightly-labs/openbot/blob/94d68167a48279954d8781264e20d3096f06608c/LICENSE
[O-S]: https://github.com/nightly-labs/openbot/blob/94d68167a48279954d8781264e20d3096f06608c/SECURITY.md
[O-PR]: https://github.com/nightly-labs/openbot/blob/94d68167a48279954d8781264e20d3096f06608c/PRIVACY.md
