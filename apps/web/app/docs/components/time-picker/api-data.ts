import type { ApiReferenceRow } from "@/components/api-reference"

export const timePickerApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "TimePickerValue",
    typeDetail: "{ hour: number; minute: number; second?: number }",
    default: "—",
    description: "The selected time in controlled mode.",
  },
  {
    prop: "defaultValue",
    type: "TimePickerValue",
    default: "{ hour: 0, minute: 0 }",
    description: "The initial selected time in uncontrolled mode.",
  },
  {
    prop: "onValueChange",
    type: "(value: TimePickerValue) => void",
    default: "—",
    description: "Called when the selected time changes.",
  },
  {
    prop: "showSeconds",
    type: "boolean",
    default: "false",
    description: "Adds a third, seconds wheel.",
  },
  {
    prop: "showLabels",
    type: "boolean",
    default: "false",
    description: "Shows h, m, and s labels above their wheel columns.",
  },
  {
    prop: "hourFormat",
    type: '"24" | "12"',
    default: '"24"',
    description:
      "12-hour mode adds an AM/PM wheel and formats the hour wheel 1-12.",
  },
  {
    prop: "digits",
    type: '"fa" | "en"',
    default: '"fa"',
    description: "Digit style used for the wheel labels.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Additional classes for the time picker container.",
  },
]

export const responsiveTimePickerApi: ApiReferenceRow[] = [
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

export const responsiveTimePickerContentApi: ApiReferenceRow[] = [
  {
    prop: "value / defaultValue / onValueChange",
    type: "—",
    default: "—",
    description: "Forwarded to the inner TimePicker.",
  },
  {
    prop: "showSeconds / showLabels / hourFormat / digits",
    type: "—",
    default: "—",
    description: "Forwarded to the inner TimePicker.",
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
