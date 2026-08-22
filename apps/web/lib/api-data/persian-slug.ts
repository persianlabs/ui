import type { ApiReferenceRow } from "@/components/api-reference"

export const persianSlugApi: ApiReferenceRow[] = [
  {
    prop: "toPersianSlug(value, options?)",
    type: "(value: string, options?: PersianSlugOptions) => string",
    default: "—",
    description:
      "Converts Persian/mixed Persian+English text into a URL-safe slug. Keeps Persian script by default (normalizing Arabic-form characters and digits); pass options.transliterate to produce a Latin/ASCII slug instead.",
  },
  {
    prop: "toLatinSlug(value, options?)",
    type: '(value: string, options?: Omit<PersianSlugOptions, "transliterate">) => string',
    default: "—",
    description:
      "Convenience wrapper for toPersianSlug(value, { transliterate: true }) — always produces a fully Latin/ASCII slug.",
  },
]

export const persianSlugOptionsApi: ApiReferenceRow[] = [
  {
    prop: "transliterate",
    type: "boolean",
    default: "false",
    description:
      "Produce a fully Latin/ASCII slug by transliterating Persian letters instead of keeping the Persian script.",
  },
  {
    prop: "separator",
    type: "string",
    default: '"-"',
    description: "The character used to join words.",
  },
  {
    prop: "normalizeDigits",
    type: "boolean",
    default: "true",
    description:
      "Convert Persian (۰-۹) and Arabic-Indic (٠-٩) digits to plain 0-9.",
  },
]
