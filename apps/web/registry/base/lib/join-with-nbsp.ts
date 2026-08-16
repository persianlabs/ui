/**
 * Joins parts with a non-breaking space (U+00A0) instead of a regular
 * space, so a value and its unit/currency (e.g. "1,000" and "تومان")
 * never wrap onto separate lines.
 */
export function joinWithNbsp(...parts: (string | number)[]) {
  return parts.map(String).join(" ")
}
