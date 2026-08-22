import type { ApiReferenceRow } from "@/components/api-reference"

export const switchRootApi: ApiReferenceRow[] = [
  {
    prop: "checked",
    type: "boolean",
    default: "undefined",
    description: "The checked state. Use when controlled.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "The initial checked state when uncontrolled.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked, details) => void",
    default: "—",
    description: "Called when the checked state changes.",
  },
  {
    prop: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description: "The size of the switch.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the switch.",
  },
]
