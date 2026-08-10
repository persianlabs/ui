import { describe, expect, it } from "vitest"

import { enMessages, faMessages, formatTimeAgo } from "./use-time-ago.js"

describe("formatTimeAgo", () => {
  const now = new Date(2026, 7, 10, 12, 0, 0).getTime()

  it("returns justNow for sub-minute diffs", () => {
    const from = new Date(now - 30_000)
    expect(formatTimeAgo(from, {}, now)).toBe("همین الان")
  })

  it("formats a past diff in minutes (fa)", () => {
    const from = new Date(now - 5 * 60_000)
    expect(formatTimeAgo(from, {}, now)).toBe("۵ دقیقه پیش")
  })

  it("formats a future diff in minutes (fa)", () => {
    const from = new Date(now + 5 * 60_000)
    expect(formatTimeAgo(from, {}, now)).toBe("۵ دقیقه دیگر")
  })

  it("formats a past diff in minutes (en)", () => {
    const from = new Date(now - 5 * 60_000)
    expect(formatTimeAgo(from, { locale: "en" }, now)).toBe("5 minutes ago")
  })

  it("formats a future diff in minutes (en)", () => {
    const from = new Date(now + 5 * 60_000)
    expect(formatTimeAgo(from, { locale: "en" }, now)).toBe("in 5 minutes")
  })

  it("uses yesterday/tomorrow special-casing for a 1-day diff (fa)", () => {
    const yesterday = new Date(now - 25 * 3600_000)
    expect(formatTimeAgo(yesterday, {}, now)).toBe("دیروز")
    const tomorrow = new Date(now + 25 * 3600_000)
    expect(formatTimeAgo(tomorrow, {}, now)).toBe("فردا")
  })

  it("uses yesterday/tomorrow special-casing for a 1-day diff (en)", () => {
    const yesterday = new Date(now - 25 * 3600_000)
    expect(formatTimeAgo(yesterday, { locale: "en" }, now)).toBe("yesterday")
  })

  it("pluralizes multi-day diffs (en)", () => {
    const from = new Date(now - 3 * 86400_000)
    expect(formatTimeAgo(from, { locale: "en" }, now)).toBe("3 days ago")
  })

  it("falls back to a full date beyond `max` (numeric ms)", () => {
    const from = new Date(now - 400 * 86400_000)
    const result = formatTimeAgo(
      from,
      { max: 30 * 86400_000, calendarType: "miladi" },
      now
    )
    expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2}$/)
  })

  it("falls back to a full date beyond `max` (unit name)", () => {
    const from = new Date(now - 400 * 86400_000)
    const result = formatTimeAgo(
      from,
      { max: "month", calendarType: "shamsi" },
      now
    )
    expect(result).not.toContain("پیش")
  })

  it("uses a custom fullDateFormatter", () => {
    const from = new Date(now - 400 * 86400_000)
    const result = formatTimeAgo(
      from,
      { max: "month", fullDateFormatter: () => "CUSTOM" },
      now
    )
    expect(result).toBe("CUSTOM")
  })

  it("shows seconds when showSecond is true", () => {
    const from = new Date(now - 5_000)
    expect(formatTimeAgo(from, { showSecond: true }, now)).toBe(
      "۵ ثانیه پیش"
    )
  })

  it("supports a fully custom messages table", () => {
    const from = new Date(now - 5 * 60_000)
    const result = formatTimeAgo(
      from,
      {
        messages: {
          ...enMessages,
          minute: (n) => `${n}m`,
          past: (n) => `${n} back`,
        },
      },
      now
    )
    expect(result).toBe("5m back")
  })

  it("exposes both built-in message tables", () => {
    expect(faMessages.justNow).toBe("همین الان")
    expect(enMessages.justNow).toBe("just now")
  })
})
