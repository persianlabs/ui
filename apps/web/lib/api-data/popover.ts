import type { ApiReferenceRow } from "@/components/api-reference"

export const popoverRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the popover is open. Use when controlled.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "The initial open state when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open, details) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
]

export const popoverContentApi: ApiReferenceRow[] = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: "Which side of the trigger to render against.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "6",
    description: "Distance in pixels from the trigger.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Alignment against the trigger.",
  },
]
