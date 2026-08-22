import type { ApiReferenceRow } from "@/components/api-reference"

export const selectRootApi: ApiReferenceRow[] = [
  {
    prop: "items",
    type: "Value[]",
    typeDetail: "readonly Value[] | readonly Group<Value>[]",
    default: "undefined",
    description:
      "Data used to resolve a selected value's display label. Not required when items are already strings.",
  },
  {
    prop: "value",
    type: "Value",
    typeDetail: "Multiple extends true ? Value[] : Value",
    default: "undefined",
    description: "The selected value. Use when controlled.",
  },
  {
    prop: "defaultValue",
    type: "Value",
    default: "undefined",
    description: "The initially selected value when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value, details) => void",
    default: "—",
    description: "Called when the selected value changes.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "Whether multiple items can be selected.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the select.",
  },
  {
    prop: "readOnly",
    type: "boolean",
    default: "false",
    description: "Prevents choosing a different option from the popup.",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description:
      "Whether the user must choose a value before submitting a form.",
  },
  {
    prop: "name",
    type: "string",
    default: "undefined",
    description: "Identifies the field when a form is submitted.",
  },
]

export const selectTriggerApi: ApiReferenceRow[] = [
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the trigger.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "undefined",
    description: "Marks the trigger as invalid for styling and assistive tech.",
  },
]

export const selectContentApi: ApiReferenceRow[] = [
  {
    prop: "sideOffset",
    type: "number",
    default: "6",
    description: "Distance in pixels between the anchor and the popup.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "How the popup is aligned relative to the trigger.",
  },
  {
    prop: "alignItemWithTrigger",
    type: "boolean",
    default: "true",
    description:
      "When true, positions the popup so the selected item sits over the trigger. When false, aligns to the trigger's edge instead.",
  },
]

export const selectItemApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Value",
    default: "required",
    description: "The value associated with this item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents selection of this item.",
  },
]
