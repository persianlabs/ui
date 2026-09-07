"use client"

import * as React from "react"

import { useLocks } from "@/components/create/hooks/use-locks"
import {
  BASE_COLORS,
  getThemesForBaseColor,
  RADII,
  type BaseColorName,
  type RadiusName,
  type ThemeName,
} from "@/lib/create/config"
import { FA_FONTS, FONTS, MONO_FONTS, getFontSources } from "@/lib/create/fonts"
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
    const baseColor = locks.has("baseColor")
      ? current.baseColor
      : (randomItem(BASE_COLORS).value as BaseColorName)
    // The theme must belong to the (possibly new) base color — anything
    // else would not apply, shadcn-style.
    const availableThemes = getThemesForBaseColor(baseColor)
    const theme = locks.has("theme")
      ? current.theme
      : (randomItem(availableThemes).value as ThemeName)
    const font = locks.has("font")
      ? current.font
      : (randomItem(FONTS).value as DesignSystemSearchParams["font"])
    const fontHeading = locks.has("fontHeading")
      ? current.fontHeading
      : Math.random() < 0.6
        ? "inherit"
        : (randomItem(FONTS).value as DesignSystemSearchParams["fontHeading"])
    const faFont = locks.has("faFont")
      ? current.faFont
      : (randomItem(FA_FONTS).value as DesignSystemSearchParams["faFont"])
    const faFontHeading = locks.has("faFontHeading")
      ? current.faFontHeading
      : Math.random() < 0.6
        ? "inherit"
        : (randomItem(FA_FONTS)
            .value as DesignSystemSearchParams["faFontHeading"])
    const fontMono = locks.has("fontMono")
      ? current.fontMono
      : (randomItem(MONO_FONTS).value as DesignSystemSearchParams["fontMono"])
    // Each source follows its (possibly new) font — a font installs from
    // whichever of local/next it supports.
    const pickSource = (
      locked: boolean,
      currentSource: DesignSystemSearchParams["fontSource"],
      list: typeof FONTS,
      value: string
    ) => (locked ? currentSource : randomItem(getFontSources(list, value)))
    const nextParams: Partial<DesignSystemSearchParams> = {
      baseColor,
      theme,
      radius: locks.has("radius")
        ? current.radius
        : (randomItem(RADII).value as RadiusName),
      font,
      fontHeading,
      faFont,
      faFontHeading,
      fontSource: pickSource(
        locks.has("fontSource"),
        current.fontSource,
        FONTS,
        font
      ),
      fontHeadingSource: pickSource(
        locks.has("fontHeadingSource"),
        current.fontHeadingSource,
        FONTS,
        fontHeading === "inherit" ? font : fontHeading
      ),
      faFontSource: pickSource(
        locks.has("faFontSource"),
        current.faFontSource,
        FA_FONTS,
        faFont
      ),
      faFontHeadingSource: pickSource(
        locks.has("faFontHeadingSource"),
        current.faFontHeadingSource,
        FA_FONTS,
        faFontHeading === "inherit" ? faFont : faFontHeading
      ),
      fontMono,
      fontMonoSource: pickSource(
        locks.has("fontMonoSource"),
        current.fontMonoSource,
        MONO_FONTS,
        fontMono
      ),
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
