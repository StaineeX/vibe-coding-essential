---
name: vibe-coding-essential
description: Routes any coding task through the Vibe Coding Essential stack (plan, split independent work, implement in the right domain, audit, test, verify). Use at the start of any non-trivial coding task, when choosing which installed skill fits a step, or when the user mentions "vibe coding essential", "stack unificada" or asks which skill to use.
---

# Vibe Coding Essential

Universal router for Claude Code and OpenAI Codex. It does not replace other skills. It picks one skill per step and keeps the flow verifiable.

Catalog and sources: https://github.com/StaineeX/vibe-coding-essential

## Standard flow

1. **Understand:** goal, files, dependencies, constraints. Read the code before changing it.
2. **Plan:** short plan with verifiable criteria (`planning-with-files`, `writing-plans`).
3. **Split:** only independent tasks run in parallel (`dispatching-parallel-agents`, `cavecrew`, `using-git-worktrees`). Shared files, migrations, architecture, integration and publishing stay sequential.
4. **Execute:** use one route below per step.
5. **Integrate:** resolve conflicts in one coordinated, sequential step.
6. **Review:** tests, code review, security check.
7. **Verify:** run the final commands and record evidence. No "done" without a command, a reviewed diff and evidence (`verification-before-completion`).

## Routes

| Task | Skills (in order) |
|---|---|
| UI build | `21st-ui-build` → `ui-ux-pro-max` → `design-taste-frontend` → `vercel-react-best-practices` (sequential, never two general design skills in one step) |
| UI audit | `impeccable`, only when the interface is ready |
| UI states | `state-machine` (explicit only) + Playwright |
| Browser | Playwright for structured tests, `agent-browser` for general automation |
| Web / docs | Firecrawl for search and scraping, Context7 for current docs |
| Quality | `tdd` → `testing-best-practices` → `code-review-and-quality` |
| Debugging | `systematic-debugging` / `debugging-and-error-recovery` |
| Security | `agent-security-checkup`, `skill-supply-chain-audit`; Strix only on authorized targets |
| Media | HyperFrames |
| Missing skill | `find-skills` to search skills.sh; review the upstream source before installing |
| Long sessions (Claude Code) | `fast-jev-compaction` plugin replaces the summary-based compaction; needs `TYPESAFE_API_KEY` |

## Token economy

- Caveman for terse prose; code, paths and errors stay exact.
- Ponytail for the smallest working change.
- Planning with Files so work survives compaction.
- Graphify to avoid re-exploring large repositories.

## Rules

- External access, sending data, analytics, OAuth and pentests require explicit user approval.
- Third-party skills and hooks run with the agent's permissions: read them before installing.
- Optional or experimental items (Claude-Mem, T3 Code, OpenBot, Token Optimizer, GStack, ECC) are never part of the automatic chain.
