---
title: "Persian Holidays"
description: "Official/religious/cultural Iranian holiday lookup for a date, range, or year, resolving Jalali, Gregorian, and tabular-Hijri entries."
---

import {
  getHolidaysOptionsApi,
  holidaysApi,
  lowLevelHijriApi,
  resolvedHolidayApi,
} from "@/lib/api-data/persian-holidays"

Look up official, religious, and cultural Iranian holidays for a single date, a range, or a whole calendar year. Jalali and Gregorian entries resolve to an exact date; Hijri (lunar) entries are resolved with a tabular approximation and flagged `approximate: true`, since Iran announces religious holidays by moon sighting.

<LastEdited path="apps/web/content/docs/utilities/persian-holidays.mdx" />

<Credits
  sources={[
    {
      label: "BaseMax/persian-holidays-api",
      href: "https://github.com/BaseMax/persian-holidays-api",
    },
  ]}
  changed
  changes={[
    "Trimmed the dataset to recurring month/day entries (dropped year-specific fields).",
    "Converted month names to numeric, 1-indexed month indices.",
    "Added a tabular Hijri→Gregorian resolution with approximate flagging for lunar entries.",
    "Added official/includeUnofficial filtering so callers can request only official days off.",
  ]}
/>

## Overview

<ComponentPreview name="persian-holidays-demo" />

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/persian-holidays"
  sourceName="persian-holidays"
  sourceKind="lib"
  sourceTitle="lib/persian-holidays.ts"
  sourceStep="Copy the source into your project"
/>

## Usage

```tsx
import { getHolidays, isHoliday } from "@/lib/persian-holidays"

import { today } from "@/lib/persian-date"

const holidays1404 = getHolidays(1404) // Jalali year 1404
const isTodayOff = isHoliday(today())
```

## Examples

### Lookup a date [#lookup]

isHoliday and getHolidayInfo check whether a specific date is a holiday, and list every matching entry.

<ComponentPreview name="persian-holidays-lookup" />
### Official vs. unofficial [#unofficial]

By default only official days off are returned. Pass includeUnofficial: true to also list commemorative occasions.

<ComponentPreview name="persian-holidays-unofficial" />
### Calendar grid [#calendar]

getHolidaysInRange over a month's boundaries makes it easy to color holiday cells in a calendar grid.

<ComponentPreview name="persian-holidays-calendar" />
### Hijri approximation [#approximate]

Lunar (hijri) holidays resolve through a tabular approximation and come back with approximate: true — treat these dates as a best-effort estimate, not an announcement.

<ComponentPreview name="persian-holidays-approximate" />

### RTL

Holiday titles are Persian text end-to-end, so this reads naturally inside right-to-left layouts without any extra direction handling.

<ComponentPreview name="persian-holidays-rtl" direction="rtl" />

## API Reference

<ApiReference title="persian-holidays" rows={holidaysApi} />

<ApiReference title="GetHolidaysOptions" rows={getHolidaysOptionsApi} />

<ApiReference title="ResolvedHoliday" rows={resolvedHolidayApi} />

<ApiReference title="Low-level Hijri helpers" rows={lowLevelHijriApi} />
