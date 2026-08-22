import type { ApiReferenceRow } from "@/components/api-reference"

export const responsiveMenuRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the menu/drawer is open. Use when controlled.",
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
]

export const responsiveMenuContentApi: ApiReferenceRow[] = [
  {
    prop: "groupLabel",
    type: "string",
    default: "undefined",
    description: "Optional label shown above the items.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"end"',
    description: "Desktop-only: alignment of the dropdown against the trigger.",
  },
  {
    prop: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"bottom"',
    description: "Desktop-only: which side of the trigger to render on.",
  },
]
