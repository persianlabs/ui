# Plan: Migrate docs pages from per-page TSX → fumadocs-mdx content structure

Goal: **same UI, same page contents**, new architecture — exactly how `_example/ui/apps/v4`
(shadcn/ui v4) is structured:

- Every doc page becomes Markdown/MDX under `apps/web/content/docs/**` (+ `meta.json` ordering).
- ONE catch-all route (`app/docs/[[...slug]]/page.tsx`) renders all docs.
- Examples stay as `.tsx` files under `apps/web/components/examples/<name>-<variant>.tsx` (unchanged).
- `.md` endpoints stop being hand-assembled strings; they are served from the raw MDX itself.

Note: `.agents/skills/improve/` exists but contains only an empty `references/` folder (no
`SKILL.md`), so there were no skill instructions to apply. This plan follows repo conventions from
root `CLAUDE.md` instead.

---

## 1. How the reference project works (`_example/ui/apps/v4`)

| Piece | File | Role |
| --- | --- | --- |
| Content source | `source.config.ts` | `defineDocs({ dir: "content/docs" })` + rehype-pretty-code config |
| Deps | `fumadocs-core@16.x`, `fumadocs-mdx@15.x`, `fumadocs-docgen@3.x` | No `fumadocs-ui` — they built their own UI on top, same as us |
| Next wiring | `next.config.mjs` → `createMDX()` from `fumadocs-mdx/next` | Generates `.source/{server,browser,dynamic}.ts` |
| Source loader | `lib/source.ts` | `loader({ baseUrl: "/docs", source: docs.toFumadocsSource() })` |
| Pages | `content/docs/**/*.mdx` + `meta.json` per folder | Frontmatter (`title`, `description`, flags), prose + JSX islands |
| Renderer | `app/(app)/docs/[[...slug]]/page.tsx` | Single page: `source.getPage(slug)` → `doc.body`, TOC from `doc.toc`, prev/next via `findNeighbour(source.pageTree, url)`, copy-page from `page.data.getText("raw")` |
| MDX map | `mdx-components.tsx` | Maps headings (anchor links), `pre`/`code`, `Steps`, `Tabs`, `Callout`, and crucially `ComponentPreview name="…"`, `ComponentSource name="…"` |
| Examples | `examples/*.tsx` resolved **by name** through a generated lazy-import map (`examples/__index__.tsx` + `__components__`) | Live preview + fs-read source |
| LLM/markdown output | `/llm/[[...slug]]/route.ts` + rewrite `/docs/:path*.md → /llm/:path*` | Returns `processMdxForLLMs(await page.data.getText("raw"))` — regex-replaces `<ComponentPreview name>` with fenced example source read from disk |

Key insight: their `.md` endpoint is *the MDX file itself*, post-processed so JSX islands become
plain code fences. Our current system (hand-written `<name>Markdown` string exports +
`markdownBySlug` maps + `getCompleteMarkdown` regex scraping) is a parallel implementation of the
same idea — this migration replaces it with the real thing.

## 2. Current state → target state

| Current (`apps/web`) | Target |
| --- | --- |
| ~80 × `app/docs/components/<name>/{page.tsx,api-data.ts}` + 18 utility dirs + `docs/page.tsx`, `docs/theming/page.tsx`, `docs/components/page.tsx`, `docs/charts/page.tsx` | Deleted. Content moves to `content/docs/{index.mdx, theming.mdx, components/index.mdx, charts.mdx, components/<name>.mdx, utilities/<name>.mdx}` |
| Hand-built `<name>Markdown` exports + `CODE_FENCE`/`apiRowsToMarkdownTable` | Gone — the `.mdx` file **is** the markdown |
| `markdown/route.ts` handlers + `next.config.ts` rewrites → `markdownBySlug` maps | One rewrite `/docs/:path*.md` → one generic handler serving processed raw text |
| `docs-nav.ts` (sidebar + search index + prev/next order) | Replaced by `meta.json`-driven fumadocs page tree; `DocsSidebar`/`site-search.tsx` keep identical UI but read from `source.pageTree` |
| Per-page `tocItems` arrays | `doc.toc` extracted automatically from headings by fumadocs |
| `opengraph-image.tsx` per component folder | Consolidated (see §5.4) |
| `getLastEditedDate(page.tsx path)` | Point at the registry source file (`registry/base/ui/<name>.tsx`) — more meaningful than the deleted page |
| `getExampleSource/getComponentSource` fs readers | Kept as-is; reused by the new name-based `ComponentPreview` |

