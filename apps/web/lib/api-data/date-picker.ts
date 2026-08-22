import type { ApiReferenceRow } from "@/components/api-reference"

const sharedRows: ApiReferenceRow[] = [
  {
    prop: "presentation",
    type: '"auto" | "popover" | "drawer"',
    default: '"auto"',
    description:
      "Uses a Popover above mobileBreakpoint and a Drawer below it, or forces one presentation.",
  },
  {
    prop: "mobileBreakpoint",
    type: "number",
    default: "800",
    description: "Viewport width where auto presentation switches modality.",
  },
  {
    prop: "calendarType",
    type: '"shamsi" | "miladi"',
    default: '"shamsi"',
    description: "Selects the Jalali or Gregorian calendar system.",
  },
  {
    prop: "open / defaultOpen / onOpenChange",
    type: "boolean / boolean / (open: boolean) => void",
    default: "— / false / —",
    description: "Controlled or uncontrolled disclosure state.",
  },
  {
    prop: "calendarProps",
    type: "DatePickerCalendarProps",
    default: "—",
    description:
      "Forwards advanced Calendar options without exposing selection internals.",
  },
  {
    prop: "drawerTitle",
    type: "string",
    default: "placeholder",
    description: "Sets the accessible dialog title used by the mobile Drawer.",
  },
  {
    prop: "renderTrigger",
    type: "(state) => ReactElement",
    default: "—",
    description:
      "Replaces the default trigger while preserving picker behavior.",
  },
]

export const datePickerApi: ApiReferenceRow[] = [
  {
    prop: "value / defaultValue / onValueChange",
    type: 'Date | null / Date | "today" | null / (value) => void',
    default: "— / null / —",
    description:
      'Controlled or uncontrolled selection. "today" is resolved safely after mount.',
  },
  {
    prop: "confirmMode",
    type: '"auto" | "immediate" | "explicit"',
    default: '"auto"',
    description:
      "Auto commits immediately in a Popover and requires confirmation in a Drawer.",
  },
  {
    prop: "format / placeholder",
    type: "string / string",
    default: '"yyyy/MM/dd" / "انتخاب تاریخ"',
    description: "Controls the default trigger's selected and empty labels.",
  },
  ...sharedRows,
]

export const dateTimePickerApi: ApiReferenceRow[] = [
  {
    prop: "value / defaultValue / onValueChange",
    type: "DateTimePickerValue / { date?, time? } / (value) => void",
    default: "— / — / —",
    description:
      "Coordinates date and time as one field with draft state until confirmation.",
  },
  {
    prop: "hourFormat / digits",
    type: '"24" | "12" / "fa" | "en"',
    default: '"24" / "fa"',
    description: "Controls time formatting and wheel digits.",
  },
  {
    prop: "showSeconds / showTimeLabels",
    type: "boolean / boolean",
    default: "false / false",
    description: "Adds seconds and optional h/m/s wheel headings.",
  },
  {
    prop: "dateFormat / placeholder / timeLabel",
    type: "string / string / string",
    default: '"yyyy/MM/dd" / "انتخاب تاریخ و زمان" / "انتخاب زمان"',
    description: "Controls the product-level trigger labels.",
  },
  ...sharedRows,
]
