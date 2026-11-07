# Vibe Coding Essential — unified agent routing

Use the installed skills as one routed stack for Claude Code and OpenAI Codex.

## Routing rules

1. Start with `using-agent-skills` or the catalog in `manifests/skills.json`.
2. Use `planning-with-files` and `writing-plans` for multi-step work.
3. If there are 2+ independent tasks, use `dispatching-parallel-agents` or `cavecrew`.
4. Give each parallel agent an isolated scope/worktree. Never let parallel agents edit the same files.
5. Keep dependent tasks sequential. Integrate only after every worker reports.
6. Use one domain route at a time when routes overlap:
   - UI: `21st-ui-*` → `ui-ux-pro-max` → `design-taste-frontend` → Vercel review.
   - UI audit: invoke `impeccable` after implementation; it is an audit layer, not a second general design generator.
   - UI states: invoke `state-machine` explicitly, then verify its temporary bench with Playwright; never ship the bench.
   - Browser: Playwright MCP/CLI for structured testing; `agent-browser` for general browser automation.
   - Web data: Firecrawl for search/scrape/crawl; Context7 for current library docs.
   - Product telemetry: PostHog MCP for analytics, flags, experiments, replay, and errors.
   - External apps: Composio only after explicit authentication and action approval.
   - Persistent memory/platforms: Claude-Mem, T3 Code, and OpenBot are opt-in references, not automatic dependencies. Decide retention, provider, host permissions, and license first.
7. Use `tdd`/`testing-best-practices` while implementing, then `code-review-and-quality` and security review.
8. Finish with `verification-before-completion`; report evidence, not guesses.

## Safety and token rules

- Do not load every skill body into context. Load only the route needed for the task.
- Do not run external actions, pentests, browser logins, or data mutations without user authorization.
- Never commit credentials, API keys, `.env` files, or MCP tokens.
- Experimental packs stay opt-in.

## Parallel completion contract

Each worker returns: scope, files changed, tests/checks, risks, and commit/hash if applicable. The coordinator checks conflicts, runs the integrated verification, and only then reports completion.
