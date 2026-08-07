import type { ApiReferenceRow } from "@/components/api-reference"

export const checkboxRootApi: ApiReferenceRow[] = [
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
    prop: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Whether the checkbox is in a mixed/indeterminate state.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the checkbox.",
  },
]
