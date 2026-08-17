import type { ApiReferenceRow } from "@/components/api-reference"

export const postalCodeApi: ApiReferenceRow[] = [
  {
    prop: "isValidPostalCode(value)",
    type: "string | null | undefined → boolean",
    default: "—",
    description:
      "Normalizes Persian/Arabic-Indic digits, then validates the 10-digit Iranian postal code (کد پستی) format — a structural check only, since Iran Post does not publish a checksum algorithm.",
  },
]
