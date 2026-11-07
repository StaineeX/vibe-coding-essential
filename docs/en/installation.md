# Installation — English

## Safe order

1. Read `manifests/skills.json`.
2. Run `verify-manifest.ps1`.
3. Run the profile with `-WhatIf`.
4. Review the printed commands.
5. Run only the approved commands manually.
6. Restart Claude Code or Codex.

## Suggested profiles

Start with `core` and `quality`. Add `context` for large repositories. Use `frontend`, `browser`, and `media` only when the task needs them.

The script is a safe preview only; it does not execute remote commands. The `integrations` profile contains skills that may access external services. The `security` profile includes Strix, which performs active pentesting and requires explicit authorization for the target.

