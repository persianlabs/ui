import type { ApiReferenceRow } from "@/components/api-reference"

export const scrollAreaApi: ApiReferenceRow[] = [
  {
    prop: "scrollbarOrientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Which scrollbar to render.",
  },
]
