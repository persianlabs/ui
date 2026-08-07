# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

PersianLabs/ui — an RTL-first, copy-paste component library for Persian interfaces, distributed as a [shadcn-compatible registry](https://ui.shadcn.com/docs/registry) (not an npm package). Users run `npx shadcn add https://ui.persian-labs.ir/r/<name>.json` and the component source lands directly in their codebase. The shorter `@persianlabsui/<name>` form will work once the namespace is accepted into shadcn's registry directory — until then, install commands shown in the docs use the direct URL.

Turborepo monorepo, bun package manager (`bun@1.4.0`, workspaces: `apps/*`, `packages/*`).

## Commands

Run from repo root (turbo fans out to workspaces):

```bash
bun install
bun run dev         # apps/web on http://localhost:3000
bun run build       # runs `shadcn build` (prebuild) then `next build` in apps/web
bun run lint
bun run format
bun run typecheck
```

Scope to one workspace with turbo filters, e.g. `bunx turbo build --filter=web`, or `cd` into `apps/web` / `packages/ui` and run the same script names directly (`bun run lint`, etc.) — each workspace's `package.json` defines the same script set.

There is no test suite configured in this repo.

## Architecture: components exist in two places, on purpose

This is the one thing that isn't obvious from browsing a single directory. Every UI component is maintained in **two parallel copies** with different import aliases:

- `packages/ui/src/components/*.tsx` — the internal `@workspace/ui` package. Used by `apps/web` itself (docs site previews, examples) via `@workspace/ui/lib/utils`, `@workspace/ui/components/*`, etc. This is a normal internal workspace package, not what end users install.
- `apps/web/registry/base/ui/*.tsx` (plus `registry/base/lib/*.ts` for helpers like `persian-provinces.ts`) — the **consumer-ready source**. Same component logic, but imports resolve the way a consumer's shadcn-configured project would (`@/lib/utils` instead of `@workspace/ui/lib/utils`). This tree is what actually ships: `apps/web/registry.json` points at these files, `shadcn build` (the `prebuild` step) compiles them into `apps/web/public/r/*.json`, and `apps/web/lib/component-source.ts` reads straight from `registry/base/ui/*.tsx` / `registry/base/lib/*.ts` to render "copy source" blocks on the docs pages.

**When adding or editing a component, update both copies** — they differ only in import paths (e.g. `@workspace/ui/lib/utils` vs `@/lib/utils`), not in logic. After changing `apps/web/registry.json` or any `registry/base/**` file, run `bun run build` (or `cd apps/web && bun run registry:build`) to regenerate `apps/web/public/r/*.json`.

To register a new component end-to-end:
1. Add the implementation to `packages/ui/src/components/<name>.tsx` (internal alias imports).
2. Add the consumer copy to `apps/web/registry/base/ui/<name>.tsx` (`@/...` alias imports), plus any shared lib files under `registry/base/lib/`.
3. Add an entry to `apps/web/registry.json` (name, type, title, description, `registryDependencies`, `dependencies`, `files`).
4. Wire it into the docs: `apps/web/lib/docs-nav.ts` (sidebar entry) and a page under `apps/web/app/docs/components/`, using `apps/web/lib/component-source.ts` / `component-previews.tsx` to pull the source and render a live preview.
5. Add a `Credits` section (`apps/web/components/credits.tsx`) to the doc page, directly under `LastUpdated`. If it's not clear where the component/data was copied from, what (if anything) was changed versus the source, or whether it's published, **ask the user** rather than guessing — don't invent attribution.

## Key structure

- `apps/web` — Next.js 16 docs/marketing site. Renders component docs, live previews, and serves the registry JSON from `public/r/`.
  - `apps/web/registry/base/` — consumer-ready component/lib source, mirrored into `public/r/*.json` by `shadcn build`.
  - `apps/web/registry.json` — the registry manifest (source of truth for what's installable and its dependency graph).
  - `apps/web/components.json` — shadcn CLI config for this repo; `rtl: true`, base color `neutral`, style `base-nova`, icon library `lucide`.
  - `apps/web/lib/site.ts` / `apps/web/lib/github.ts` — canonical site URL (`SITE_URL`) and GitHub repo slug (`GITHUB_REPO`); update both if the domain or repo location changes.
- `packages/ui` — the `@workspace/ui` internal package (components, hooks, lib, Tailwind globals) consumed only by `apps/web`.
- `packages/eslint-config`, `packages/typescript-config` — shared lint/tsconfig bases (`base`, `next`, `react-internal` / `base`, `nextjs`, `react-library`) extended by each workspace.

## Conventions

- Components are built on [Base UI](https://base-ui.com) (`@base-ui/react`), styled with Tailwind v4, variants via `class-variance-authority`, class merging via the shared `cn` util.
- RTL-first: logical CSS properties and mirrored icons are the default; components must also work LTR.
- Prettier: no semicolons, double quotes, `trailingComma: es5`, `printWidth: 80`, with `prettier-plugin-tailwindcss` sorting classes against `packages/ui/src/styles/globals.css` (functions `cn`, `cva` are class-sorted too).
- ESLint: flat config per workspace (`apps/web/eslint.config.js`, `packages/ui/eslint.config.js`) extending `@workspace/eslint-config`; `eslint-plugin-only-warn` means lint issues surface as warnings, not hard failures.
- Every component doc page must credit where it came from via `<Credits>` (`apps/web/components/credits.tsx`), placed right under `<LastUpdated>`. Never fabricate a source, a "what changed" list, or publish status — if it isn't already known from context, ask the user for it first.
