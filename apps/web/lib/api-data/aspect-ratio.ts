import type { ApiReferenceRow } from "@/components/api-reference"

export const aspectRatioApi: ApiReferenceRow[] = [
  {
    prop: "ratio",
    type: "number",
    default: "—",
    description: "The desired width-to-height ratio, e.g. 16 / 9.",
  },
]
