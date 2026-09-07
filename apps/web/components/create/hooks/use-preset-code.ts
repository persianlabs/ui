"use client"

import { getPresetCode } from "@/lib/create/preset-code"
import { useDesignSystemSearchParams } from "@/lib/create/search-params"

// Returns the canonical preset code derived from the current search params.
export function usePresetCode() {
  const [params] = useDesignSystemSearchParams()

  return getPresetCode(params)
}
