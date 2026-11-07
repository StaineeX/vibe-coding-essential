# Segurança — PT-BR

Skills são instruções executáveis pelo agente. Hooks, scripts, MCPs e instaladores podem ler arquivos, acessar rede ou executar comandos.

- Audite o upstream antes da instalação.
- Prefira tags ou commits fixos.
- Não rode `curl | sh` sem ler o script.
- Não instale `experimental` automaticamente.
- Não coloque tokens, `.env`, chaves SSH ou credenciais no repositório.
- Use `agent-security-skills` para auditar a cadeia de skills.
- Verifique o diff depois de cada instalação.

