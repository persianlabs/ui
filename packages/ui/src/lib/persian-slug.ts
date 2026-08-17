import { normalizePersianDigits } from "@workspace/ui/lib/normalize-persian-digits"

export interface PersianSlugOptions {
  /**
   * Produce a fully Latin/ASCII slug by transliterating Persian letters
   * instead of keeping the Persian script. The transliteration is a simple
   * per-letter map (no short-vowel reconstruction), so it's a rough
   * approximation, not a linguistically perfect romanization.
   * @default false
   */
  transliterate?: boolean
  /** The character used to join words. @default "-" */
  separator?: string
  /** Convert Persian (۰-۹) and Arabic-Indic (٠-٩) digits to plain 0-9. @default true */
  normalizeDigits?: boolean
}

const arabicToPersianCharacters: Record<string, string> = {
  ي: "ی",
  ك: "ک",
  ة: "ه",
  ؤ: "و",
  إ: "ا",
  أ: "ا",
  ٱ: "ا",
}

/** Normalizes Arabic-form characters that commonly leak into Persian text (ي → ی, ك → ک, ...) to their correct Persian Unicode forms. */
function normalizePersianCharacters(value: string): string {
  return value.replace(
    /[يكةؤإأٱ]/g,
    (char) => arabicToPersianCharacters[char] ?? char
  )
}

const persianToLatinTransliterationMap: Record<string, string> = {
  آ: "a",
  ا: "a",
  ب: "b",
  پ: "p",
  ت: "t",
  ث: "s",
  ج: "j",
  چ: "ch",
  ح: "h",
  خ: "kh",
  د: "d",
  ذ: "z",
  ر: "r",
  ز: "z",
  ژ: "zh",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "z",
  ط: "t",
  ظ: "z",
  ع: "a",
  غ: "gh",
  ف: "f",
  ق: "gh",
  ک: "k",
  گ: "g",
  ل: "l",
  م: "m",
  ن: "n",
  و: "v",
  ه: "h",
  ی: "y",
  ء: "",
  ئ: "y",
}

function transliteratePersian(value: string): string {
  return value.replace(
    /[؀-ۿ]/g,
    (char) => persianToLatinTransliterationMap[char] ?? ""
  )
}

function escapeForRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const PERSIAN_LETTERS = "آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی"
const PERSIAN_DIGITS = "۰-۹٠-٩"

/**
 * Converts Farsi/Persian (or mixed Persian+English) text into a URL-safe
 * slug, e.g. for blog post or product URLs.
 *
 * By default, Persian characters are kept as-is rather than transliterated
 * to Latin — percent-encoded Persian slugs are common and SEO-accepted on
 * Iranian sites, and a forced transliteration produces awkward Latin
 * approximations. Pass `{ transliterate: true }` for a fully Latin/ASCII
 * slug instead.
 *
 * Normalization applied: trims the input, corrects Arabic-form Persian
 * characters (ي → ی, ك → ک, ...), converts Persian/Arabic-Indic digits to
 * plain 0-9 (unless `normalizeDigits: false`), collapses whitespace/
 * underscore runs into a single separator, strips any character that isn't
 * a Persian letter/digit, Latin letter/digit, or the separator, collapses
 * repeated separators, trims leading/trailing separators, and lowercases
 * any Latin portion.
 *
 * @example
 * toPersianSlug("راهنمای خرید گوشی موبایل")
 * // "راهنمای-خرید-گوشی-موبایل"
 * @example
 * toPersianSlug("بهترین لپ‌تاپ های Gaming 2024")
 * // "بهترین-لپتاپ-های-gaming-2024"
 * @example
 * toPersianSlug("مقاله ۱۲۳")
 * // "مقاله-123"
 * @example
 * toPersianSlug("  چطور   کیک، بپزیم؟!  ")
 * // "چطور-کیک-بپزیم"
 * @example
 * toPersianSlug("سلام دنیا", { transliterate: true })
 * // "slam-dnya"
 */
export function toPersianSlug(
  value: string,
  options: PersianSlugOptions = {}
): string {
  const {
    transliterate = false,
    separator = "-",
    normalizeDigits = true,
  } = options

  let result = normalizePersianCharacters(value.trim())

  if (normalizeDigits) result = normalizePersianDigits(result)

  if (transliterate) result = transliteratePersian(result)

  result = result.replace(/[\s_]+/g, separator)

  const escapedSeparator = escapeForRegExp(separator)
  const allowedCharacters = transliterate
    ? "a-zA-Z0-9"
    : `${PERSIAN_LETTERS}${PERSIAN_DIGITS}a-zA-Z0-9`

  result = result
    .replace(new RegExp(`[^${allowedCharacters}${escapedSeparator}]`, "g"), "")
    .replace(new RegExp(`${escapedSeparator}{2,}`, "g"), separator)
    .replace(new RegExp(`^${escapedSeparator}+|${escapedSeparator}+$`, "g"), "")

  return transliterate
    ? result.toLowerCase()
    : result.replace(/[A-Z]/g, (char) => char.toLowerCase())
}

/**
 * Convenience wrapper for `toPersianSlug(value, { transliterate: true })` —
 * always produces a fully Latin/ASCII slug.
 *
 * @example
 * toLatinSlug("سلام دنیا")
 * // "slam-dnya"
 */
export function toLatinSlug(
  value: string,
  options: Omit<PersianSlugOptions, "transliterate"> = {}
): string {
  return toPersianSlug(value, { ...options, transliterate: true })
}
