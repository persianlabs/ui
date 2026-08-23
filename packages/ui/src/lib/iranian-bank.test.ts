import { describe, expect, it } from "vitest"

import {
  formatCardNumber,
  formatShaba,
  getIranianBankByCardNumber,
  getIranianBankByShaba,
  iranianBanks,
  normalizeCardNumber,
  normalizeShaba,
  validateIranianCard,
  validateIranianShaba,
} from "./iranian-bank.js"

/** Code pairs that intentionally share an IBAN code (same banking rails). */
const SHARED_IBAN_CODES = new Set(["056"])

describe("iranian bank utilities", () => {
  it("resolves every bank from its own Shaba codes", () => {
    const ownersByCode = new Map<string, Set<string>>()
    for (const bank of iranianBanks) {
      for (const code of bank.ibanCodes) {
        if (!ownersByCode.has(code)) ownersByCode.set(code, new Set())
        ownersByCode.get(code)!.add(bank.id)
      }
    }

    for (const bank of iranianBanks) {
      for (const code of bank.ibanCodes) {
        const shaba = `12${code}${"0".repeat(19)}`
        const resolvedId = getIranianBankByShaba(shaba)?.id

        if (SHARED_IBAN_CODES.has(code)) {
          expect(
            ownersByCode.get(code)?.has(resolvedId ?? ""),
            `${bank.name}: ${code} resolved to ${resolvedId}`
          ).toBe(true)
        } else {
          expect(resolvedId, bank.name).toBe(bank.id)
        }
      }
    }
  })

  it("has no undocumented duplicate IBAN codes across banks", () => {
    const ownerByCode = new Map<string, string>()
    for (const bank of iranianBanks) {
      for (const code of bank.ibanCodes) {
        if (SHARED_IBAN_CODES.has(code)) continue

        expect(
          ownerByCode.has(code),
          `${code} already claimed by ${ownerByCode.get(code)}`
        ).toBe(false)
        ownerByCode.set(code, bank.id)
      }
    }
  })

  it("detects every supported bank from a valid sample card", () => {
    for (const bank of iranianBanks) {
      const stem = bank.cardPrefixes[0]!.padEnd(15, "0").slice(0, 15)
      const card = Array.from(
        { length: 10 },
        (_, checkDigit) => `${stem}${checkDigit}`
      ).find(validateIranianCard)

      expect(card, bank.name).toBeDefined()
      expect(getIranianBankByCardNumber(card)).toMatchObject({ id: bank.id })
    }
  })

  it("normalizes card paste formats and detects a bank", () => {
    expect(normalizeCardNumber("6037-99 1234,5678")).toBe("60379912345678")
    expect(formatCardNumber("6037991234567890")).toBe("6037 9912 3456 7890")
    expect(getIranianBankByCardNumber("6037 9912")).toMatchObject({
      id: "melli",
    })
  })

  it("removes IR from pasted Shaba values and formats only its account part", () => {
    expect(normalizeShaba("IR 12-0170 0000 0000 0000 0000 00")).toBe(
      "120170000000000000000000"
    )
    expect(formatShaba("120170000000000000000000")).toBe(
      "1201 7000 0000 0000 0000 0000"
    )
    expect(getIranianBankByShaba("120170000000000000000000")).toMatchObject({
      id: "melli",
    })
  })

  it("validates card and Shaba checksums", () => {
    expect(validateIranianCard("6219-8619-1894-9297")).toBe(true)
    expect(validateIranianCard("6219-8619-1894-9298")).toBe(false)
    expect(validateIranianShaba("IR820540102680020817909002")).toBe(true)
    expect(validateIranianShaba("IR820540102680020817909003")).toBe(false)
  })
})
