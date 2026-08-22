import type { ApiReferenceRow } from "@/components/api-reference"

export const cardNumberInputApi: ApiReferenceRow[] = [
  {
    prop: "value / defaultValue / onValueChange",
    type: "string",
    default: '""',
    description: "Canonical 16-digit card value, without separators.",
  },
  {
    prop: "separator",
    type: "string",
    default: '" "',
    description: "Character inserted between each group of four digits.",
  },
  {
    prop: "bankLogo",
    type: '"color" | "mono" | false',
    default: '"color"',
    description: "Detected bank logo treatment.",
  },
  {
    prop: "onBankChange",
    type: "(bank) => void",
    default: "—",
    description: "Called when prefix detection finds or clears a bank.",
  },
]

export const shabaInputApi: ApiReferenceRow[] = [
  {
    prop: "value / defaultValue / onValueChange",
    type: "string",
    default: '""',
    description:
      "The 24-digit account portion; the visible IR prefix is not included.",
  },
  ...cardNumberInputApi.slice(1),
]
