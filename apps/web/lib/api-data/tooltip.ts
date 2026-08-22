import type { ApiReferenceRow } from "@/components/api-reference"

export const tooltipProviderApi: ApiReferenceRow[] = [
  {
    prop: "delay",
    type: "number",
    default: "0",
    description: "How long to wait before opening a tooltip on hover, in ms.",
  },
  {
    prop: "closeDelay",
    type: "number",
    default: "0",
    description: "How long to wait before closing a tooltip, in ms.",
  },
  {
    prop: "timeout",
    type: "number",
    default: "400",
    description:
      "Another tooltip opens instantly if the previous one closed within this timeout, in ms.",
  },
]

export const tooltipRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the tooltip is open. Use when controlled.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Whether the tooltip is initially open when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open, details) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
]

export const tooltipContentApi: ApiReferenceRow[] = [
  {
    prop: "side",
    type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
    default: '"top"',
    description:
      "Which side of the trigger to render on. inline-start/inline-end follow reading direction.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance between the tooltip and the trigger, in pixels.",
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
    default: "0",
    description: "Offset along the alignment axis, in pixels.",
  },
]
