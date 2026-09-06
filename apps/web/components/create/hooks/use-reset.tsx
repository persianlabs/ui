"use client"

import * as React from "react"
import { useSyncExternalStore } from "react"

import { RESET_FORWARD_TYPE } from "@/components/create/forward-types"
import {
  useDesignSystemSearchParams,
  type DesignSystemSearchParams,
} from "@/lib/create/search-params"

export { RESET_FORWARD_TYPE }

// Defaults for the taymaz design system: neutral base color and theme,
// default radius, Geist for Latin, Vazirmatn for Persian.
const DEFAULT_PARAMS: Partial<DesignSystemSearchParams> = {
  baseColor: "neutral",
  theme: "neutral",
  radius: "default",
  font: "geist",
  fontHeading: "inherit",
  faFont: "vazirmatn",
  faFontHeading: "vazirmatn",
}

// Tiny shared store so MainMenu and ResetDialog observe the same dialog
// state. (shadcn uses swr for this; we avoid the extra dependency.)
let showResetDialog = false
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function setShowResetDialog(open: boolean) {
  showResetDialog = open
  for (const listener of listeners) {
    listener()
  }
}

export function useReset() {
  const [params, setParams] = useDesignSystemSearchParams()
  const showResetDialogOpen = useSyncExternalStore(
    subscribe,
    () => showResetDialog,
    () => false
  )

  const reset = React.useCallback(() => {
    setParams({
      ...DEFAULT_PARAMS,
      item: params.item,
    })
  }, [setParams, params.item])

  const handleShowResetDialogChange = React.useCallback((open: boolean) => {
    setShowResetDialog(open)
  }, [])

  const confirmReset = React.useCallback(() => {
    reset()
    setShowResetDialog(false)
  }, [reset])

  const showResetDialogRef = React.useRef(showResetDialogOpen)
  React.useEffect(() => {
    showResetDialogRef.current = showResetDialogOpen
  }, [showResetDialogOpen])

  const confirmResetRef = React.useRef(confirmReset)
  React.useEffect(() => {
    confirmResetRef.current = confirmReset
  }, [confirmReset])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "R" && e.shiftKey && !e.metaKey && !e.ctrlKey) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()

        // If the dialog is already open, confirm the reset.
        if (showResetDialogRef.current) {
          confirmResetRef.current()
          return
        }

        setShowResetDialog(true)
      }
    }

    document.addEventListener("keydown", down)
    return () => {
      document.removeEventListener("keydown", down)
    }
  }, [])

  return {
    reset,
    showResetDialog: showResetDialogOpen,
    setShowResetDialog: handleShowResetDialogChange,
    confirmReset,
  }
}
