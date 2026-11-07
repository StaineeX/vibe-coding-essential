# Vibe Coding Essential

![Vibe Coding Essential cover](assets/vibe-coding-essential-cover.png)

Bilingual curation of skills, tools, and guardrails for Claude Code and OpenAI Codex.

Portuguese version: [README.md](README.md).

## What this solves

Coding agents need method, compact context, current documentation, and real verification. This repository organizes a small, auditable set of components without copying full upstream repositories or enabling everything globally.

## Profiles

| Profile | Focus |
|---|---|
| `core` | Superpowers, Ponytail, Caveman, RTK, and security |
| `quality` | TDD, debugging, review, and testing |
| `context` | Persistent planning, Graphify, and Context7 |
| `integrations` | Cross-platform 24/25-skill pack and optional integrations |
| `engineering` | Engineering and performance practices |
| `frontend` | UI/UX, React, 21st.dev, and anti-generic design |
| `browser` | Browser automation and testing |
| `media` | Video and motion with HyperFrames |
| `discovery` | Find skills on demand |
| `security` | Skill auditing and authorized Strix pentesting |
| `experimental` | Token Optimizer, GStack, and ECC; review first |

## Install

Prerequisites: Git, Node.js 20+, and `npx skills`. Review the manifest, then run the profile script to print the reviewed commands.

```powershell
pwsh ./scripts/verify-manifest.ps1
pwsh ./scripts/install-profile.ps1 -Profile core -WhatIf
```

The script does not execute remote installers. This keeps review explicit. Third-party skills and hooks may execute commands with the agent's privileges; read [docs/en/security.md](docs/en/security.md) first.

## Token efficiency

- RTK compacts shell command output.
- Caveman removes repetitive prose while preserving code, paths, and errors.
- Planning with Files avoids restarting after compaction.
- Graphify reduces repeated repository exploration.
- Context7 reduces work caused by stale documentation.
- 21st.dev helps search and generate React/shadcn components; its MCP needs separate setup.
- Strix performs active pentesting: use only on assets you own or have written authorization to test.

Fewer output tokens do not guarantee lower total cost. Measure quality, extra calls, and rework.

## Verification

Recommended flow: understand → plan → test → implement → review → verify. “Done” requires an executed command, reviewed diff, and recorded evidence.

## Licenses and sources

This catalog is MIT. Each item remains under its upstream license. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Status

Living catalog. Star counts are only a popularity signal; GitHub does not expose a comparable download ranking for repositories without release assets.

