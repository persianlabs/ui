---
title: "Persian Numbers, Currency & Dates"
description: "A practical guide to Persian digits, grouped prices, the Toman currency, and Shamsi dates - every component and utility that gets them right."
---

Persian interfaces have three recurring conventions that trip up otherwise-fine codebases: Persian digits, grouped currency, and Shamsi dates. This page points you at the components and utilities that handle each, and shows how they fit together.

## 1. Digits — ۰-۹, not 0-9

Users type and expect Persian digits. Normalize input and Persianify output with the same primitives the inputs use internally.

| Need                                  | Tool                                                                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Convert Persian/Arabic-Indic to Latin | [Normalize Persian Digits](/docs/utilities/normalize-persian-digits)                                                                       |
| Convert to Persian                    | `toPersianDigits` from [Persian Date](/docs/utilities/persian-date)                                                                        |
| Read free-form user input             | [Mobile Number Input](/docs/components/mobile-number-input), [National ID Input](/docs/components/national-id-input) normalize as you type |

## 2. Currency — Toman and grouped prices

Toman is the everyday currency unit in Iran. The library ships a dedicated icon and a live-formatting price input.

| Need                                   | Tool                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| The Toman symbol                       | [Toman Icon](/docs/components/toman-icon)                                                               |
| Live-grouped price input (`۱٬۲۳۴٬۵۶۷`) | [Price Input](/docs/components/price-input)                                                             |
| Spell an amount for cheques/invoices   | [Number to Persian Words](/docs/utilities/number-to-persian-words) (`فقط دو میلیون و پانصد هزار تومان`) |

A common amount flow, end to end:

```tsx
<PriceInput value={amount} onValueChange={setAmount} suffix={<TomanIcon />} />
```

## 3. Shamsi dates

The Jalali calendar is the default for Persian products. Everything date-related is Shamsi/Jalali-aware and switchable.

| Need                                | Tool                                                                                                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| A date picker (Shamsi or Gregorian) | [Date Picker](/docs/components/date-picker), [Date Wheel Picker](/docs/components/date-wheel-picker) |
| Date math, formatting, conversion   | [Persian Date](/docs/utilities/persian-date)                                                         |
| Validate dates in a schema          | [Persian Date (Zod)](/docs/utilities/persian-date-zod)                                               |
| Know if a day is a holiday          | [Persian Holidays](/docs/utilities/persian-holidays)                                                 |
| Relative time ("۲ روز پیش")         | [useTimeAgo](/docs/utilities/use-time-ago)                                                           |

Example — format today and flag a holiday:

```tsx
import { formatDate, isHoliday } from "@/lib/persian-date"
```

## 4. Putting it together

A typical checkout total, RTL, with Persian digits, Toman, and a Shamsi date stamp uses pieces from the sections above — the components share the same digit and date primitives, so the output stays consistent everywhere in your app.

## Next steps

- [Theming](/docs/theming) — tune the color tokens these components read.
- [FAQ](/docs/faq) — common gotchas around digits, dates, and RTL.
