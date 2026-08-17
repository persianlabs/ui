import type { ApiReferenceRow } from "@/components/api-reference"

export const mobileNumberInputApi: ApiReferenceRow[] = [
  {
    prop: "value / defaultValue / onValueChange",
    type: "string",
    default: '""',
    description:
      "Canonical 11-digit value in 09xxxxxxxxx form, without separators.",
  },
]
