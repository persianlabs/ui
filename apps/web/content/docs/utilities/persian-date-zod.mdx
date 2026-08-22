---
title: "Persian Date (Zod)"
description: "zod schemas for persian-date: coerce and validate a date, or a from/to reservation-style range."
---

import { zPersianDateApi, zPersianDateRangeApi } from "@/lib/api-data/persian-date-zod"

`zPersianDate` coerces an ISO-8601 string, a shamsi `yyyy/MM/dd` string, an epoch number, or a native `Date` into a validated `Date`, with inclusive `min`/`max` bounds. `zPersianDateRange` wraps a `from`/`to` pair with [persian-date's](/docs/utilities/persian-date) `validateRange` rules -- ordering, minimum/maximum stay length, past dates, and blocked dates.

<LastEdited path="apps/web/content/docs/utilities/persian-date-zod.mdx" />

## Overview

Type an ISO date (`2026-08-10`) or a shamsi date (`1405/05/19`) below -- both parse to the same schema.

<ComponentPreview name="persian-date-zod-demo" />

## Installation

<InstallTabs command="npx shadcn@latest add @persianlabsui/persian-date-zod" sourceName="persian-date-zod" sourceKind="lib" sourceTitle="lib/persian-date-zod.ts" sourceStep="Copy the source" />

## Usage

```tsx
import { z } from "zod"

import { zPersianDate, zPersianDateRange } from "@/lib/persian-date-zod"

const Booking = z.object({
  checkIn: zPersianDate({ min: "2026-01-01" }),
  checkOut: zPersianDate(),
})

Booking.parse({ checkIn: "1405/10/01", checkOut: new Date() })
// -> { checkIn: Date, checkOut: Date } -- both coerced to native Date

const Stay = zPersianDateRange({ minDays: 1, maxDays: 14, disablePast: true })
Stay.parse({ checkIn: "2026-08-10", checkOut: "2026-08-12" })
```

Both schemas are plain zod schemas, so they drop into any zod-based form resolver (react-hook-form, VeeValidate, Felte, ...) the same way any other zod field would.

## Examples

### Bounds

The demo above is bounded to 2026 (`{`min: "2026-01-01"`}`, `{`max: "2026-12-31"`}`) -- try a date outside that range to see the bound violation message.

### Range validation

`zPersianDateRange` validates a check-in/check-out pair in one schema -- the same reservation-form use case persian-date's `validateRange` targets, just expressed as a zod schema you can plug into a form resolver.

<ComponentPreview name="persian-date-zod-range" />

## API Reference

<ApiReference title="zPersianDate(options?)" rows={zPersianDateApi} />

<ApiReference title="zPersianDateRange(options?)" rows={zPersianDateRangeApi} />
