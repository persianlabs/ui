import { describe, expect, it } from "vitest"

import { isValidNationalId } from "./national-id.js"

/** Prefixes confirmed present in VALID_NATIONAL_ID_PREFIXES. */
const PRESENT_PREFIXES = ["001", "002", "003", "049"]

/**
 * Deterministically generates a checksum-valid national ID from an index:
 * fixed prefix + six nonzero body digits derived from `i`, then appends the
 * weighted-mod-11 check digit (r < 2 ? r : 11 - r).
 */
function generateValidId(i: number): { id: string; remainder: number } {
  const prefix = PRESENT_PREFIXES[i % PRESENT_PREFIXES.length]
  const bodyDigits = [7, 3, 5, 11, 13, 17].map(
    (factor, position) => ((i * factor + position) % 9) + 1
  )
  const nineDigits = (prefix + bodyDigits.join("")).slice(0, 9)
  const sum = nineDigits
    .split("")
    .reduce((total, digit, index) => total + Number(digit) * (10 - index), 0)
  const remainder = sum % 11
  const check = remainder < 2 ? remainder : 11 - remainder
  return { id: nineDigits + String(check), remainder }
}

describe("isValidNationalId", () => {
  // JSDoc fixtures, ported verbatim
  it('accepts "0499370899"', () => {
    expect(isValidNationalId("0499370899")).toBe(true)
  })

  it('zero-pads "499370899" to a valid ID', () => {
    expect(isValidNationalId("499370899")).toBe(true)
  })

  it('normalizes Persian digits before validating "۰۴۹۹۳۷۰۸۹۹"', () => {
    expect(isValidNationalId("۰۴۹۹۳۷۰۸۹۹")).toBe(true)
  })

  it('rejects all-zero "0000000000"', () => {
    expect(isValidNationalId("0000000000")).toBe(false)
  })

  it('rejects repeated digits "1111111111"', () => {
    expect(isValidNationalId("1111111111")).toBe(false)
  })

  it('rejects bad checksum "0499370898"', () => {
    expect(isValidNationalId("0499370898")).toBe(false)
  })

  it("rejects fewer than 8 digits", () => {
    expect(isValidNationalId("4993708")).toBe(false)
  })

  it("rejects more than 10 digits", () => {
    expect(isValidNationalId("04993708991")).toBe(false)
  })

  it("treats 8-digit input as left-zero-padded equivalence", () => {
    expect(isValidNationalId("17111110")).toBe(true)
  })

  it.each([null, undefined, "", "abc"])("rejects %p", (input) => {
    expect(isValidNationalId(input)).toBe(false)
  })

  it("rejects values whose six middle digits are all zero", () => {
    expect(isValidNationalId("0010000007")).toBe(false)
  })

  it("validates a checksum-correct ID on the r = 0 branch", () => {
    // sum(0,0,1,7,1,1,1,1,1 weighted) = 77 → r = 0, check digit must be 0
    expect(isValidNationalId("0017111110")).toBe(true)
  })

  it("validates a checksum-correct ID on the r >= 2 branch", () => {
    // "0499370899": r = 266 % 11 = 2, check digit 11 - 2 = 9
    expect(isValidNationalId("0499370899")).toBe(true)
  })

  it("enforces the issuance-prefix gate by default and bypasses it with checkPrefix: false", () => {
    // Checksum-valid ID whose prefix "999" is absent from the prefix list
    const unprefixed = "9991234561"
    expect(isValidNationalId(unprefixed, { checkPrefix: false })).toBe(true)
    expect(isValidNationalId(unprefixed)).toBe(false)
  })

  it("keeps validating after the gate when a present prefix is used", () => {
    const { id } = generateValidId(3)
    expect(isValidNationalId(id)).toBe(true)
  })

  it("accepts 50 deterministically generated checksum-valid IDs and rejects their check-digit mutations", () => {
    let lowRemainders = 0
    let highRemainders = 0

    for (let i = 0; i < 50; i++) {
      const { id, remainder } = generateValidId(i)
      expect(isValidNationalId(id)).toBe(true)

      const mutatedCheck = (Number(id[9]) + 1) % 10
      const mutated = id.slice(0, 9) + String(mutatedCheck)
      expect(mutated).not.toBe(id)
      expect(isValidNationalId(mutated)).toBe(false)

      if (remainder < 2) lowRemainders++
      else highRemainders++
    }

    expect(lowRemainders).toBeGreaterThan(0)
    expect(highRemainders).toBeGreaterThan(0)
  })
})
