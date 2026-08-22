import type { ApiReferenceRow } from "@/components/api-reference"

export const messageScrollerProviderApi: ApiReferenceRow[] = [
  {
    prop: "autoScroll",
    type: "boolean",
    default: "true",
    description: "Whether new items automatically scroll into view.",
  },
  {
    prop: "defaultScrollPosition",
    type: '"start" | "end" | "last-anchor"',
    default: '"end"',
    description: "Where the viewport starts scrolled to on mount.",
  },
]

export const messageScrollerItemApi: ApiReferenceRow[] = [
  {
    prop: "messageId",
    type: "string",
    default: "—",
    description: "An id used to scroll to this specific item.",
  },
  {
    prop: "scrollAnchor",
    type: "boolean",
    default: "false",
    description: "Marks this item as the auto-scroll anchor.",
  },
]

export const messageScrollerButtonApi: ApiReferenceRow[] = [
  {
    prop: "direction",
    type: '"start" | "end"',
    default: '"end"',
    description: "Which edge of the viewport the button scrolls toward.",
  },
]
