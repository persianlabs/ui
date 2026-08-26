import type { ApiReferenceRow } from "@/components/api-reference"

export const normalizePersianTextApi: ApiReferenceRow[] = [
  {
    prop: "normalizePersianText(value, options?)",
    type: "(value: string, options?: NormalizePersianTextOptions) => string",
    description:
      "Normalizes Persian text for storage, comparison, and display. Arabic codepage look-alikes are always unified onto their canonical Persian letters (ي→ی, ك→ک, ة→ه, أ/إ/ٱ→ا); every other behavior is opt-in via options.",
  },
  {
    prop: "options.digits",
    type: "boolean | undefined",
    description:
      "Folds Persian (۰-۹) and Arabic-Indic (٠-٩) digits to plain 0-9 through the normalize-persian-digits helper. Defaults to false.",
  },
  {
    prop: "options.diacritics",
    type: "boolean | undefined",
    description:
      "Strips Arabic diacritics (harakat), Quranic superscripts, and kashida elongations. Letters such as ش or قّ keep their base glyph. Defaults to false.",
  },
  {
    prop: "options.zwnj",
    type: "boolean | undefined",
    description:
      "Repairs broken half-spaces: consecutive ZWNJs collapse to one, and stray ones sitting next to spaces, punctuation, or the string edges are dropped. Meaningful half-spaces like «خانه‌ها» survive. Defaults to true.",
  },
  {
    prop: "options.spaces",
    type: "boolean | undefined",
    description:
      "Collapses runs of blanks (spaces, tabs, non-breaking spaces) to a single space and trims both ends. Line breaks are preserved. Defaults to true.",
  },
]
