import type { ApiReferenceRow } from "@/components/api-reference"

export const nationalIdInputApi: ApiReferenceRow[] = [
  {
    prop: "value / defaultValue / onValueChange",
    type: "string",
    default: '""',
    description:
      "The typed digits, normalized to Latin 0-9 and capped at 10 characters.",
  },
]
