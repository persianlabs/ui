import type { ApiReferenceRow } from "@/components/api-reference"

export const wheelPickerWrapperApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Additional classes for the picker container.",
  },
  {
    prop: "children",
    type: "ReactNode",
    default: "required",
    description: "One or more WheelPicker components.",
  },
]

export const wheelPickerApi: ApiReferenceRow[] = [
  {
    prop: "options",
    type: "WheelPickerOption<T>[]",
    default: "required",
    description: "Options displayed in the wheel.",
  },
  {
    prop: "value",
    type: "T",
    default: "—",
    description: "The selected value in controlled mode.",
  },
  {
    prop: "defaultValue",
    type: "T",
    default: "—",
    description: "The initial selected value in uncontrolled mode.",
  },
  {
    prop: "onValueChange",
    type: "(value: T) => void",
    default: "—",
    description: "Called when the selected value changes.",
  },
  {
    prop: "infinite",
    type: "boolean",
    default: "false",
    description: "Enables infinite scrolling through the options.",
  },
  {
    prop: "visibleCount",
    type: "number",
    default: "20",
    description: "Number of visible options; use a multiple of four.",
  },
  {
    prop: "dragSensitivity",
    type: "number",
    default: "3",
    description: "Controls drag responsiveness.",
  },
  {
    prop: "scrollSensitivity",
    type: "number",
    default: "5",
    description: "Controls mouse-wheel responsiveness.",
  },
  {
    prop: "optionItemHeight",
    type: "number",
    default: "30",
    description: "Height of each option in pixels.",
  },
  {
    prop: "classNames",
    type: "WheelPickerClassNames",
    default: "—",
    description:
      "Classes for option, highlight wrapper, and highlight item slots.",
  },
]
