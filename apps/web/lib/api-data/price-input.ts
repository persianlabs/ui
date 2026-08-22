import type { ApiReferenceRow } from "@/components/api-reference"

export const priceInputApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "number | null",
    default: "undefined",
    description: "The numeric value. Use when controlled.",
  },
  {
    prop: "defaultValue",
    type: "number | null",
    default: "null",
    description: "The initial numeric value when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: number | null) => void",
    default: "—",
    description: "Called with the numeric value whenever it changes.",
  },
  {
    prop: "min",
    type: "number",
    default: "undefined",
    description:
      "The minimum allowed value, applied on blur. Set to 0 to disallow negative amounts.",
  },
  {
    prop: "max",
    type: "number",
    default: "undefined",
    description: "The maximum allowed value, applied on blur.",
  },
  {
    prop: "locale",
    type: "Intl.LocalesArgument",
    default: '"en-US"',
    description: "The locale used to group digits as you type.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Additional classes applied to the underlying input.",
  },
]
