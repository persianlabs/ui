import type { ApiReferenceRow } from "@/components/api-reference"

export const alertRootApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "The visual style of the alert.",
  },
]
