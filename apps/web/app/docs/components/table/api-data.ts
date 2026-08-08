import type { ApiReferenceRow } from "@/components/api-reference"

export const tableApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "card"',
    default: '"default"',
    description:
      "\"card\" separates each row into its own bordered, elevated surface instead of a shared grid.",
  },
]
