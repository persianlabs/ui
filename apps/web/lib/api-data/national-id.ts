import type { ApiReferenceRow } from "@/components/api-reference"

export const nationalIdApi: ApiReferenceRow[] = [
  {
    prop: "isValidNationalId(value, options?)",
    type: "string | null | undefined, IsValidNationalIdOptions → boolean",
    default: "—",
    description:
      "Normalizes Persian/Arabic-Indic digits, zero-pads to 10 digits, then validates the Iranian national ID (کد ملی) checksum.",
  },
  {
    prop: "options.checkPrefix",
    type: "boolean",
    default: "true",
    description:
      "Also verify the 3-digit issuance-office prefix against known codes. Pass false to validate the checksum only.",
  },
]
