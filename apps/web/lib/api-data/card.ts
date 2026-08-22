import type { ApiReferenceRow } from "@/components/api-reference"

export const cardRootApi: ApiReferenceRow[] = [
  {
    prop: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description:
      "Controls the card's spacing via the --card-spacing CSS variable.",
  },
]

export const cardHeaderApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes for the header.",
  },
]

export const cardContentApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes for the content section.",
  },
]

export const cardFooterApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes for the footer.",
  },
]
