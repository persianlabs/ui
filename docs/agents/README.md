# PersianLabs/ui — Guide for AI Agents

PersianLabs/ui is an open-source, RTL-first component library for Persian interfaces. Components are beautifully-designed, accessible, built on [Base UI](https://base-ui.com) primitives with TypeScript and Tailwind CSS v4, and distributed as **source code** through a [shadcn-compatible registry](https://ui.shadcn.com/docs/registry) — there is no package to install and no version to chase.

This guide is for AI coding agents (Claude Code, Cursor, Copilot, Codex, …) that want to consume or extend the library.

## Reading the docs as markdown

Every documentation page has a markdown twin. Append `.md` to any docs URL:

```bash
curl https://ui.persian-labs.ir/docs/components/button.md
```

The response contains the full page as clean markdown: headings, install commands, every live-example source, and complete API tables. No scraping or HTML-to-markdown conversion needed.

The site-wide index is published at [`https://ui.persian-labs.ir/llms.txt`](https://ui.persian-labs.ir/llms.txt) in the [llms.txt](https://llmstxt.org) convention — one line per component and utility with a short description, grouped by category:

```text
## Components

### Form & Input

- [Button](https://ui.persian-labs.ir/docs/components/button): A button built on Base UI with variant and size support.
...
```

## Installing components programmatically

Any of these forms work with the shadcn CLI:

```bash
npx shadcn@latest add @persianlabsui/button
npx shadcn@latest add https://ui.persian-labs.ir/r/button.json
```

To inspect what an install will do without running it, fetch the registry item definition:

```bash
curl https://ui.persian-labs.ir/r/button.json
```

The JSON includes the target file paths, `registryDependencies`, and npm `dependencies`.

## RTL by default

Everything is built RTL-first: logical CSS properties (`ms-*` / `me-*`, `ps-*` / `pe-*`, `text-start`), mirrored icons via `rtl:-scale-x-100`, and Persian sample content throughout. Components render correctly under `dir="rtl"` with zero configuration — no RTL variant to import.

## Useful entry points

| Resource | URL |
| --- | --- |
| llms.txt index | <https://ui.persian-labs.ir/llms.txt> |
| Any doc page as markdown | `https://ui.persian-labs.ir/docs/<path>.md` |
| Registry item JSON | `https://ui.persian-labs.ir/r/<name>.json` |
| Contributing guide | [docs/contributing/README.md](../contributing/README.md) |
| Adding a component | [docs/contributing/adding-a-component.md](../contributing/adding-a-component.md) |
