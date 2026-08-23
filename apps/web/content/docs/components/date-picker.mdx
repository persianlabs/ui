---
title: "Date Picker"
description: "An opinionated, responsive Shamsi/Gregorian date and date-time picker with SSR-safe defaults and accessible confirmation flows."
---

import { datePickerApi, dateTimePickerApi } from "@/lib/api-data/date-picker"

Use `DatePicker` for the common path and `DateTimePicker` when date and time belong to one field. Both choose a Popover on desktop and a Drawer on mobile, while Calendar and TimePicker remain available as lower-level primitives.

<LastEdited path="apps/web/content/docs/components/date-picker.mdx" />

<Credits
  sources={[
    {
      label: "shadcn/ui",
      href: "https://ui.shadcn.com/docs/components/date-picker",
    },
  ]}
  changed
  changes={[
    "Replaced shadcn's chrono-node natural-language input example with parseDate/formatDate + toLatinDigits from this repo's persian-date utility (no chrono-node dependency here)",
    "Uses this repo's own Calendar (Jalali/Gregorian switchable via calendarType) and Popover components instead of shadcn's react-day-picker Calendar",
    "Added first-class DatePicker and DateTimePicker APIs with responsive presentation, SSR-safe today defaults, and draft/confirm behavior",
    "Added Calendar Type toggle, hospital/hotel Reservation, and Field + zod-validated Form examples not present upstream",
  ]}
/>

## Overview

<ComponentPreview name="date-picker-demo" />

## Installation

Install the complete picker family with one registry command. Its Calendar, TimePicker, Popover, and Drawer dependencies are installed automatically.

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/date-picker"
  packages="react-day-picker @daypicker/persian date-fns @base-ui/react"
  sourceName="date-picker"
  sourceTitle="components/ui/date-picker.tsx"
  sourceStep="Copy the Date Picker component source"
/>

## Usage

```tsx
import { DatePicker } from "@/components/ui/date-picker"

export function Example() {
  return <DatePicker defaultValue="today" />
}
```

## Examples

### Range [#range]

Keep a controlled `DateRange` and pass `onSelect={setRange}` directly. The same single-calendar interaction appears in a Popover on desktop and a Drawer on mobile.

<ComponentPreview name="date-picker-range" />

### Close on Select [#close-on-select]

Control the Popover state and close it after a valid date is selected.

<ComponentPreview name="date-picker-close-on-select" />

### Controlled Value [#controlled]

Own the selected date in application state when other fields, validation, or server mutations need to react to every committed change.

<ComponentPreview name="date-picker-controlled" />

### Constrained Dates [#constrained]

Forward Calendar props to limit selection to a rolling seven-day booking window. The same pattern supports disabled weekdays, minimum dates, and maximum dates.

<ComponentPreview name="date-picker-constrained" />

### Confirmation Modes [#confirmation]

Compare immediate commits with an explicit confirmation flow. Explicit mode is useful when changing the value has expensive side effects.

<ComponentPreview name="date-picker-confirmation" />

### Custom Trigger [#custom-trigger]

Use renderTrigger to replace the default field while retaining disclosure state, formatting, keyboard behavior, and responsive presentation.

<ComponentPreview name="date-picker-custom-trigger" />

### Responsive Presets [#presets-responsive]

Combine controlled state, a responsive Popover/Drawer, and Calendar footer content to provide common dates without giving up free calendar selection.

<ComponentPreview name="date-picker-presets-responsive" />

### With Time [#with-time]

Adds a [Time Picker](/docs/components/time-picker) input below the Calendar. That input opens its own popover on desktop and a drawer on smaller screens, so the wheel is never cramped beneath the calendar.

<ComponentPreview name="date-picker-with-time" />

### Fully Responsive [#responsive]

One trigger opens the familiar Calendar-and-time Popover on desktop, then switches to a single Drawer containing both controls on smaller screens.

<ComponentPreview name="date-picker-responsive" />

### Advanced Time Options [#time-advanced]

Combine a verbose date label with a 12-hour time wheel, Latin digits, seconds, and visible hour/minute/second headings.

<ComponentPreview name="date-picker-time-advanced" />

### Typed Input [#input]

A plain text field the user can type a `yyyy/MM/dd` date into (Persian or Latin digits), parsed live with `parseDate` and `toLatinDigits`, kept in sync with a Calendar opened as a secondary picking method. Digits aren't converted while typing (so the cursor stays predictable) -- they're normalized to a consistent digit style on blur or Enter, once the value is done changing.

<ComponentPreview name="date-picker-input" />

### Date of Birth [#date-of-birth]

Use `captionLayout="dropdown"` for fast year navigation and close the popover on select.

<ComponentPreview name="date-picker-dob" />

### Calendar Type [#calendar-type]

Thread `calendarType` down to Calendar and format the trigger's label with the matching calendar.

<ComponentPreview name="date-picker-calendar-type" />

### Miladi + LTR [#miladi]

Use the Gregorian calendar with English labels, LTR direction, and a long-form trigger format while retaining the same responsive behavior.

<ComponentPreview name="date-picker-miladi" />

### Reservation [#reservation]

A hotel/hospital-style booking form: a range Calendar wired to `validateRange` (minDays, maxDays, disablePast) for stay-length validation, and to [persian-holidays](/docs/utilities/persian-holidays) 's `getHolidaysInRange` to redden holiday cells.

<ComponentPreview name="date-picker-reservation" />

### Zod-Validated Form [#zod-form]

A form built with this repo's [Field](/docs/components/field) components, where a single date is validated with `zPersianDate` and a `{ from, to }` range with `zPersianDateRange` on submit, both driven by Popover+Calendar selection instead of free-text typing.

<ComponentPreview name="date-picker-zod" />

### RTL

The Shamsi calendar (the default) is already RTL. A date-of-birth style field with real Farsi labels and a fully spelled-out trigger date.

<ComponentPreview name="date-picker-rtl" direction="rtl" />

## API Reference

The product-level APIs cover common date and date-time fields. Use [Calendar](/docs/components/calendar) for lower-level day-grid customization.

<ApiReference title="DatePicker" rows={datePickerApi} />

<ApiReference title="DateTimePicker" rows={dateTimePickerApi} />
