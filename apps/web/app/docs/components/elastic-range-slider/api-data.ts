import type { ApiReferenceRow } from "@/components/api-reference"

export const elasticRangeSliderRootApi: ApiReferenceRow[] = [
  {
    prop: "label",
    type: "string",
    default: "required",
    description: "Label shown at the start of the track.",
  },
  {
    prop: "value",
    type: "[number, number]",
    default: "undefined",
    description:
      "Controlled [min, max] value. Use together with onValueChange.",
  },
  {
    prop: "defaultValue",
    type: "[number, number]",
    default: "[min, max]",
    description: "Initial [min, max] value for uncontrolled mode.",
  },
  {
    prop: "onValueChange",
    type: "(value: [number, number]) => void",
    default: "—",
    description: "Called with the new [min, max] on drag, click, or key press.",
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
    default: "100",
    description: "Maximum value.",
  },
  {
    prop: "step",
    type: "number",
    default: "1",
    description: "Smallest increment.",
  },
  {
    prop: "formatValue",
    type: "(value: number) => string",
    default: "value.toFixed(...)",
    description:
      "Format each displayed value, based on step's decimal precision by default.",
  },
  {
    prop: "minThumbLabel",
    type: "string",
    default: '"Minimum"',
    description: "Accessible name for the lower thumb.",
  },
  {
    prop: "maxThumbLabel",
    type: "string",
    default: '"Maximum"',
    description: "Accessible name for the upper thumb.",
  },
]