Non-negotiables (user requirements):

1. UI stays pixel-identical — same header/sidebar/preview/tabs/TOC components, same styling.
2. Page contents stay identical — every section, example, API table, Credits block survives.
3. Examples remain `.tsx` files in `components/examples/`.
4. Only fumadocs **utilities** are installed (`fumadocs-core`, `fumadocs-mdx`, optionally
   `fumadocs-docgen`) — **not** `fumadocs-ui` (we keep our own theme).

## 3. Phases

### Phase 0 — Prep & safety net (~half day)

1. Snapshot parity baseline: run dev server, save rendered HTML + `.md` responses for a
   representative set (introduction, button, accordion, data-table, calendar, theming,
   normalize-persian-digits, components index) into `temp/opencode` for later diffing.
2. Read `node_modules/next/dist/docs/` guides relevant to what we add (optional catch-all routes,
   metadata image files, route handlers) — required by AGENTS.md since this Next has breaking
   changes vs. training data. Validate assumptions in §5 against those docs.
3. Install deps in `apps/web`: `fumadocs-core`, `fumadocs-mdx`, `fumadocs-docgen`
   (match the major line the example uses: core 16.x / mdx 15.x; confirm latest stable that
   supports Next 16.3.2 + `cacheComponents`).

### Phase 1 — Scaffolding in shadow mode (~half day)

Nothing visible changes yet; old static pages still win over the new catch-all, so this lands safe.

1. `apps/web/source.config.ts`: `defineDocs({ dir: "content/docs" })`; wire our existing
   `rehype-pretty-code` options from `lib/highlight.ts` (themes/transformers parity with today's
   `<CodeBlock>`).
2. `next.config.ts`: wrap with `createMDX()` from `fumadocs-mdx/next` (keep existing rewrites for
   now).
3. `apps/web/lib/source.ts`: replace current module (check what it exports today — if anything
   imports it, update call sites) with the fumadocs `loader()`.
4. First content files to smoke-test: `content/docs/index.mdx` (Introduction) +
   root `meta.json`. Run `bunx fumadocs-mdx` typegen; commit `.source` ignore rules
   (`.source/` is generated — gitignore it, unlike the example which commits it).
5. `app/docs/[[...slug]]/page.tsx`: full renderer modeled on the example (generateStaticParams,
   generateMetadata incl. OG/Twitter, TOC rail, prev/next, CopyMarkdownButton fed by raw text),
   styled with our existing layout classes so output matches current pages.
6. `mdx-components.tsx` v1: headings with hover anchors styled exactly like current `h2`/`h3`
   classes, `pre`/`code` → our `<CodeBlock>` visuals, `Steps`/`Step`, `Tabs` family from
   `@workspace/ui/components/tabs`, `Link`, `img`.

**Gate:** `bun run build` green; `/docs` still served by old pages; new route renders the test
Introduction correctly.

### Phase 2 — Bulk content conversion (the big one, 1–2 days)

Do **not** hand-copy 100 pages. Write `scripts/migrate-docs-to-mdx.mts` (run with bun, ts-morph or
regex extraction) that converts each `page.tsx` into its `.mdx`:

Inputs extracted per page:

