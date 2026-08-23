---
title: "useDate"
description: "A reactive current date/time hook with Jalali/Gregorian support, formatted output, and optional holiday flagging."
---

import { useDateApi, useDateResultApi } from "@/lib/api-data/use-date"

A ticking clock hook built on `persian-date` and `persian-holidays`. Returns the current date/time, a ready-to-render formatted string, individual calendar fields, and — when asked — whether today is a holiday.

<LastEdited path="apps/web/content/docs/utilities/use-date.mdx" />

## Overview

<ComponentPreview name="use-date-demo" />

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/use-date"
  sourceName="use-date"
  sourceKind="hook"
  sourceTitle="hooks/use-date.ts"
  sourceStep="Copy the source into your project"
/>

## Usage

```tsx
import { useDate } from "@/hooks/use-date"

function Clock() {
  const date = useDate({ checkHoliday: true })

  // null on the server and on the very first client render -- "now" can't be
  // read consistently in both places, so the hook waits until it has mounted.
  if (!date) return null

  const { formatted, isHoliday } = date

  return (
    <span>
      {formatted}
      {isHoliday ? " (تعطیل)" : ""}
    </span>
  )
}
```

## Examples

### Gregorian mode [#miladi]

Set calendarType: "miladi" to switch the formatted output and returned fields to the Gregorian calendar.

<ComponentPreview name="use-date-miladi" />
### Custom pattern & digits [#pattern]

pattern accepts any date-fns token, and digits lets you force Latin digits even in the shamsi calendar.

<ComponentPreview name="use-date-pattern" />
### Disabling the tick [#static]

Pass interval: 0 to read the time once on mount without setting up a timer — useful for a one-shot timestamp.

<ComponentPreview name="use-date-static" />
### Holiday flagging [#holiday]

checkHoliday: true flags the current date against the built-in Iranian holiday dataset and lists any matching entries.

<ComponentPreview name="use-date-holiday" />
### Day/week/month/year navigator [#navigator]

A selected-date navigator built from persian-date's addDays/addWeeks/addMonths/addYears -- a common pattern for calendar/agenda UIs that step through time by different units.

<ComponentPreview name="use-date-navigator" />

### RTL

The shamsi calendar's month and weekday names are already Persian, so a pattern like `EEEE d MMMM yyyy` reads naturally in right-to-left content.

<ComponentPreview name="use-date-rtl" direction="rtl" />

## API Reference

<ApiReference title="useDate(options?)" rows={useDateApi} />

<ApiReference title="UseDateResult" rows={useDateResultApi} />
