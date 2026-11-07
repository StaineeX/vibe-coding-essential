# Vibe Coding Essential Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and install a bilingual Claude/Codex skill catalog with auditable profiles and publish it to GitHub.

**Architecture:** A documentation-first repository contains a source manifest, profile manifests, bilingual guides, license/provenance notes, and small verification scripts. Upstream skills remain upstream; installation is reproducible and explicit.

**Tech Stack:** Markdown, JSON, PowerShell, Git, GitHub CLI, upstream `skills` installer where available.

**Spec:** `docs/superpowers/specs/2026-11-07-vibe-coding-essential-design.md`

## Global Constraints

- Keep the allowlist explicit.
- Support Claude Code and Codex where upstream supports them.
- Do not commit secrets or user-specific paths.
- Do not claim completion without fresh verification output.

## Review Focus

- Duplicate skills must be marked optional instead of enabled together.
- Install commands must not silently execute untrusted remote shell content.
- Windows paths and PowerShell commands must be valid.
- Licenses and upstream attribution must remain visible.
- Token-saving claims must distinguish measured output reduction from billed cost.

### Task 1: Repository skeleton and manifests

**Files:**
- Create: `README.md`, `README.en.md`, `LICENSE`, `.gitignore`
- Create: `manifests/skills.json`, `manifests/profiles.json`
- Create: `docs/pt-br/installation.md`, `docs/en/installation.md`
- Create: `docs/pt-br/security.md`, `docs/en/security.md`

- [ ] Create repository files and explicit profiles.
- [ ] Check every manifest URL and required field.

### Task 2: Installation and verification helpers

**Files:**
- Create: `scripts/install-profile.ps1`
- Create: `scripts/verify-manifest.ps1`
- Create: `scripts/verify-links.ps1`

- [ ] Make install dry-run the default.
- [ ] Require explicit profile selection before writes.
- [ ] Verify manifest syntax, duplicate skill names, and source URLs.

### Task 3: Documentation image and provenance

**Files:**
- Create: `assets/vibe-coding-essential-cover.png`
- Create: `docs/pt-br/catalog.md`, `docs/en/catalog.md`
- Create: `THIRD_PARTY_NOTICES.md`

- [ ] Add bilingual catalog and compatibility matrix.
- [ ] Add generated cover image and README reference.
- [ ] Record licenses and upstream links.

### Task 4: Install selected profiles

**Files:**
- Modify: local Claude/Codex skill locations only

- [ ] Install core and quality profiles.
- [ ] Install context and frontend profiles.
- [ ] Install browser/media profiles only where dependencies are available.
- [ ] Run status/list checks for both agents.

### Task 5: Git and publication

**Files:**
- Modify: all repository files above

- [ ] Run all verification scripts.
- [ ] Review `git diff` and secret scan.
- [ ] Commit with a Conventional Commit message.
- [ ] Create/push a public GitHub repository after authentication succeeds.

