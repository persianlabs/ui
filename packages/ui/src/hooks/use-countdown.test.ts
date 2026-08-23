import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useCountdown } from "./use-countdown.js"

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Seconds-only date keeps Date.now() aligned on a whole-second boundary.
    vi.setSystemTime(new Date(2026, 7, 10, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("ceilings a sub-second remainder up to the next second", () => {
    const target = new Date(2026, 7, 10, 12, 0, 0, 500).toISOString()
    const { result } = renderHook(() => useCountdown(target))

    expect(result.current?.totalSeconds).toBe(1)
    expect(result.current?.formatted).toBe("00:00:01")
    expect(result.current?.isOverdue).toBe(false)
  })

  it("reports zero exactly at the target without flagging overdue", () => {
    const target = new Date(2026, 7, 10, 12, 0, 0).toISOString()
    const { result } = renderHook(() => useCountdown(target))

    expect(result.current?.totalSeconds).toBe(0)
    expect(result.current?.isOverdue).toBe(false)
    expect(result.current?.formatted).toBe("00:00:00")
  })

  it("goes negative once the target has passed and formats the absolute value", () => {
    const target = new Date(2026, 7, 10, 11, 59, 59).toISOString()
    const { result } = renderHook(() => useCountdown(target))

    expect(result.current?.totalSeconds).toBe(-1)
    expect(result.current?.isOverdue).toBe(true)
    expect(result.current?.formatted).toBe("00:00:01")
    expect(result.current?.hours).toBe(0)
    expect(result.current?.minutes).toBe(0)
    expect(result.current?.seconds).toBe(1)
  })

  it("does not cap hours at 24 for multi-day targets", () => {
    const now = new Date(2026, 7, 10, 12, 0, 0)
    const target = new Date(now.getTime() + 48 * 3600_000 + 30_000)
    const { result } = renderHook(() => useCountdown(target.toISOString()))

    expect(result.current?.hours).toBeGreaterThanOrEqual(48)
    expect(result.current?.totalSeconds).toBeGreaterThan(0)
  })

  it("stays null for an invalid ISO string", () => {
    const { result } = renderHook(() => useCountdown("not-a-date"))

    expect(result.current).toBeNull()
  })

  it("stays null when the target is null", () => {
    const { result } = renderHook(() => useCountdown(null))

    expect(result.current).toBeNull()
  })

  it("updates itself across a second boundary and clears its timer on unmount", () => {
    const now = new Date(2026, 7, 10, 12, 0, 0).getTime()
    const target = new Date(now + 60_000).toISOString()
    const { result, unmount } = renderHook(() => useCountdown(target))

    expect(result.current?.totalSeconds).toBe(60)

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    // One self-rearmed update fires at +1000ms; ceil(59000/1000) === 59.
    expect(result.current?.totalSeconds).toBe(59)

    expect(vi.getTimerCount()).toBe(1)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
