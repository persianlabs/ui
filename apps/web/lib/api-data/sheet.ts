import type { ApiReferenceRow } from "@/components/api-reference"

export const sheetRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the sheet is open. Use when controlled.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Whether the sheet is initially open when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open, details) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
  {
    prop: "modal",
    type: "boolean",
    default: "true",
    description:
      "Whether the sheet blocks interaction with the rest of the page.",
  },
]

export const sheetContentApi: ApiReferenceRow[] = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left" | "start" | "end"',
    default: '"end"',
    description:
      "Which edge the sheet slides in from. start/end resolve to left/right based on the ambient direction.",
  },
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "true",
    description: "Whether to render the built-in close button.",
  },
]
