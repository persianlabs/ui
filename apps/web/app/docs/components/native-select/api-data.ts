import type { ApiReferenceRow } from "@/components/api-reference"

export const nativeSelectRootApi: ApiReferenceRow[] = [
  {
    prop: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description: "The size of the select.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the select.",
  },
]
