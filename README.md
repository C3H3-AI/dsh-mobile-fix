# dsh-mobile-fix

A DSH (DeepSeek Harness) client plugin that polishes the web UI on phones and narrow viewports.

> 中文说明见 [README.zh.md](README.zh.md)

## Features

- **Mobile settings dialog** — turns the desktop two-column settings dialog into a
  single-column phone layout: the left nav collapses to a horizontal strip on top,
  the content takes the full width below.
- **Double-click to maximize** — double-click the settings panel (anywhere except
  buttons/links) to expand it to fullscreen; double-click again to restore.
- **Mobile sidebar** — hidden by default on phones; only a top-left hamburger icon
  remains. Tapping it slides the sidebar in as an overlay.
- **Generic phone hardening** — dialog sizing, safe-area padding, 16px inputs/buttons.

## Install

Install into any profile:

```bash
dsh plugin --profile <profile> add dsh-mobile-fix
```

Then restart DSH (or refresh the web page — the client bundle is loaded at page
load). No dependency on `dsh-web-ui-all` or other plugins; it is a standalone
client-only plugin.

## Development

```bash
pnpm install
pnpm build      # tsup + client-loader wrapper
```

- `lib/client.js` is the DSH client bundle (wrapped in `__ModuleLoader__.load`).
- `lib/index.js` is the host stub (no-op).
- `src/client/index.ts` is the source; `src/index.ts` is the host stub source.

## License

MIT
