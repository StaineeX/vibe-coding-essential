# Vibe Coding Essential — Design

## Intent

Create a bilingual, public, free starter kit for Claude Code and OpenAI Codex. It curates useful upstream skills without vendoring unrelated repositories or installing every untrusted catalog entry.

## Goals

- Install a reviewed allowlist for Claude Code and Codex.
- Separate core, quality, context, frontend, browser, and media profiles.
- Document Portuguese-Brazilian and English usage.
- Record upstream source, license, compatibility, install command, and removal path.
- Include token-saving and verification guidance.

## Non-goals

- Mirror complete upstream repositories.
- Enable every skill globally by default.
- Promise that token reduction equals lower billing.
- Include credentials, telemetry, or private user data.

## Constraints

- Prefer upstream installers and pinned source references.
- Keep third-party code out of the curated repository unless needed for the local install.
- Include security warnings for hooks, MCP servers, shell scripts, and network access.
- Use only public/free GitHub features.

## Approach

Use a small manifest plus bilingual documentation. Install skills into user/project skill locations where supported; keep the repository as the auditable catalog and reproducible setup guide. Put large or overlapping tools in optional profiles.

## Selected profiles

- Core: Superpowers, Ponytail, Caveman, RTK, agent security audit.
- Quality: TDD, systematic debugging, verification, review, testing best practices.
- Context: Planning with Files, Graphify, Context7.
- Frontend: Taste, UI/UX Pro Max, Vercel React Best Practices.
- Browser/media: Agent Browser, HyperFrames.
- Optional experiments: Token Optimizer, GStack, ECC.

