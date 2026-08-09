import type { ApiReferenceRow } from "@/components/api-reference"

export const badgeApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "outline" | "destructive"',
    default: '"default"',
    description: "The visual style of the badge.",
  },
]
