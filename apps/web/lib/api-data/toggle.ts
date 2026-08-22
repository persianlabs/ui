import type { ApiReferenceRow } from "@/components/api-reference"

export const toggleRootApi: ApiReferenceRow[] = [
  {
    prop: "pressed",
    type: "boolean",
    default: "undefined",
    description: "Whether the toggle is pressed. Use when controlled.",
  },
  {
    prop: "defaultPressed",
    type: "boolean",
    default: "false",
    description: "The initial pressed state when uncontrolled.",
  },
  {
    prop: "onPressedChange",
    type: "(pressed, details) => void",
    default: "—",
    description: "Called when the pressed state changes.",
  },
  {
    prop: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    description: "The visual style of the toggle.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "lg"',
    default: '"default"',
    description: "The size of the toggle.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the toggle.",
  },
]
