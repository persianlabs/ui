import type { ApiReferenceRow } from "@/components/api-reference"

export const directionProviderApi: ApiReferenceRow[] = [
  {
    prop: "direction",
    type: '"ltr" | "rtl"',
    default: '"ltr"',
    description:
      "The reading direction applied to the components rendered inside this subtree.",
  },
]
