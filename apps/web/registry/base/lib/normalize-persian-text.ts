import { normalizePersianDigits } from "@/lib/normalize-persian-digits"

/** Arabic-codepage look-alikes mapped onto their canonical Persian letters. */
const LETTER_MAP: Record<string, string> = {
  "\u064A": "\u06CC", // ي arabic yeh → ی farsi yeh
  "\u0649": "\u06CC", // ى alef maksura → ی
  "\u0643": "\u06A9", // ك arabic kaf → ک keheh
  "\u0671": "\u0627", // ٱ alef wasla → ا
  "\u0623": "\u0627", // أ alef hamza above → ا
  "\u0625": "\u0627", // إ alef hamza below → ا
  "\u0629": "\u0647", // ة teh marbuta → ه
}

const LETTER_PATTERN = /[يىكٱأإة]/g

/** Harakat, Quranic superscripts, and the kashida elongation character. */
// eslint-disable-next-line no-misleading-character-class -- combining marks are stripped individually by design
const DIACRITIC_PATTERN = /[\u064B-\u0655\u0670\u0640\u06D6-\u06ED]/g

const ZWNJ = "\u200C"

export interface NormalizePersianTextOptions {
  /** Fold Persian (۰-۹) and Arabic-Indic (٠-٩) digits to plain 0-9.
   * @default false */
  digits?: boolean
  /** Strip Arabic diacritics (harakat), superscript alef, and kashida.
   * @default false */
  diacritics?: boolean
  /** Repair broken half-spaces: collapse consecutive ZWNJs and drop stray
   * ones sitting next to spaces, punctuation, or the string edges.
   * @default true */
  zwnj?: boolean
  /** Collapse runs of blanks to a single space and trim the ends. Line
   * breaks are preserved. @default true */
  spaces?: boolean
}

function repairZwnj(value: string): string {
  // Whitespace plus common ASCII/Persian punctuation.
  const edge = "[\\s.,;:!?\u00AB\u00BB()'\u2013\u2014\"\\-\u061F\u060C\u061B]"
  return value
    .replace(new RegExp(`${ZWNJ}{2,}`, "g"), ZWNJ)
    .replace(new RegExp(`${ZWNJ}(?=${edge}|$)`, "g"), "")
    .replace(new RegExp(`(${edge})${ZWNJ}`, "g"), "$1")
}

function collapseSpaces(value: string): string {
  return value.replace(/[\t \u00A0\u2000-\u200A]{2,}/g, " ").trim()
}

/**
 * Normalizes Persian text for storage, comparison, and display.
 *
 * Arabic codepage look-alikes are always unified onto their Persian letters
 * (ي→ی, ك→ک, ة→ه, …), so text pasted from Arabic keyboards or legacy fonts
 * becomes consistent. Everything else is opt-in: digit folding, diacritic
 * stripping, half-space (ZWNJ) repair, and whitespace tidying — all safely
 * skippable so the function doubles as a lossless display cleaner or an
 * aggressive search-key builder.
 */
export function normalizePersianText(
  value: string,
  options?: NormalizePersianTextOptions
): string {
  let out = value.replace(LETTER_PATTERN, (char) => LETTER_MAP[char] ?? char)

  if (options?.diacritics) {
    out = out.replace(DIACRITIC_PATTERN, "")
  }

  if (options?.digits) {
    out = normalizePersianDigits(out)
  }

  if (options?.zwnj !== false) {
    out = repairZwnj(out)
  }

  if (options?.spaces !== false) {
    out = collapseSpaces(out)
  }

  return out
}
