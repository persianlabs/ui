"use client"

// Adapted from the shadcn create app's design-system-provider. Instead of
// shadcn's registry theme builder it paints the iframe with
// buildPreviewStyle(baseColor, theme, radius, mode, params.menuAccent) rendered into a
// :root style element, applies the fixed "style-nova" body class, and
// wires the Geist/Vazirmatn CSS variables (other fonts are not bundled yet,
// so every selection falls back to those two families).
//
// Params come from the iframe URL (via useDesignSystemSearchParams) so the
// initial load is correct without waiting for postMessage, and stay in sync
// through the "design-system-params" channel. Dark mode is derived from the
// iframe's own "dark" class (toggled by use-theme-toggle / next-themes) and
// can be forced by the host through "design-system-dark" messages.

import * as React from "react"

import { useIframeMessageListener } from "@/components/create/hooks/use-iframe-sync"
import {
  buildPreviewStyle,
  type BaseColorName,
  type RadiusName,
  type ThemeName,
} from "@/lib/create/config"
import {
  useDesignSystemSearchParams,
  type DesignSystemSearchParams,
} from "@/lib/create/search-params"

const THEME_STYLE_ELEMENT_ID = "design-system-theme-vars"
const MANAGED_BODY_CLASS_PREFIXES = ["style-", "base-color-"] as const
const MANAGED_FONT_VARS = [
  "--font-geist",
  "--font-fa",
  "--font-heading-geist",
  "--font-heading-fa",
] as const

const GEIST_FONT_VAR = "var(--font-geist-sans)"
const VAZIRMATN_FONT_VAR = "var(--font-vazirmatn)"

type Mode = "light" | "dark"

function removeManagedBodyClasses(body: HTMLElement) {
  for (const className of Array.from(body.classList)) {
    if (
      MANAGED_BODY_CLASS_PREFIXES.some((prefix) => className.startsWith(prefix))
    ) {
      body.classList.remove(className)
    }
  }
}

function buildCssRule(
  selector: string,
  cssVars: Record<string, string | number>
) {
  const declarations = Object.entries(cssVars)
    .filter(([key, value]) => key.startsWith("--") && Boolean(value))
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n")

  if (!declarations) {
    return `${selector} {}\n`
  }

  return `${selector} {\n${declarations}\n}\n`
}

function buildThemeCssText(
  baseColor: BaseColorName,
  theme: ThemeName,
  radius: RadiusName,
  mode: Mode,
  menuAccent: "subtle" | "bold"
) {
  return buildCssRule(
    ":root",
    buildPreviewStyle(baseColor, theme, radius, mode, menuAccent) as Record<
      string,
      string | number
    >
  )
}

