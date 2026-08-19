# Conduit documentation

The public documentation and project website for [Conduit](https://github.com/err0rgod/conduit), an open-source, local-first browser-control bridge for AI agents.

The site is a static React/Vite application deployed to GitHub Pages at <https://err0rgod.github.io/conduit-web/>. It contains the installation, architecture, security, extension, daemon, MCP, CLI, browser-tool, configuration, testing, troubleshooting, contribution, roadmap, and changelog guides.

## Development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Validation

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The backend repository also pins and builds this repository in its cross-platform CI. GitHub Pages deploys only after this repository passes its validation gate.

## Related repositories

- [conduit](https://github.com/err0rgod/conduit) — daemon, CLI, MCP adapter, security, and releases
- [conduit-extension](https://github.com/err0rgod/conduit-extension) — Manifest V3 browser extension

## License

Documentation and site code are available under the project’s MIT License.
