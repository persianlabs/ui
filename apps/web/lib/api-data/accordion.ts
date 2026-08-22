import type { ApiReferenceRow } from "@/components/api-reference"

export const accordionRootApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Value[]",
    default: "undefined",
    description: "The expanded item value(s). Use when controlled.",
  },
  {
    prop: "defaultValue",
    type: "Value[]",
    default: "[]",
    description: "The initially expanded item value(s) when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value, details) => void",
    default: "—",
    description: "Called when the expanded value(s) change.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "Whether more than one item can be open at the same time.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents every item from being toggled.",
  },
]

export const accordionItemApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Value",
    default: "—",
    description: "A unique value that identifies this item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents this item from being toggled.",
  },
]
