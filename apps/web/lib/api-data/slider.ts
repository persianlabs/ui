import type { ApiReferenceRow } from "@/components/api-reference"

export const sliderRootApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "number | number[]",
    default: "-",
    description:
      "The controlled value of the slider. Use with onValueChange for a controlled slider.",
  },
  {
    prop: "defaultValue",
    type: "number | number[]",
    default: "-",
    description:
      "The uncontrolled value when the slider is initially rendered.",
  },
  {
    prop: "onValueChange",
    type: "(value: number | number[], eventDetails) => void",
    default: "-",
    description: "Called when the value changes, while the thumb is dragged.",
  },
  {
    prop: "onValueCommitted",
    type: "(value: number | number[], eventDetails) => void",
    default: "-",
    description: "Called when the value changes at the end of an interaction.",
  },
  {
    prop: "min",
    type: "number",
    default: "0",
    description: "The minimum allowed value.",
  },
  {
    prop: "max",
    type: "number",
    default: "100",
    description: "The maximum allowed value.",
  },
  {
    prop: "step",
    type: "number",
    default: "1",
    description: "The granularity the slider can step through values.",
  },
  {
    prop: "minStepsBetweenValues",
    type: "number",
    default: "0",
    description:
      "The minimum steps between values, for range/multi-thumb sliders.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The component orientation.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the slider should ignore user interaction.",
  },
]
