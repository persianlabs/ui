import type { ApiReferenceRow } from "@/components/api-reference"

export const collapsibleRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the panel is open. Use when controlled.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Whether the panel is initially open when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open, details) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents the panel from being toggled.",
  },
]
