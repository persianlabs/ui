"use client"

import * as React from "react"

export type CopyState = "idle" | "done" | "error"

function legacyCopy(value: string) {
  const textArea = document.createElement("textarea")
  textArea.value = value
  textArea.setAttribute("readonly", "")
  textArea.style.position = "fixed"
  textArea.style.opacity = "0"
  textArea.style.pointerEvents = "none"

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  textArea.setSelectionRange(0, value.length)

  let hasCopied = false
  try {
    hasCopied = document.execCommand("copy")
  } catch {
    hasCopied = false
  }

  document.body.removeChild(textArea)
  return hasCopied
}

export interface UseCopyToClipboardOptions {
  /** Delay before `state` resets back to `"idle"`, in ms. @default 2000 */
  resetDelay?: number
  onCopySuccess?: (text: string) => void
  onCopyError?: (error: Error) => void
}

/** Copies text to the clipboard, exposing an idle/done/error state for UI feedback. */
export function useCopyToClipboard({
  resetDelay = 2000,
  onCopySuccess,
  onCopyError,
}: UseCopyToClipboardOptions = {}) {
  const [state, setState] = React.useState<CopyState>("idle")
  const resetTimeout = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const copy = React.useCallback(
    async (value: string) => {
      window.clearTimeout(resetTimeout.current)

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value)
        } else if (!legacyCopy(value)) {
          throw new Error("Copy command was not successful")
        }

        setState("done")
        onCopySuccess?.(value)
      } catch (err) {
        setState("error")
        onCopyError?.(err instanceof Error ? err : new Error(String(err)))
      }

      if (resetDelay !== 0) {
        resetTimeout.current = setTimeout(() => setState("idle"), resetDelay)
      }
    },
    [onCopyError, onCopySuccess, resetDelay]
  )

  React.useEffect(() => () => window.clearTimeout(resetTimeout.current), [])

  return { state, copy }
}
