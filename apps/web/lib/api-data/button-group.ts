import type { ApiReferenceRow } from "@/components/api-reference"

export const buttonGroupRootApi: ApiReferenceRow[] = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The layout flow direction of the button group.",
  },
]

export const buttonGroupSeparatorApi: ApiReferenceRow[] = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"vertical"',
    description: "The orientation of the separator.",
  },
]

export const buttonGroupTextApi: ApiReferenceRow[] = [
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description:
      "Renders the passed child element instead of a plain div, merging in the text styles.",
  },
]
