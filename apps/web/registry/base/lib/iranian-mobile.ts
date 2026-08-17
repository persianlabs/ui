import { normalizePersianDigits } from "@/lib/normalize-persian-digits"

/**
 * Normalizes an Iranian mobile phone number to the standard 11-digit local
 * format: 09xxxxxxxxx. Accepts +989121234567, 989121234567, 09121234567,
 * 9121234567, Persian/Arabic-Indic digits, and separators like spaces,
 * dashes, dots, or parentheses. Falls back to the cleaned numeric digits
 * when the value can't be shaped into a valid Iranian mobile number.
 */
export function normalizeIranPhone(phone: string | null | undefined) {
  let value = normalizePersianDigits(phone ?? "").trim()
  value = value.replace(/[\s\-().]/g, "")
  if (value.startsWith("+98")) value = value.slice(3)
  else if (value.startsWith("0098")) value = value.slice(4)
  else if (value.startsWith("98")) value = value.slice(2)
  if (/^09\d{9}$/.test(value)) return value
  if (/^9\d{9}$/.test(value)) return `0${value}`
  return value.replace(/\D/g, "")
}

/** Validates that the normalized value matches the 09xxxxxxxxx shape. */
export function isValidIranPhone(phone: string | null | undefined) {
  return /^09\d{9}$/.test(normalizeIranPhone(phone))
}

/** Masks a phone number, showing only the first 3 and last 4 digits. */
export function maskIranPhone(phone: string | null | undefined) {
  const normalized = normalizeIranPhone(phone)
  if (!normalized) return phone ?? ""
  return `${normalized.slice(0, 3)}***${normalized.slice(-4)}`
}
