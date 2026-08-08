import type { ApiReferenceRow } from "@/components/api-reference"

export const itemApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "outline" | "muted"',
    default: '"default"',
    description: "The visual style of the item.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "xs"',
    default: '"default"',
    description: "The size of the item.",
  },
  {
    prop: "render",
    type: "ReactElement",
    default: "—",
    description: "Render the item as a different element, e.g. an <a>.",
  },
]

export const itemMediaApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "icon" | "image"',
    default: '"default"',
    description: "The visual treatment of the media slot.",
  },
]
