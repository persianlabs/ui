import type { ApiReferenceRow } from "@/components/api-reference"

export const iranianBankApi: ApiReferenceRow[] = [
  {
    prop: "iranianBanks",
    type: "IranianBank[]",
    default: "—",
    description:
      "The supported banks, each with an id, Persian name, card prefixes, and IBAN bank codes.",
  },
  {
    prop: "normalizeCardNumber(value)",
    type: "string | number | null | undefined → string",
    default: "—",
    description:
      "Converts Persian/Arabic numerals, removes non-digits, and returns at most 16 card digits.",
  },
  {
    prop: "formatCardNumber(value, separator?)",
    type: "value, string → string",
    default: 'separator = "-"',
    description:
      "Normalizes a card value and groups it in four-digit blocks for display.",
  },
  {
    prop: "normalizeShaba(value)",
    type: "string | null | undefined → string",
    default: "—",
    description:
      "Removes an optional IR prefix and separators, then returns the 24-digit Shaba account portion.",
  },
  {
    prop: "formatShaba(value, separator?)",
    type: "value, string → string",
    default: 'separator = " "',
    description:
      "Normalizes a Shaba value and groups its account portion in four-digit blocks.",
  },
  {
    prop: "getIranianBankByCardNumber(value)",
    type: "card value → IranianBank | undefined",
    default: "—",
    description:
      "Matches the entered card prefix and returns its bank when recognized.",
  },
  {
    prop: "getIranianBankByShaba(value)",
    type: "Shaba value → IranianBank | undefined",
    default: "—",
    description:
      "Reads the IBAN bank code from a Shaba value and returns its bank when recognized.",
  },
  {
    prop: "validateIranianCard(value)",
    type: "card value → boolean",
    default: "—",
    description:
      "Returns true only for a complete 16-digit card number with a valid checksum.",
  },
  {
    prop: "validateIranianShaba(value)",
    type: "Shaba value → boolean",
    default: "—",
    description:
      "Returns true only for a complete IR Shaba number that passes the IBAN mod-97 check.",
  },
]
