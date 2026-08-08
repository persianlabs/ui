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
4. Wire it into the docs: `apps/web/lib/docs-nav.ts` (sidebar entry) and a page under `apps/web/app/docs/components/<name>/` (`page.tsx` + `api-data.ts`), using `apps/web/lib/component-source.ts` / `apps/web/lib/example-source.ts` to pull real source into `<CodeBlock>`/`<ComponentPreview>`. **`docs-nav.ts` is also the site search index** (`apps/web/components/site-search.tsx`, the ⌘K command palette in the header) — any enabled entry there is automatically searchable, so adding the sidebar entry is the only step needed for a new page to appear in search. Never add a page without a `docs-nav.ts` entry, and never hardcode a separate search index.
5. Add example components under `apps/web/components/examples/<name>-<variant>.tsx` (see Naming conventions below) — these import from `@workspace/ui/components/*`, not `@/components/ui/*`, since they run live inside `apps/web` itself.
6. Add a thumbnail to `apps/web/lib/component-previews.tsx` (a `<Name>Preview` function using plain inline styles, not Tailwind classes — see the file header comment for why) and wire it into two places: the gallery card in `apps/web/app/docs/components/page.tsx` (`components` array + import), and `apps/web/app/docs/components/<name>/opengraph-image.tsx` (copy an existing one, swap the preview/title/description). Skipping this step is easy to miss — the component doc page works fine without it, but the component never shows up in `/docs/components` or gets a social preview image.
7. Add a `Credits` section (`apps/web/components/credits.tsx`) to the doc page, directly under `LastUpdated`. If it's not clear where the component/data was copied from, what (if anything) was changed versus the source, or whether it's published, **ask the user** rather than guessing — don't invent attribution. Every RTL-motivated diff from the upstream source belongs in the `changes` array, worded as a diff (`"Replaced X with Y for RTL"`), not as a feature description.
8. Give every doc page an explicit **RTL** section (`<ComponentPreview dir="rtl">`) with real Persian/Farsi example content — not just relying on the built-in LTR/RTL toggle button that `<ComponentPreview>` already renders for every preview.

