import type { ApiReferenceRow } from "@/components/api-reference"

export const toggleGroupRootApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "string[]",
    default: "undefined",
    description: "The pressed values. Use when controlled.",
  },
  {
    prop: "defaultValue",
    type: "string[]",
    default: "[]",
    description: "The initially pressed values when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value, details) => void",
    default: "—",
    description: "Called when the pressed values change.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "Whether multiple items can be pressed at once.",
  },
  {
    prop: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    description: "Applied to every item unless overridden individually.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "lg"',
    default: '"default"',
    description: "Applied to every item unless overridden individually.",
  },
  {
    prop: "spacing",
    type: "number",
    default: "0",
    description:
      "Gap between items. 0 merges items into one segmented control.",
  },
]

export const toggleGroupItemApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "string",
    default: "required",
    description: "The value associated with this item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with this item.",
  },
]
