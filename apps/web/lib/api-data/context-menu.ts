import type { ApiReferenceRow } from "@/components/api-reference"

export const contextMenuRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the menu is open. Use when controlled.",
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
      "Whether the menu blocks interaction with the rest of the page.",
  },
]

export const contextMenuContentApi: ApiReferenceRow[] = [
  {
    prop: "side",
    type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
    default: '"inline-end"',
    description:
      "Which side to render on. inline-start/inline-end follow reading direction, so the menu opens toward the reading end in both LTR and RTL.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: "Alignment against the pointer position.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "4",
    description: "Offset along the alignment axis, in pixels.",
  },
]

export const contextMenuItemApi: ApiReferenceRow[] = [
  {
    prop: "inset",
    type: "boolean",
    default: "false",
    description: "Adds start padding to align with items that have an icon.",
  },
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "Styles the item for a destructive action.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents the item from being selected.",
  },
]
