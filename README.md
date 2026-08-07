<p align="center">
  <a href="https://ui.persian-labs.ir">
    <img src="./apps/web/public/favicon.svg" alt="PersianLabs/ui logo" width="88" height="88" />
  </a>
</p>

<h1 align="center">PersianLabs/ui</h1>

<p align="center">
  RTL-first, copy-paste components for Persian interfaces. Copy the source, own the code.
</p>

<p align="center">
  <a href="https://github.com/persianlabs/ui/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/persianlabs/ui?color=000000&style=flat-square" /></a>
  <a href="https://ui.shadcn.com/docs/registry"><img alt="shadcn compatible" src="https://img.shields.io/badge/shadcn-compatible-000000?style=flat-square" /></a>
</p>

<p align="center">
  <a href="https://ui.persian-labs.ir/docs">Docs</a>
  ·
  <a href="https://ui.persian-labs.ir/docs/components">Components</a>
  ·
  <a href="https://ui.persian-labs.ir/llms.txt">llms.txt</a>
</p>

<p align="center">
  <a href="https://ui.persian-labs.ir"><img src="./.github/og-image.png" alt="PersianLabs/ui preview" width="640" /></a>
</p>

## What is PersianLabs/ui?

PersianLabs/ui is a small component library built RTL-first for Persian interfaces — logical properties, mirrored icons, and a Vazirmatn font fallback for Persian text in this project's docs site, with full LTR support too.

Every component ships as plain React and Tailwind, distributed through a [shadcn-compatible registry](https://ui.shadcn.com/docs/registry). There's no package to install and no version to chase — components land straight in your codebase, so you can read, extend, and refactor every line.

## Install a component

Open any component page and copy the install command.

```bash
npx shadcn@latest add https://ui.persian-labs.ir/r/city-selector.json
```

Once the `@persianlabsui` namespace is accepted into shadcn's registry directory, the shorter form will also work:

```bash
npx shadcn@latest add @persianlabsui/city-selector
```

You can also copy the source directly from the component page.

## For AI agents

PersianLabs/ui exposes a static endpoint that coding agents can read without scraping the UI.

```txt
https://ui.persian-labs.ir/llms.txt
```

## Run locally

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
bun run typecheck
bun run lint
bun run build
```

## Contributing

Components live in `packages/ui/src/components`, docs and examples in `apps/web`, and registry entries in `apps/web/registry.json`.
