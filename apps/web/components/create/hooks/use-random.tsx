"use client"

import * as React from "react"

import { useLocks } from "@/components/create/hooks/use-locks"
import {
  BASE_COLORS,
  RADII,
  THEMES,
  type BaseColorName,
  type RadiusName,
  type ThemeName,
} from "@/lib/create/config"
import { FA_FONTS, FONTS } from "@/lib/create/fonts"
import {
  useDesignSystemSearchParams,
  type DesignSystemSearchParams,
} from "@/lib/create/search-params"

function randomItem<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)] as T
}

export function useRandom() {
  const { locks } = useLocks()
  const [params, setParams] = useDesignSystemSearchParams()

  const paramsRef = React.useRef(params)
  React.useEffect(() => {
    paramsRef.current = params
  }, [params])

  // Uniform random choice across every design-system param. Locked params
  // keep their current value. Heading fonts inherit the body font ~60% of
  // the time so paired typography stays the common case.
  const randomize = React.useCallback(() => {
    const current = paramsRef.current
    const nextParams: Partial<DesignSystemSearchParams> = {
      baseColor: locks.has("baseColor")
        ? current.baseColor
        : (randomItem(BASE_COLORS).value as BaseColorName),
      theme: locks.has("theme")
        ? current.theme
        : (randomItem(THEMES).value as ThemeName),
      radius: locks.has("radius")
        ? current.radius
        : (randomItem(RADII).value as RadiusName),
      font: locks.has("font")
        ? current.font
        : (randomItem(FONTS).value as DesignSystemSearchParams["font"]),
      fontHeading: locks.has("fontHeading")
        ? current.fontHeading
        : Math.random() < 0.6
          ? "inherit"
          : (randomItem(FONTS)
              .value as DesignSystemSearchParams["fontHeading"]),
      faFont: locks.has("faFont")
        ? current.faFont
        : (randomItem(FA_FONTS).value as DesignSystemSearchParams["faFont"]),
      faFontHeading: locks.has("faFontHeading")
        ? current.faFontHeading
        : Math.random() < 0.6
          ? "inherit"
          : (randomItem(FA_FONTS)
              .value as DesignSystemSearchParams["faFontHeading"]),
    }

    // Keep the ref in sync so rapid repeats use the latest randomized state
    // even before the URL state finishes committing.
    paramsRef.current = {
      ...paramsRef.current,
      ...nextParams,
    }

    setParams(nextParams)
  }, [setParams, locks])

  const randomizeRef = React.useRef(randomize)
  React.useEffect(() => {
    randomizeRef.current = randomize
  }, [randomize])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "r" && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        randomizeRef.current()
      }
    }

    document.addEventListener("keydown", down)
    return () => {
      document.removeEventListener("keydown", down)
    }
  }, [])

  return { randomize }
}