- `metadata.title` / `description` → frontmatter (`title`, `description`)
- `tocItems` → section skeleton/order (ids prove heading text stays stable)
- `getExampleSource("<name>")` calls, in order → each becomes `## <Section>\n\n<ComponentPreview name="<name>" />` (with `direction="rtl"` where `dir="rtl"` was passed)
- `usageSnippet` / inline `CodeBlock` strings → plain fenced blocks
- `CopyCommand` / `InstallCommand` props → fenced `bash` blocks inside `CodeTabs` CLI/manual structure (mapped components preserve today's two-tab installation UI)
- `api-data.ts` rows → GFM table (Prop/Type/Default/Description) — identical columns to today's
  `<ApiReference>` rendering; see Decision D1
- `Credits` props → frontmatter `credits:` object (sources, changed, changes[]) rendered by a
  mapped `<Credits />` island so visuals are unchanged
- `badge` info from `docs-nav.ts` → frontmatter `badge`

Outputs:

```
content/docs/
  meta.json                      ← groups/order mirroring docs-nav.ts (Getting Started, Components, Utilities, Resources)
  index.mdx                      ← Introduction
  components/
    meta.json
    index.mdx                    ← wraps <ComponentsGrid /> island (the card gallery stays a React component)
    accordion.mdx … wheel-picker.mdx
  charts.mdx                     ← wraps <ChartsGallery /> island (Decision D4)
  theming.mdx                    ← prose + <ThemeVariables /> island (variables are computed at runtime today; keep that, avoids stale copies)
  utilities/
    meta.json
    hitbox.mdx … use-time-ago.mdx
```

Batch order (QA after each batch): Getting Started → 10 components → rest of components →
utilities. After each batch: delete that batch's old page dirs, click through every migrated page
in dev, diff against Phase 0 snapshots, curl its `.md` URL (old rewrite still resolves until
Phase 5 swaps it — keep both alive during migration).

Special cases to handle manually: `data-table` (TanStack pitfall documented in CLAUDE.md),
`typography` (not in registry), `sidebar`/`charts` galleries, `city-selector`-type specials,
pages whose markdown string diverges from the live page (prefer the live page's structure — it's
richer).

### Phase 3 — Name-based runtime islands (~1 day)

1. **Example resolution**: generate `components/examples/__map__.ts` — a static
   `Record<string, ComponentType>` built by a small script scanning `components/examples/*.tsx`
   (regenerate via predev/prebuild hook; ~100 entries, tree-shaken fine). New
   `<ComponentPreview name direction caption>` (in `components/mdx/component-preview.tsx`)
   renders: live example from the map + code tab from `getExampleSource(name)` — visually
   identical to today's `preview={<FooExample/>} code={<CodeBlock .../>}` usage.
   `<ComponentSource name title>` wraps `getComponentSource/getLibSource/getHookSource`.
2. **ApiReference** (Decision D1 default): plain GFM tables authored in the `.mdx`; delete
   `api-data.ts` files and `<ApiReference>` after parity check.
3. **Mapped meta components** reading frontmatter: `<Credits />`, `<LastUpdated />` (switch source
   path to registry file), `<DocsPageFooter />` (href from `page.url`), `<CopyMarkdownButton>`
   gets processed raw text (§5.3).
4. **TOC**: swap `TableOfContents items={handWrittenToc}` for `doc.toc` (same component, same
   look). Verify anchor ids match old ones for deep-link stability (headings are English today;
   keep them English in MDX).
5. **Prev/next**: `findNeighbour(source.pageTree, page.url)` replaces
   `getAdjacentDocsPages()` — order is identical because `meta.json` mirrors `docs-nav.ts`.

### Phase 4 — Sidebar, search, OG images (~1 day)

1. `DocsSidebar`: consume `source.pageTree` (folders from directory structure, order/separators
   from `meta.json`). Badge ("New"/"Coming soon") isn't part of the page-tree node — resolve via
   `source.getPage(url)?.data.badge` (frontmatter schema extension in `defineDocs`), falling back
   to a tiny slug map only for the three disabled nav stubs (Skills, Blocks, Templates) which have
   no pages yet.
2. `site-search.tsx`: flatten the page tree into the exact shape it consumes today. Search
   behavior unchanged; **then delete `docs-nav.ts`**.
3. OG images (Decision D3 default): try one consolidated
   `app/docs/[[...slug]]/opengraph-image.tsx` (catch-all metadata route) reusing
   `lib/component-opengraph-previews.tsx`; if Next 16 disallows catch-all metadata routes
   (verify in bundled docs during Phase 0), fall back to keeping the per-folder
   `opengraph-image.tsx` files (URLs unchanged) and only deleting `page.tsx`/`api-data.ts`.
4. Rewrites: remove ALL per-page markdown rewrites from `next.config.ts`; add single
   `{ source: "/docs/:path*.md", destination: "/markdown/:path*" }` pointing at the new handler
   (below). Keep `/docs.md`, `/docs/theming.md`, etc. working unchanged.

### Phase 5 — Markdown endpoints, cleanup, verification (~1 day)

1. `app/markdown/[[...slug]]/route.ts` (outside `/docs` to avoid page/route conflict): returns
   `processMarkdownForLlms(await page.data.getText("raw"))` — port of the example's
   `lib/llm.ts`:
   - `<ComponentPreview name="x" />` → ```` ```tsx ```` fence with `getExampleSource("x")`
     (already rewrites `@workspace/ui/*` → `@/*`)
   - `<ComponentSource name="x" />` → fence with `getComponentSource("x")`
   - `<ComponentsGrid />` / `<ThemeVariables />` → generated list/CSS text (port
     `replaceComponentsList` idea)
   - Strip UI-only islands (`Credits`, `LastUpdated`, footer) from output
   - If D1 = tables, API reference needs no processing at all (already GFM in the source)
2. `CopyMarkdownButton` on each page receives this same processed string (server-side prop, like
   the example's `DocsCopyPage`) — copy button and `.md` URL always agree.
3. Delete: all old page dirs + `api-data.ts`, `markdownBySlug` route files,
   `lib/markdown.ts` helpers (if unreferenced), `docs-nav.ts`, old `lib/source.ts` remnants.
4. Update root `CLAUDE.md` workflow §"register a new component end-to-end": step 4 becomes
   “create `content/docs/components/<name>.mdx` + `meta.json` entry”; markdown-endpoint step
   collapses to “curl `<url>.md`”.
5. Prettier: decide `.mdx` policy — add `mdx` to the format glob or `.prettierignore` (repo
   formats only `ts,tsx` today; recommend ignoring `.mdx` initially to avoid churn).
6. Full gate: `bun run lint && bun run format && bun run typecheck && bun run build`; script a
   loop curl-ing every `.md` URL enumerated from `source.generateParams()` asserting 200 + content;
   HTML-diff the Phase 0 snapshot set; manual pass on mobile nav + ⌘K search.

## 4. What we deliberately keep

- All UI components (`component-preview` visuals, `CodeBlock`, `CodeTabs`, `ApiReference` styling,
  `Credits`, `LastUpdated`, `TableOfContents`, sidebar/header/footer/search).
- `packages/ui` dual-copy architecture and `shadcn build` registry pipeline (untouched).
- Examples as `.tsx` under `components/examples/` with existing naming conventions.
- Existing URLs — zero route/path changes, including `.md` endpoints.

## 5. Decisions needed before execution (defaults chosen)

| # | Question | Recommendation |
| --- | --- | --- |
| D1 | API Reference in MDX: plain GFM table (shadcn-style) vs keep `<ApiReference rows={imported}>` island | **GFM tables** — kills `api-data.ts`, makes `.md` output perfect for free; visuals match today's table |
| D2 | Sidebar/search source of truth: `meta.json` page tree vs keep `docs-nav.ts` forever | **meta.json page tree** — that's the point of the migration; one less hand-maintained file |
| D3 | OG images: consolidated `[[...slug]]/opengraph-image.tsx` vs keep per-folder | **Try consolidated**, fall back to per-folder (verify Next 16 support in Phase 0) |
| D4 | `/docs/charts` and `/docs/components` galleries: convert to `.mdx` wrapping a React island vs keep as standalone pages outside the catch-all | **`.mdx` + island** — uniformity wins; the island keeps the rich grid UI |
| D5 | Serve `.md` with Credits/LastUpdated stripped (like shadcn's LLM output)? | **Strip** — cleaner for LLM/copy consumption |

## 6. Risks

- **Next 16 quirks** (`cacheComponents`, `typedRoutes`, optional-catchall + static shadowing,
  metadata-file conventions): mitigated by Phase 0 doc reading + shadow-mode gating. Known repo
  pitfalls (render-time `Date.now()` in LastUpdated paths, prerender blockers) explicitly called
  out in CLAUDE.md must be respected in the new catch-all (keep `force-static` semantics like the
  example).
- **Fumadocs ↔ Next 16.3.2 stable compatibility**: example pins a Next canary; pin the newest
  fumadocs line and prove `bun run build` early (Phase 1 gate) before any content moves.
- **Anchor-id drift** breaking deep links: keep English section headings; compare `doc.toc` ids vs
  old `tocItems` ids per page during conversion (codemod asserts equality).
- **Content drift between markdown string and live page**: codemod always derives from the live
  page structure; the `<name>Markdown` strings are retired, not migrated.
- **~100-file bulk edit**: batched conversion with per-batch QA gates; git per-batch commits
  (`docs: migrate <batch> pages to mdx` per naming conventions).

Total estimate: ~4–5 focused days.
