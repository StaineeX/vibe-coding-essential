# Unified stack — English

“All together” means coordinated routing, not loading every instruction into every call.

Default flow:

1. Plan and split the work.
2. Dispatch independent tasks in parallel, each with an isolated scope.
3. Keep dependencies and shared-file edits sequential.
4. Integrate, review quality/security, and run final verification.

Routes:

- UI: 21st.dev, UI/UX Pro Max, Design Taste, and Vercel.
- Browser: Playwright for structured testing; agent-browser for general automation.
- Web: Firecrawl for search/scraping; Context7 for current documentation.
- Product: PostHog for analytics/flags/experiments; Composio for authenticated external apps.
- Quality: TDD, testing, review, and verification.
- Security: skill audits and Strix only against authorized targets.

The `unified` profile prints all approved commands. It does not run remote installers or configure credentials automatically.
