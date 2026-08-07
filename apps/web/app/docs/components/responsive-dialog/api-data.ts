import type { ApiReferenceRow } from "@/components/api-reference"

export const responsiveDialogRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the dialog/drawer is open. Use when controlled.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Whether it's initially open when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
  {
    prop: "drawerPosition",
    type: '"top" | "right" | "bottom" | "left" | "start" | "end"',
    default: '"bottom"',
    description: "Which edge the mobile drawer slides in from.",
  },
]
