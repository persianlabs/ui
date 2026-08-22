import type { ApiReferenceRow } from "@/components/api-reference"

export const normalizePersianDigitsApi: ApiReferenceRow[] = [
  {
    prop: "normalizePersianDigits(value)",
    type: "(value: string) => string",
    description:
      "Replaces every Persian (۰-۹) and Arabic-Indic (٠-٩) digit in a string with its plain 0-9 equivalent.",
  },
  {
    prop: "normalizePersianDigit(char)",
    type: "(char: string) => string | undefined",
    description:
      "Looks up a single character; returns its plain-digit equivalent, or undefined if it isn't a Persian/Arabic-Indic digit. Useful for normalizing one keystroke at a time.",
  },
]
