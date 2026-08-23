# Conventions

## Naming

- **Slugs and file names**: kebab-case everywhere (`hover-card`, `message-scroller`, `use-time-ago`).
- **Display names**: Title Case in `registry.json` `title`, doc frontmatter, and headings ("Hover Card", "useTimeAgo").
- **Exports**: PascalCase matching the display name (`HoverCard`, `MessageScroller`).
- **Examples**: `<name>-<variant>.tsx` exporting `<Name><Variant>Example`. Default demo is `-demo`; every component ships an `-rtl` example with real Farsi content.
- **Branches**: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`.
- **Commits**: conventional prefixes — `feat:`, `fix:`, `docs:`, `chore:` — optionally scoped (`fix(bubble): …`). Body explains _why_, not what.

## RTL-first

- Logical CSS properties everywhere: `ms-*`/`me-*`, `ps-*`/`pe-*`, `text-start`/`text-end`, `border-s-*`/`border-e-*`.
- Directional icons mirror via `rtl:-scale-x-100` rather than swapping icons per direction.
- Every component ships an `-rtl` example with real Farsi content, not just the built-in direction toggle.
- When porting an upstream component, list RTL-motivated diffs in the Credits island worded as diffs ("Replaced `pl-6` with `ps-6`").

## Credits

If a component or utility is adapted from upstream (shadcn/ui, coss/ui, …), say so on the doc page via the `<Credits>` island: where it came from, whether anything changed, and exactly what changed. Never fabricate attribution.

## Code style

- Prettier: no semicolons, double quotes, `trailingComma: es5`, print width 80, Tailwind class sorting against `packages/ui/src/styles/globals.css`.
- ESLint: flat config per workspace; issues surface as warnings (`eslint-plugin-only-warn`) but keep the tree clean anyway.
- TypeScript strict; no `any` in public surfaces.

## Docs pages

- Markdown/MDX only — no per-page TSX files. Shared islands: `<ComponentPreview>`, `<ComponentSource>`, `<InstallTabs>`, `<ApiReference>`, `<Credits>`, `<LastEdited>`.
- Persian demo content belongs inside a `dir="rtl"` container when alignment matters.
- Run `bun scripts/check-mdx-components.mts` after editing any page — it catches undefined component references before they hit the browser.

## TypeScript versions

Two compilers coexist in this repo, on purpose:

- `typescript@^6` exists to host the typescript-eslint parser (lint-time type awareness).
- The typecheck gate of record is **TypeScript 7 native**, installed as the `@typescript/native` alias and invoked via `bunx --package @typescript/native tsc --noEmit` in each workspace's `typecheck` script.

The two can disagree (a construct may pass typed lint rules but fail native typecheck, or vice versa), so both `bun run lint` and `bun run typecheck` must run before pushing.

**Removal trigger**: once typescript-eslint officially supports TS7, drop the `typescript` dependency and the alias and standardize on a single compiler.