export function DesignSystemProvider({
  children,
  initialParams,
}: {
  children: React.ReactNode
  // Params resolved on the server from the iframe URL, so the first render —
  // including SSR — already has the right design system without waiting for
  // the postMessage channel.
  initialParams?: DesignSystemSearchParams
}) {
  const [searchParams, setSearchParams] = useDesignSystemSearchParams({
    shallow: true, // No need to go through the server…
    history: "replace", // …or push updates into the iframe history.
  })
  const [isHydrated, setIsHydrated] = React.useState(false)
  React.useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Prefer the server-resolved params until the hook is live — after mount
  // nuqs reads the iframe URL anyway, so both agree.
  const params = React.useMemo(() => {
    if (initialParams && !isHydrated) {
      return { ...searchParams, ...initialParams }
    }
    return searchParams
  }, [searchParams, initialParams, isHydrated])

  const [isReady, setIsReady] = React.useState(false)

  // Dark mode: the iframe's own "dark" class is the source of truth, with an
  // optional override pushed from the host page via "design-system-dark".
  const [darkOverride, setDarkOverride] = React.useState<boolean | null>(null)
  const [isDarkClass, setIsDarkClass] = React.useState(false)

  useIframeMessageListener("design-system-dark", setDarkOverride)

  React.useLayoutEffect(() => {
    const root = document.documentElement
    const update = () => setIsDarkClass(root.classList.contains("dark"))
    update()

    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => {
      observer.disconnect()
    }
  }, [])

  const mode: Mode =
    darkOverride !== null
      ? darkOverride
        ? "dark"
        : "light"
      : isDarkClass
        ? "dark"
        : "light"

  const handleDesignSystemMessage = React.useCallback(
    (nextParams: DesignSystemSearchParams) => {
      setSearchParams(nextParams)
    },
    [setSearchParams]
  )

  useIframeMessageListener("design-system-params", handleDesignSystemMessage)

  // Snapshot the managed font vars once so unmount can restore them.
  const initialFontVarsRef = React.useRef<Array<[string, string | null]>>([])

  React.useEffect(() => {
    const root = document.documentElement
    initialFontVarsRef.current = MANAGED_FONT_VARS.map((name) => [
      name,
      root.style.getPropertyValue(name) || null,
    ])

    return () => {
      removeManagedBodyClasses(document.body)
      document.getElementById(THEME_STYLE_ELEMENT_ID)?.remove()

      const rootElement = document.documentElement
      for (const [name, value] of initialFontVarsRef.current) {
        if (value) {
          rootElement.style.setProperty(name, value)
        } else {
          rootElement.style.removeProperty(name)
        }
      }
    }
  }, [])

  // Use useLayoutEffect for synchronous style updates to prevent flash.
  React.useLayoutEffect(() => {
    const body = document.body
    const root = document.documentElement

    // Iterate over a snapshot so removals do not affect traversal.
    removeManagedBodyClasses(body)
    body.classList.add("style-nova", `base-color-${params.baseColor}`)

    // Update fonts. Only Geist and Vazirmatn are bundled, so any selection
    // falls back to those families; the value is metadata for the CLI.
    root.style.setProperty("--font-geist", GEIST_FONT_VAR)
    root.style.setProperty("--font-fa", VAZIRMATN_FONT_VAR)

    if (params.fontHeading !== "inherit") {
      root.style.setProperty("--font-heading-geist", GEIST_FONT_VAR)
    } else {
      root.style.removeProperty("--font-heading-geist")
    }

    if (params.faFontHeading !== "inherit") {
      root.style.setProperty("--font-heading-fa", VAZIRMATN_FONT_VAR)
    } else {
      root.style.removeProperty("--font-heading-fa")
    }

    setIsReady(true)
  }, [
    params.baseColor,
    params.font,
    params.fontHeading,
    params.faFont,
    params.faFontHeading,
  ])

  // Use useLayoutEffect for synchronous CSS var updates.
  React.useLayoutEffect(() => {
    let styleElement = document.getElementById(
      THEME_STYLE_ELEMENT_ID
    ) as HTMLStyleElement | null

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = THEME_STYLE_ELEMENT_ID
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = buildThemeCssText(
      params.baseColor,
      params.theme,
      params.radius,
      mode,
      params.menuAccent
    )
  }, [params.baseColor, params.theme, params.radius, mode, params.menuAccent])

  // Handle menu color inversion by adding/removing the dark class on
  // .cn-menu-target elements, and translucency via cn-menu-translucent.
  // Ported from the shadcn design-system-provider.
  React.useLayoutEffect(() => {
    if (!isReady) {
      return
    }
    const menuColor = params.menuColor
    if (!menuColor) {
      return
    }

    const isInvertedMenu =
      menuColor === "inverted" || menuColor === "inverted-translucent"
    const isTranslucentMenu =
      menuColor === "default-translucent" ||
      menuColor === "inverted-translucent"
    let frameId = 0

    const updateMenuElements = () => {
      const allElements = document.querySelectorAll<HTMLElement>(
        ".cn-menu-target, [data-menu-translucent]"
      )

      if (allElements.length === 0) {
        return
      }

      allElements.forEach((element) => {
        element.style.transition = "none"
      })

      allElements.forEach((element) => {
        if (element.classList.contains("cn-menu-target")) {
          if (isInvertedMenu) {
            element.classList.add("dark")
          } else {
            element.classList.remove("dark")
          }
        }

        if (isTranslucentMenu) {
          element.classList.add("cn-menu-translucent")
          element.removeAttribute("data-menu-translucent")
        } else if (element.classList.contains("cn-menu-translucent")) {
          element.classList.remove("cn-menu-translucent")
          element.setAttribute("data-menu-translucent", "")
        }
      })

      void document.body.offsetHeight
      allElements.forEach((element) => {
        element.style.transition = ""
      })
    }

    const scheduleMenuUpdate = () => {
      if (frameId) {
        return
      }
      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        updateMenuElements()
      })
    }

    updateMenuElements()

    const observer = new MutationObserver(() => {
      scheduleMenuUpdate()
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [isReady, params.menuColor])

  if (!isReady) {
    return null
  }

  return <>{children}</>
}
