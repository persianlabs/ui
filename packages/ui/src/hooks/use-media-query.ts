"use client"

import { useSyncExternalStore } from "react"

function subscribe(query: string, callback: () => void) {
  const mql = window.matchMedia(query)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

/** Tracks a CSS media query. Returns `false` during SSR and until hydration. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => false
  )
}

const MOBILE_BREAKPOINT = "(max-width: 767px)"

export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_BREAKPOINT)
}
