---
title: "Persian Date"
description: "Jalali/Gregorian date utilities built on date-fns and date-fns-jalali: formatting, parsing, conversion, ranges, and digit conversion, switchable with a calendarType prop."
---

import {
  arithmeticApi,
  comparisonsRangesApi,
  conversionApi,
  dateOptionsApi,
  digitsApi,
  formattingParsingApi,
} from "@/lib/api-data/persian-date"

A single set of date utilities that works across the Jalali (Solar Hijri) and Gregorian calendars: format and parse dates, convert between calendars, do calendar-aware arithmetic, and validate reservation-style ranges — all built on `date-fns` and `date-fns-jalali`.

<LastEdited path="apps/web/content/docs/utilities/persian-date.mdx" />

## Overview

<ComponentPreview name="persian-date-demo" />

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/persian-date"
  sourceName="persian-date"
  sourceKind="lib"
  sourceTitle="lib/persian-date.ts"
  sourceStep="Copy the source into your project"
/>

## Usage

Every function that reads or manipulates calendar fields (months, years, week boundaries) accepts an optional `calendarType` — the Jalali calendar is the default, since this library is Iran-first.

```tsx
import { formatDate, addDays, today } from "@/lib/persian-date"

const checkIn = today()
const checkOut = addDays(checkIn, 3)

formatDate(checkIn, "yyyy/MM/dd") // "1404/06/01" (Jalali by default)
formatDate(checkOut, "d MMMM", { calendarType: "miladi" }) // Gregorian
```

## Examples

### Parsing [#parsing]

parseDate normalizes Persian/Arabic-Indic digits before parsing, and returns null instead of an invalid Date on failure.

<ComponentPreview name="persian-date-parsing" />
### Shamsi ↔ Miladi conversion [#conversion]

toParts/fromParts (and their toShamsi/toMiladi/fromShamsi/fromMiladi shorthands) round-trip a Date through calendar fields without losing precision.

<ComponentPreview name="persian-date-conversion" />
### Calendar-aware arithmetic [#arithmetic]

addMonths and addYears respect the active calendar's month lengths — adding a month to the end of Esfand behaves differently than adding one to the Gregorian February.

<ComponentPreview name="persian-date-arithmetic" />
### Start / end of week, month, year [#boundaries]

startOfWeek/endOfWeek default to a Saturday-start week for shamsi (Sunday for miladi); startOfMonth/endOfMonth and startOfYear/endOfYear follow the same calendar-aware pattern.

<ComponentPreview name="persian-date-boundaries" />
### Leap year & days in month [#leap-year]

isLeapYear and daysInMonth resolve Esfand's 29 vs. 30 days for the Jalali calendar.

<ComponentPreview name="persian-date-leap-year" />
### Comparisons [#comparisons]

isToday, isPast, and isFuture classify a date relative to the current moment.

<ComponentPreview name="persian-date-comparisons" />
### Date range [#range]

eachDayOfRange lists every day in an inclusive range; isWithinRange checks whether a given date falls inside it.

<ComponentPreview name="persian-date-range" />
### Range validation (reservation form) [#reservation]

validateRange is built for hospital/hotel-style booking forms: it checks ordering, minimum/maximum stay length, past dates, and specific blocked dates, returning a machine-readable reason you can map to a message.

<ComponentPreview name="persian-date-reservation" />

### RTL

formatDate already outputs Persian digits and Persian month/weekday names by default in the shamsi calendar, so the formatted string reads naturally inside right-to-left content with no extra direction handling.

<ComponentPreview name="persian-date-rtl" direction="rtl" />

## API Reference

<ApiReference title="Formatting & Parsing" rows={formattingParsingApi} />

<ApiReference title="Conversion" rows={conversionApi} />

<ApiReference title="Arithmetic" rows={arithmeticApi} />

<ApiReference title="Comparisons & Ranges" rows={comparisonsRangesApi} />

<ApiReference title="Digits" rows={digitsApi} />

<ApiReference title="DateOptions" rows={dateOptionsApi} />
