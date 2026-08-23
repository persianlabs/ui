import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useCopyToClipboard } from "./use-copy-to-clipboard.js"

function stubClipboard(writeText: unknown) {
  Object.defineProperty(navigator, "clipboard", {
    value: writeText === undefined ? undefined : { writeText },
    configurable: true,
  })
}

const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard"
)

describe("useCopyToClipboard", () => {
  afterEach(() => {
    if (originalClipboard) {
      Object.defineProperty(navigator, "clipboard", originalClipboard)
    } else {
      delete (navigator as { clipboard?: unknown }).clipboard
    }
    vi.useRealTimers()
  })

  it("copies and flips isCopied back after the timeout", async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)

    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      result.current.copyToClipboard("hello")
    })

    expect(writeText).toHaveBeenCalledWith("hello")
    expect(result.current.isCopied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.isCopied).toBe(false)
  })

  it("does not throw when navigator.clipboard is undefined", () => {
    stubClipboard(undefined)

    const { result } = renderHook(() => useCopyToClipboard())

    expect(() => result.current.copyToClipboard("hello")).not.toThrow()
    expect(result.current.isCopied).toBe(false)
  })

  it("ignores empty values", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)

    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      result.current.copyToClipboard("")
    })

    expect(writeText).not.toHaveBeenCalled()
    expect(result.current.isCopied).toBe(false)
  })
})
