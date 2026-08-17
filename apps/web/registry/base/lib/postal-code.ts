import { normalizePersianDigits } from "@/lib/normalize-persian-digits"

/**
 * Validates the basic shape of an Iranian postal code (کد پستی): exactly 10
 * digits, not starting with 0, and not a single digit repeated 10 times
 * (a common placeholder/typo pattern rejected by most Iranian postal-code
 * forms). This is a structural check only — Iran Post does not publish a
 * checksum algorithm for postal codes, so no stricter digit-checksum rule
 * is applied here.
 */
export function isValidPostalCode(value: string | null | undefined) {
  const digits = normalizePersianDigits(value ?? "").replace(/\D/g, "")

  if (!/^[1-9]\d{9}$/.test(digits)) return false
  if (/^(\d)\1{9}$/.test(digits)) return false

  return true
}
