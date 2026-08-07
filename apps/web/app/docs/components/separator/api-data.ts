import type { ApiReferenceRow } from "@/components/api-reference"

export const separatorRootApi: ApiReferenceRow[] = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The direction of the separator.",
  },
]
