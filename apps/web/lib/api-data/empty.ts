import type { ApiReferenceRow } from "@/components/api-reference"

export const emptyMediaApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "icon"',
    default: '"default"',
    description: "Styles the media as a plain wrapper or a boxed icon tile.",
  },
]
