import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { fromShamsi } from "@workspace/ui/lib/persian-date"
import { useDate } from "./use-date.js"

describe("useDate", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 7, 10, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("reads shamsi parts by default", () => {
    const { result } = renderHook(() => useDate())
    expect(result.current?.year).toBe(1405)
    expect(result.current?.month).toBe(5)
    expect(result.current?.day).toBe(19)
  })

  it("reads miladi parts when calendarType is miladi", () => {
    const { result } = renderHook(() => useDate({ calendarType: "miladi" }))
    expect(result.current?.year).toBe(2026)
    expect(result.current?.month).toBe(8)
    expect(result.current?.day).toBe(10)
  })

  it("ticks on the given interval", () => {
    const { result } = renderHook(() => useDate({ interval: 1000 }))
    const first = result.current?.second

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current?.second).not.toBe(first)
  })

  it("does not tick when interval is 0", () => {
    const { result } = renderHook(() => useDate({ interval: 0 }))
    const firstDate = result.current?.date

    act(() => {
      vi.advanceTimersByTime(10_000)
    })

    expect(result.current?.date).toBe(firstDate)
  })

  it("flags a holiday when checkHoliday is true", () => {
    vi.setSystemTime(fromShamsi({ year: 1405, month: 1, day: 1 }))
    const { result } = renderHook(() => useDate({ checkHoliday: true }))
    expect(result.current?.isHoliday).toBe(true)
    expect(result.current?.holidays.length).toBeGreaterThan(0)
  })

  it("does not compute holidays when checkHoliday is false (default)", () => {
    vi.setSystemTime(fromShamsi({ year: 1405, month: 1, day: 1 }))
    const { result } = renderHook(() => useDate())
    expect(result.current?.isHoliday).toBe(false)
    expect(result.current?.holidays).toEqual([])
  })

  it("formats using the given pattern", () => {
    const { result } = renderHook(() =>
      useDate({ pattern: "yyyy-MM-dd", calendarType: "miladi", digits: "en" })
    )
    expect(result.current?.formatted).toBe("2026-08-10")
  })
})
