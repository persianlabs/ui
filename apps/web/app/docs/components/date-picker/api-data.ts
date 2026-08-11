import type { ApiReferenceRow } from "@/components/api-reference"

export const datePickerApi: ApiReferenceRow[] = [
  {
    prop: "mode",
    type: '"single" | "range"',
    description:
      "Calendar's selection mode. Use single for one date, range for a from/to pair.",
  },
  {
    prop: "selected / onSelect",
    type: "Date | DateRange | undefined",
    description:
      "The Calendar's controlled selection, shaped according to mode. Drive the Popover trigger's label from this value with formatDate.",
  },
  {
    prop: "calendarType",
    type: '"shamsi" | "miladi"',
    default: '"shamsi"',
    description:
      "Passed straight through to Calendar to switch between the Jalali and Gregorian calendars.",
  },
  {
    prop: "captionLayout",
    type: '"label" | "dropdown"',
    default: '"label"',
    description:
      "Use dropdown for fast year navigation in date-of-birth style pickers.",
  },
  {
    prop: "numberOfMonths",
    type: "number",
    default: "1",
    description: "Render two months side by side for a range picker.",
  },
  {
    prop: "disabled",
    type: "Matcher | Matcher[]",
    description:
      "Blocks unavailable dates, e.g. { before: today } to disable the past.",
  },
  {
    prop: "modifiers / modifiersClassNames",
    type: "Record<string, Matcher> / Record<string, string>",
    description:
      "Highlight holidays or other named day sets — see the Reservation example.",
  },
  {
    prop: "open / onOpenChange",
    type: "boolean / (open: boolean) => void",
    description:
      "Popover's controlled open state — close it from Calendar's onSelect once a value is picked.",
  },
]
