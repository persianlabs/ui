---
title: "Normalize Persian Text"
description: "Unifies Arabic-codepage letters onto Persian ones (ي→ی, ك→ک) with opt-in digit folding, diacritic stripping, half-space repair, and space tidying."
---

import { normalizePersianTextApi } from "@/lib/api-data/normalize-persian-text"

Text pasted from Arabic keyboards and legacy fonts is full of look-alike codepoints — ي instead of ی، ك instead of ک — that break search, duplicate database rows, and render inconsistently. This utility unifies them onto their canonical Persian letters in one pass, with opt-in cleanup for digits, diacritics, half-spaces, and whitespace. [Price Input](/docs/components/price-input) uses its digit helper internally.

<LastEdited path="apps/web/content/docs/utilities/normalize-persian-text.mdx" />

## Overview

Edit the sample or flip the toggles; the normalized output updates as you type.

<ComponentPreview name="normalize-persian-text-demo" />

## Installation

<InstallTabs command="npx shadcn@latest add @persianlabsui/normalize-persian-text" sourceName="normalize-persian-text" sourceKind="lib" sourceTitle="lib/normalize-persian-text.ts" sourceStep="Copy the source into your project" />

## Usage

```tsx
import { normalizePersianText } from "@/lib/normalize-persian-text"

// Letters are always unified:
normalizePersianText("كتاب ي") // کتاب ی

// Opt-ins for lossier pipelines:
normalizePersianText("۱۲۳", { digits: true }) // 123
normalizePersianText("مُستَحِقّ", { diacritics: true }) // مستحق
normalizePersianText("خانه ‌ها", {}) // خانه ها — stray ZWNJ dropped

// Aggressive search-key builder:
normalizePersianText("كتاب‌‌هاي خـواندني؟", { digits: true, diacritics: true })
```

## Examples

### Search keys

Turn every lossy option on to build a stable key from messy input — Arabic codepage letters, vocalized text, broken half-spaces, Persian digits:

<ComponentPreview name="normalize-persian-text-search" />

## Behavior

- **Letter unification (always on)** — `ي ى → ی`, `ك → ک`, `أ إ ٱ → ا`, `ة → ه`. Everything else passes through untouched.
- **Digits** — off by default; `{ digits: true }` folds ۰-۹ and ٠-٩ to ASCII via [Normalize Persian Digits](/docs/utilities/normalize-persian-digits).
- **Diacritics** — off by default; `{ diacritics: true }` strips harakat, Quranic superscripts, and kashida elongations (`کتاـــب` → «کتاب»).
- **Half-space repair** — on by default; consecutive ZWNJs collapse to one and strays beside spaces, punctuation, or string edges are dropped. Meaningful half-spaces like «خانه‌ها» survive. Disable with `{ zwnj: false }`.
- **Spaces** — on by default; blank runs collapse to a single space and ends are trimmed. Line breaks survive. Disable with `{ spaces: false }`.

## API Reference

<ApiReference title="normalize-persian-text" rows={normalizePersianTextApi} />
