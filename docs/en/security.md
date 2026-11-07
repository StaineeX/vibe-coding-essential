# Security — English

Skills are instructions executed by the agent. Hooks, scripts, MCP servers, and installers may read files, access the network, or execute commands.

- Audit upstream before installation.
- Prefer tags or pinned commits.
- Do not run `curl | sh` without reading the script.
- Do not install `experimental` automatically.
- Never commit tokens, `.env` files, SSH keys, or credentials.
- Use `agent-security-skills` to audit the skill supply chain.
- Review the diff after every installation.

