import type { ApiReferenceRow } from "@/components/api-reference"

export const dropdownMenuContentApi: ApiReferenceRow[] = [
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
    default: '"start"',
    description: "Alignment against the trigger.",
  },
]

export const dropdownMenuItemApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "The visual style of the item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the item.",
  },
]

export const dropdownMenuCheckboxItemApi: ApiReferenceRow[] = [
  {
    prop: "checked",
    type: "boolean",
    default: "undefined",
    description: "Whether the item is checked. Use when controlled.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked, details) => void",
    default: "—",
    description: "Called when the checked state changes.",
  },
]
