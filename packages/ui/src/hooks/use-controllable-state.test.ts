import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { useControllableState } from "./use-controllable-state.js"

describe("useControllableState", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders defaultValue and updates internal state when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultProp: "a" })
    )

    expect(result.current[0]).toBe("a")

    act(() => {
      result.current[1]("b")
    })

    expect(result.current[0]).toBe("b")
  })

  it("supports functional updates when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultProp: 1 })
    )

    act(() => {
      result.current[1]((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(2)
  })

  it("invokes onChange on the setter and follows the prop when controlled", () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControllableState({ prop: value, defaultProp: "a", onChange }),
      { initialProps: { value: "a" } }
    )

    expect(result.current[0]).toBe("a")

    act(() => {
      result.current[1]("b")
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("b")
    // The displayed value still tracks the prop, not the setter argument.
    expect(result.current[0]).toBe("a")

    rerender({ value: "b" })
    expect(result.current[0]).toBe("b")
  })

  it("warns exactly once when switching between controlled and uncontrolled", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
    const { rerender } = renderHook(
      ({ value }) =>
        useControllableState({ prop: value, defaultProp: "a", caller: "Test" }),
      { initialProps: { value: undefined as string | undefined } }
    )

    rerender({ value: "controlled" })
    rerender({ value: "controlled" })

    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy.mock.calls[0]?.[0]).toContain(
      "Test is changing from uncontrolled to controlled"
    )
  })

  it("uses the latest onChange after a rerender (no stale closure)", () => {
    const firstOnChange = vi.fn()
    const latestOnChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ onChange }) => useControllableState({ defaultProp: "a", onChange }),
      { initialProps: { onChange: firstOnChange } }
    )

    rerender({ onChange: latestOnChange })

    act(() => {
      result.current[1]("b")
    })

    expect(latestOnChange).toHaveBeenCalledTimes(1)
    expect(latestOnChange).toHaveBeenCalledWith("b")
    expect(firstOnChange).not.toHaveBeenCalled()
  })
})
