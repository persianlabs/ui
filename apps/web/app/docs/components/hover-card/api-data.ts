import type { ApiReferenceRow } from "@/components/api-reference"

export const hoverCardRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the hover card is open. Use when controlled.",
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

export const hoverCardContentApi: ApiReferenceRow[] = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: "Which side of the trigger to render against.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance in pixels from the trigger.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Alignment against the trigger.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "4",
    description: "Offset in pixels from the aligned edge.",
  },
]
