# Contributing to PersianLabs/ui

PersianLabs/ui is a Turborepo monorepo managed with bun. Components live in two parallel copies on purpose, documentation is markdown compiled by [fumadocs-mdx](https://fumadocs.dev), and the site is a Next.js 16 app.

## Repository layout

| Path | Purpose |
| --- | --- |
| `packages/ui/src` | Internal `@workspace/ui` package — the source of truth for component logic, used by the docs site itself. |
| `apps/web/registry/base` | Consumer-ready mirror of every file. Identical logic, but imports resolve the way a shadcn-configured project would (`@/lib/utils` instead of `@workspace/ui/lib/utils`). **This tree is what ships.** |
| `apps/web/content/docs` | Every doc page as markdown/MDX, ordered by per-folder `meta.json` files. |
| `apps/web/components/examples` | Live example components — one file per variant (`<name>-<variant>.tsx`). |
| `apps/web/public/r` | Generated registry JSON, produced by `shadcn build`. |
| `apps/web/lib/api-data` | API-reference table rows, imported by both the doc pages and the markdown processor. |

## Guides

- **[Adding a component](adding-a-component.md)** — the full end-to-end walkthrough.
- **[Adding a utility](adding-a-utility.md)** — pure functions and React hooks.
- **[Conventions](conventions.md)** — naming, RTL rules, credits, commits.

## Quick start

```bash
bun install
bun run dev      # apps/web on http://localhost:3000
```

## Verification checklist

Before opening a PR:

```bash
bun run build        # regenerates the examples map, registry JSON, and the site
bun run lint
bun run typecheck
cd apps/web && bun scripts/check-mdx-components.mts
```

Then spot-check in the browser or with curl:

- The new page renders at `/docs/components/<name>` (or `/docs/utilities/<name>`).
- Its `.md` URL returns the full page content.
- The component appears in `/docs/components`, the ⌘K search, and [`llms.txt`](https://ui.persian-labs.ir/llms.txt).
