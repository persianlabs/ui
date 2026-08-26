import type { ApiReferenceRow } from "@/components/api-reference"

export const numberToPersianWordsApi: ApiReferenceRow[] = [
  {
    prop: "numberToPersianWords(value, options?)",
    type: "(value: number | string, options?: NumberToPersianWordsOptions) => string",
    description:
      "Spells a number out in Persian words. Accepts Latin, Persian (۰-۹), or Arabic-Indic (٠-٩) digits with an optional sign, decimal point, and thousands separators. Returns «صفر» for zero, prefixes negatives with «منفی», reads decimals as «ممیز …» with ordinal suffixes (دهم، صدم، هزارم…), and returns an empty string when the input contains no readable number.",
  },
  {
    prop: "options.suffix",
    type: "string | undefined",
    description:
      "Word appended after the result, e.g. «تومان» or «ریال». Defaults to none; blank values are ignored, and the suffix is not attached to empty or out-of-range results.",
  },
  {
    prop: "options.mode",
    type: '"words" | "mixed"',
    description:
      'Spelling style. "words" (default) spells every group out. "mixed" is the compact banking style — scaled groups stay numeric and only the sub-thousand remainder is spelled: 12500000 → «12 میلیون و 500 هزار».',
  },
  {
    prop: "options.rialToToman",
    type: "boolean | undefined",
    description:
      "Reads the value as rial. Amounts divisible by 10 are spelled in toman (10 → «یک تومان», 12500000 → «یک میلیون و دویست و پنجاه هزار تومان»); anything else falls back to rial (1 → «یک ریال»). When set it manages the unit itself and overrides options.suffix.",
  },
  {
    prop: "NUMBER_WORDS_LIMITS",
    type: "{ integerDigits: number; decimalDigits: number }",
    description:
      "Conversion caps: integer parts up to 24 digits (999 تریلیارد…) and fractions up to 9 significant digits (تا میلیاردم). Past either limit the function returns «عدد خارج از محدوده است» or truncates extra fraction digits.",
  },
]
