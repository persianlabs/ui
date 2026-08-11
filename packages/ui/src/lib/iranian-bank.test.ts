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

describe("iranian bank utilities", () => {
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
