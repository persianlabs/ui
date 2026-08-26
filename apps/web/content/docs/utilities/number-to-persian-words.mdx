---
title: "Number to Persian Words"
description: "Spells numbers out in Persian words — Latin or Persian digits, negatives, decimals, thousands separators, compact mixed style, and rial-to-toman conversion included."
---

import { numberToPersianWordsApi } from "@/lib/api-data/number-to-persian-words"

Converts any number into its spoken Persian form — «۱۲۵۰۰۰۰۰» becomes «دوازده میلیون و پانصد هزار». Useful for invoice totals, contract amounts, and payment confirmations where the amount must also appear in words. A compact `mixed` mode mirrors banking-app style: «12 میلیون و 500 هزار تومان».

<LastEdited path="apps/web/content/docs/utilities/number-to-persian-words.mdx" />

## Overview

Type an amount and play with the unit, spelling style, and rial-to-toman conversion; the text updates as you type.

<ComponentPreview name="number-to-persian-words-demo" />

## Installation

<InstallTabs command="npx shadcn@latest add @persianlabsui/number-to-persian-words" sourceName="number-to-persian-words" sourceKind="lib" sourceTitle="lib/number-to-persian-words.ts" sourceStep="Copy the source into your project" />

## Usage

```tsx
import { numberToPersianWords } from "@/lib/number-to-persian-words"

numberToPersianWords(12500000) // دوازده میلیون و پانصد هزار
numberToPersianWords("12,345") // دوازده هزار و سیصد و چهل و پنج
numberToPersianWords("-0.5") // منفی صفر ممیز پنج دهم
numberToPersianWords("۴۵۶", { suffix: "تومان" }) // چهارصد و پنجاه و شش تومان

// Compact banking style — scaled groups stay numeric
numberToPersianWords(12500000, { mode: "mixed", suffix: "تومان" })
// 12 میلیون و 500 هزار تومان

// Rial input, shown as toman when it divides evenly
numberToPersianWords(10, { rialToToman: true }) // یک تومان
numberToPersianWords(1, { rialToToman: true }) // یک ریال
numberToPersianWords(12500000, { rialToToman: true, mode: "mixed" })
// 1 میلیون و 250 هزار تومان
```

## Examples

### Unit inside an Input Group

Pair [Price Input](/docs/components/price-input) with an [Input Group](/docs/components/input-group) so the unit rides at the end of the field:

<ComponentPreview name="number-to-persian-words-unit" />

### Leading unit (LTR)

The same combo with the unit up front, for LTR layouts:

<ComponentPreview name="number-to-persian-words-ltr" />

## Behavior

- **Input formats** — plain `number`, or strings with Latin, Persian (۰-۹), or Arabic-Indic (٠-٩) digits. Thousands separators (`،` `,` `'` `_` spaces) are ignored, and a leading `+`/`-` sets the sign.
- **Decimals** — the fraction reads after «ممیز» with ordinal suffixes: `0.505` → «صفر ممیز پانصد و پنج هزارم». Trailing zeros are trimmed first (`2.50` → «دو ممیز پنج دهم»). Fractions always spell out, even in `mixed` mode.
- **Mixed mode** — thousand-scale groups stay numeric («12 میلیون», «500 هزار») and only the final sub-thousand group spells out (`1234567` → «1 میلیون و 234 هزار و پانصد و شصت و هفت»). Zero groups collapse: `1000001` → «1 میلیون و یک».
- **Invalid input** — anything without a readable number (`""`, `"abc"`) returns an empty string, so callers can render their own fallback.
- **Currency suffix** — pass `{ suffix: "تومان" }` to append a unit word («صد میلیارد تومان»). Defaults to none; blank suffixes are ignored, and the suffix is never attached to empty or out-of-range results.
- **Rial to toman** — `{ rialToToman: true }` treats the value as rial: divisible-by-10 amounts convert (`10` → «یک تومان», `12500000` → «…تومان») and everything else stays rial (`15` → «پانزده ریال»). It manages the unit itself, so `suffix` is ignored while it's on.
- **Limits** — integers up to 24 digits (999 تریلیارد…) and fractions up to 9 significant digits; past either, the function returns «عدد خارج از محدوده است» or truncates extra fraction digits. Both caps live in `NUMBER_WORDS_LIMITS`.

## API Reference

<ApiReference title="number-to-persian-words" rows={numberToPersianWordsApi} />
