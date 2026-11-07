# Vibe Coding Essential — unified agent routing

Use the same routed stack described in `AGENTS.md`. Do not activate every skill globally in one prompt.

- Plan multi-step work with `planning-with-files` and `writing-plans`.
- For 2+ independent tasks, dispatch `dispatching-parallel-agents` or `cavecrew` with isolated scopes.
- Keep shared-file and dependent work sequential; review the integrated result.
- Route UI through 21st.dev/UI UX/Design Taste, browser work through Playwright or agent-browser, web data through Firecrawl, docs through Context7, telemetry through PostHog, and external app actions through authenticated Composio.
- Use TDD/testing, code review, security review, and verification before claiming completion.
- Load skills on demand, protect credentials, and require authorization for external actions or pentesting.
