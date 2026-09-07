# persianlabsui

The CLI for [Persian Labs UI](https://ui.persian-labs.ir) — scaffold and theme RTL-first, Persian-typography projects built on [shadcn/ui](https://ui.shadcn.com) and [Base UI](https://base-ui.com).

## Quick start

Build your design system visually at [/create](https://ui.persian-labs.ir/create), then scaffold a project from the generated preset code:

```bash
npx persianlabsui@latest init -p <preset-code> -t next -n my-app
```

Or without a preset — you'll be prompted:

```bash
npx persianlabsui@latest init
```

Scaffolded projects ship with the Persian-first font stack (Vazirmatn by default, Estedad optional), Farsi digit handling, RTL, and the full theming tokens.

## Commands

| Command    | What it does                                                            |
| ---------- | ----------------------------------------------------------------------- |
| `init`     | Create a new project from a template (`next`, `vite`, monorepo variants) |
| `apply`    | Apply a preset (theme + fonts) to an existing project — `--only theme` / `--only font` |
| `add`      | Add components from the Persian Labs registry                            |
| `preset`   | `decode`, `url`, or `open` a preset code                                 |

Full reference: [ui.persian-labs.ir/docs/cli](https://ui.persian-labs.ir/docs/cli)

## How it works

`init` scaffolds a ready-to-run template — sparse-cloned from the [persianlabs/ui](https://github.com/persianlabs/ui) repo's `templates/` directory (requires git; forks can override with `PERSIANLABSUI_GITHUB_URL`, and local development can point `PERSIANLABSUI_TEMPLATE_DIR` at a checkout) — then fetches a registry base from `https://ui.persian-labs.ir/init` and applies it through the stock shadcn CLI. Fonts install offline: the Persian cuts are Latin-free arabic subsets bundled with the templates, and English fonts are pulled fresh from Google Fonts (with a CDN fallback). Everything it produces is a normal shadcn project you fully own.
