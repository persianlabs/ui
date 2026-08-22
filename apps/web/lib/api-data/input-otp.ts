import type { ApiReferenceRow } from "@/components/api-reference"

export const inputOTPRootApi: ApiReferenceRow[] = [
  {
    prop: "maxLength",
    type: "number",
    default: "required",
    description: "The total number of characters the OTP can hold.",
  },
  {
    prop: "value",
    type: "string",
    default: "undefined",
    description: "The value of the OTP input. Use when controlled.",
  },
  {
    prop: "onChange",
    type: "(value: string) => void",
    default: "—",
    description: "Called when the OTP value changes.",
  },
  {
    prop: "pattern",
    type: "string | RegExp",
    default: "undefined",
    description:
      "Restricts which characters are accepted, e.g. REGEXP_ONLY_DIGITS.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the input.",
  },
]

export const inputOTPSlotApi: ApiReferenceRow[] = [
  {
    prop: "index",
    type: "number",
    default: "required",
    description: "The zero-based position of this slot.",
  },
]
