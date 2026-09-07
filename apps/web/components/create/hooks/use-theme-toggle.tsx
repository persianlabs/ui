"use client"

// Ported from the shadcn create app's use-theme-toggle. The site has no
// use-meta-color hook, so that part is dropped. Inside the preview iframe the
// toggle flips the "dark" class on <html> directly, broadcasts
// DARK_MODE_FORWARD_TYPE to the host page (so the host theme stays in sync),
// and listens for "design-system-dark" messages pushed from the host.

import * as React from "react"
import { useTheme } from "next-themes"

import { DARK_MODE_FORWARD_TYPE } from "@/components/create/forward-types"
import { isInIframe } from "@/components/create/hooks/use-iframe-sync"

export function useThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    if (isInIframe()) {
      const root = document.documentElement
      const nextDark = !root.classList.contains("dark")
      root.classList.toggle("dark", nextDark)
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: DARK_MODE_FORWARD_TYPE,
            data: nextDark,
          },
          "*"
        )
      }
      return
    }

    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  // Listen for dark-mode overrides pushed from the host page.
  React.useEffect(() => {
    if (!isInIframe()) {
      return
    }

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        typeof event.data === "object" &&
        event.data.type === "design-system-dark" &&
        typeof event.data.data === "boolean"
      ) {
        document.documentElement.classList.toggle("dark", event.data.data)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  // Listen for the D key to toggle theme.
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === "d" || e.key === "D") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        toggleTheme()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggleTheme])

  return { toggleTheme }
}
