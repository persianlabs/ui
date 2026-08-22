import type { ApiReferenceRow } from "@/components/api-reference"

export const elasticSliderRootApi: ApiReferenceRow[] = [
  {
    prop: "label",
    type: "string",
    default: "required",
    description: "Label shown inside the track.",
  },
  {
    prop: "value",
    type: "number",
    default: "undefined",
    description: "Controlled value. Use together with onValueChange.",
  },
  {
    prop: "defaultValue",
    type: "number",
    default: "min",
    description: "Initial value for uncontrolled mode.",
  },
  {
    prop: "onValueChange",
    type: "(value: number) => void",
    default: "—",
    description: "Called with the new value on drag, click, or key press.",
  },
  {
    prop: "min",
    type: "number",
    default: "0",
    description: "Minimum value.",
  },
  {
    prop: "max",
    type: "number",
    default: "1",
    description: "Maximum value.",
  },
  {
    prop: "step",
    type: "number",
    default: "0.01",
    description: "Smallest increment.",
  },
  {
    prop: "formatValue",
    type: "(value: number) => string",
    default: "value.toFixed(...)",
    description:
      "Format the displayed value, based on step's decimal precision by default.",
  },
  {
    prop: "aria-label",
    type: "string",
    default: "label",
    description: "Accessible name. Falls back to label.",
  },
]