A component that isn't installable via the shadcn CLI yet (still exploratory) shouldn't get a `registry.json` entry or gallery card — see Typography for the pattern (`docs-nav.ts` entry + doc page only, no registry/source-copy machinery, since it's a styling guide rather than a component).

### Adding a new block (future)

Blocks (`apps/web/app/docs/blocks`) aren't implemented yet — the nav entry is disabled ("Coming soon"). When they land, follow shadcn's own convention: `registry:block` items named `<use-case>-<two-digit-number>` (e.g. `dashboard-01`, `login-02`), each composed from existing registry components rather than new bespoke ones, with their own preview page under `/docs/blocks/<name>`. Confirm this convention still matches shadcn's current docs before building the first one — don't assume it's frozen from this note.

## Key structure

- `apps/web` — Next.js 16 docs/marketing site. Renders component docs, live previews, and serves the registry JSON from `public/r/`.
  - `apps/web/registry/base/` — consumer-ready component/lib source, mirrored into `public/r/*.json` by `shadcn build`.
  - `apps/web/registry.json` — the registry manifest (source of truth for what's installable and its dependency graph).
  - `apps/web/components.json` — shadcn CLI config for this repo; `rtl: true`, base color `neutral`, style `base-nova`, icon library `lucide`.
  - `apps/web/lib/site.ts` / `apps/web/lib/github.ts` — canonical site URL (`SITE_URL`) and GitHub repo slug (`GITHUB_REPO`); update both if the domain or repo location changes.
  - `apps/web/components/site-search.tsx` — the header's ⌘K command palette, built on the `Command` component. Its index is generated from `apps/web/lib/docs-nav.ts`, not maintained separately.
- `packages/ui` — the `@workspace/ui` internal package (components, hooks, lib, Tailwind globals) consumed only by `apps/web`.
- `packages/eslint-config`, `packages/typescript-config` — shared lint/tsconfig bases (`base`, `next`, `react-internal` / `base`, `nextjs`, `react-library`) extended by each workspace.

## Conventions

- Components are built on [Base UI](https://base-ui.com) (`@base-ui/react`), styled with Tailwind v4, variants via `class-variance-authority`, class merging via the shared `cn` util.
- RTL-first: logical CSS properties and mirrored icons are the default; components must also work LTR.
- Prettier: no semicolons, double quotes, `trailingComma: es5`, `printWidth: 80`, with `prettier-plugin-tailwindcss` sorting classes against `packages/ui/src/styles/globals.css` (functions `cn`, `cva` are class-sorted too).
- ESLint: flat config per workspace (`apps/web/eslint.config.js`, `packages/ui/eslint.config.js`) extending `@workspace/eslint-config`; `eslint-plugin-only-warn` means lint issues surface as warnings, not hard failures.
- Every component doc page must credit where it came from via `<Credits>` (`apps/web/components/credits.tsx`), placed right under `<LastUpdated>`. Never fabricate a source, a "what changed" list, or publish status — if it isn't already known from context, ask the user for it first.

## Naming conventions

- **Component names**: kebab-case everywhere a slug is needed (file names, `registry.json` `name`, doc route segment, e.g. `hover-card`, `message-scroller`). The human-readable `title` and doc `<h1>` are Title Case (e.g. "Hover Card"). Component function/export names are PascalCase matching the title (`HoverCard`, `MessageScroller`).
- **Example files**: `apps/web/components/examples/<component>-<variant>.tsx`, exporting `<Component><Variant>Example` (e.g. `bubble-reactions.tsx` exports `BubbleReactionsExample`). The default/overview example is `<component>-demo.tsx` → `<Component>DemoExample`. The RTL example is always `<component>-rtl.tsx` → `<Component>RtlExample`, even when the component needs no RTL-specific CSS fix — it still gets a real Farsi example, per the checklist above.
- **Branches**: `feat/<slug>` for new components or features, `fix/<slug>` for bug fixes, `docs/<slug>` for documentation-only changes (like this one), `chore/<slug>` for tooling/dependency work. Slug is a short kebab-case description, not an issue number.
- **Commits**: Conventional-commit-style prefixes, as seen throughout `git log`: `feat:`, `fix:`, `docs:`, `chore:`, optionally scoped `feat(table):` / `fix(bubble):` when the change is localized to one component or area. Body explains *why*, not a restatement of the diff.
- **Blocks** (future, see below): `<use-case>-<two-digit-number>`, e.g. `dashboard-01`.

## Known pitfalls (learned the hard way)

- **`--muted` / `--secondary` / `--accent` are translucent overlays, not opaque fills** (`packages/ui/src/styles/globals.css`, e.g. `--muted: --alpha(var(--color-black) / 4%)`). They're designed to sit on top of an opaque backdrop like `bg-card`/`bg-popover`/`bg-background` (hover states, subtle washes). Using `bg-muted` for a standalone floating chip (a badge, a reaction pill) renders it almost invisible — use `bg-popover` or `bg-card` instead when the element needs to be opaque on its own. This bit the `Bubble` reactions pill; see its Credits section for the fix.
- **Base UI's `render` prop only picks up children placed *inside* the render target, not children passed to the wrapping trigger.** `<PopoverTrigger render={<Button/>}>{<Icon/>}</PopoverTrigger>` silently renders an empty button — the icon never merges in. Every working example in this repo (Dialog, Sheet, Drawer, Tooltip, Pagination) puts the content on the target element itself: `<PopoverTrigger render={<Button><Icon/></Button>} />`. Always follow that pattern, never the former.
- **Third-party hooks that read `Date.now()`/`Math.random()` during render break Next 16's Cache Components prerender** with a "blocking prerender" error, even inside a `"use client"` component — Server Components still SSR client components on first paint. `@tanstack/react-table`'s `useReactTable()` does this internally. Deferring the component with `next/dynamic(..., { ssr: false })` (wrapped in its own `"use client"` file, since that option is illegal directly in a Server Component page) did **not** reliably clear the error for this library — the Table doc page dropped its TanStack example entirely rather than keep fighting it. Treat this as a real constraint when picking example dependencies for a doc page, not just a config detail to work around.
- **RTL conversion checklist** when porting an upstream (shadcn/other) component: `left-`/`right-` → `start-`/`end-`, `pl-`/`pr-` → `ps-`/`pe-`, `ml-`/`mr-` → `ms-`/`me-`, `border-l`/`border-r` → `border-s`/`border-e`, `text-left`/`text-right` → `text-start`/`text-end`, `-space-x-*` → add `rtl:space-x-reverse`, directional icons (chevrons, arrows) → keep the same icon and add `rtl:-scale-x-100` rather than swapping which icon renders per direction (see `breadcrumb.tsx`, `pagination.tsx`). Leave a component's classes untouched (and say so in Credits with `changed: false`) if it has no directional CSS to begin with — don't invent a change for its own sake.
