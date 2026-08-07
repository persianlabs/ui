import type { ApiReferenceRow } from "@/components/api-reference"

export const radioGroupRootApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "string",
    default: "undefined",
    description: "The selected value. Use when controlled.",
  },
  {
    prop: "defaultValue",
    type: "string",
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
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the whole group.",
  },
]

export const radioGroupItemApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "string",
    default: "required",
    description: "The value associated with this radio item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents selection of this item.",
  },
]
