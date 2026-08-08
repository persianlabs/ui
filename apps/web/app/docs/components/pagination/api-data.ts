import type { ApiReferenceRow } from "@/components/api-reference"

export const paginationLinkApi: ApiReferenceRow[] = [
  {
    prop: "isActive",
    type: "boolean",
    default: "false",
    description: "Marks the link as the current page.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "lg" | "icon" | ...',
    default: '"icon"',
    description: "The Button size to render the link with.",
  },
]

export const paginationPreviousNextApi: ApiReferenceRow[] = [
  {
    prop: "text",
    type: "string",
    default: '"Previous" / "Next"',
    description: "The label shown next to the chevron on wider screens.",
  },
]
