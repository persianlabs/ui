import type { ApiReferenceRow } from "@/components/api-reference"

export const dateWheelPickerApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Date",
    default: "—",
    description: "The selected date in controlled mode.",
  },
  {
    prop: "defaultValue",
    type: "Date",
    default: "1403/01/01 (Nowruz)",
    description: "The initial selected date in uncontrolled mode.",
  },
  {
    prop: "onValueChange",
    type: "(date: Date) => void",
    default: "—",
    description: "Called when the selected date changes.",
  },
  {
    prop: "calendarType",
    type: '"shamsi" | "miladi"',
    default: '"shamsi"',
    description:
      "Switches the year/month/day wheels between the Jalali and Gregorian calendars, including correct month lengths (e.g. Esfand's 29/30 days) via persian-date.",
  },
  {
    prop: "digits",
    type: '"fa" | "en"',
    default: '"fa"',
    description: "Digit style used for the year/day wheel labels.",
  },
  {
    prop: "minYear",
    type: "number",
    default: '1300 ("shamsi") / 1921 ("miladi")',
    description: "Lower bound of the year wheel, in calendarType's years.",
  },
  {
    prop: "maxYear",
    type: "number",
    default: '1450 ("shamsi") / 2071 ("miladi")',
    description: "Upper bound of the year wheel, in calendarType's years.",
  },
  {
    prop: "yearStep",
    type: "number",
    default: "1",
    description:
      "Interval between year wheel options, e.g. 5 for a decade-jump picker. When greater than 1, value/defaultValue's year must land on the stepped sequence to be selectable.",
  },
  {
    prop: "loop",
    type: "boolean",
    default: "false",
    description:
      "Whether the year/month/day wheels loop past their ends (e.g. December wrapping back to January). Off by default so scrolling past December doesn't silently jump back to January.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Additional classes for the WheelPickerWrapper.",
  },
]

export const responsiveDateWheelPickerApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "—",
    description: "Whether the popover/drawer is open, in controlled mode.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "The initial open state, in uncontrolled mode.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
]

export const responsiveDateWheelPickerContentApi: ApiReferenceRow[] = [
  {
    prop: "value / defaultValue / onValueChange",
    type: "—",
    default: "—",
    description: "Forwarded to the inner DateWheelPicker.",
  },
  {
    prop: "calendarType / digits / minYear / maxYear / yearStep",
    type: "—",
    default: "—",
    description: "Forwarded to the inner DateWheelPicker.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Popover alignment (desktop only).",
  },
  {
    prop: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"bottom"',
    description: "Popover side (desktop only).",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "6",
    description: "Popover offset from the trigger (desktop only).",
  },
]
