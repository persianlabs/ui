"use client"

// Adapted from the shadcn create app's design-system-provider. Instead of
// shadcn's registry theme builder it paints the iframe with
// buildPreviewStyle(baseColor, theme, radius, mode, params.menuAccent) rendered into a
// :root style element, applies the fixed "style-nova" body class, and wires
// the font CSS variables from the lib/create/fonts.ts catalog (shadcn-style:
// --font-sans / --font-heading on the root, composed EN stack first so Latin
// glyphs visibly change, FA stack second so Persian glyphs fall through to
// Vazirmatn — EN fonts ship no Arabic coverage).
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
import { FA_FONTS, FONTS, MONO_FONTS } from "@/lib/create/fonts"
import {
  useDesignSystemSearchParams,
  type DesignSystemSearchParams,
} from "@/lib/create/search-params"

const THEME_STYLE_ELEMENT_ID = "design-system-theme-vars"
const FONT_STYLE_ELEMENT_ID = "design-system-fonts"
const MANAGED_BODY_CLASS_PREFIXES = ["style-", "base-color-"] as const
const MANAGED_FONT_VARS = [
  "--font-sans",
  "--font-heading",
  "--font-mono",
] as const

// Only Vazirmatn ships a real file yet — every other FA catalog entry is
// metadata for the CLI until its woff2 lands in the registry. The FA side
// always resolves to the Vazirmatn face so the stack stays loadable.
function resolveFaFace(value: string) {
  return FA_FONTS.find((font) => font.value === value)?.font.face ?? "Vazirmatn"
}

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

// Explicit font-family rules for the preview, split BY SCRIPT SIDE. The
// preview shows an RTL Persian half and an LTR English half; each must
// follow its own font pickers:
//   - FA side: the Persian font owns Persian glyphs AND everything else
//     falls through to the selected EN font (the generated template's
//     custom Vazirmatn cut has no Latin letters, so Latin lands on the EN
//     font there; the preview's Google-cut Vazirmatn also serves Latin,
//     which keeps the FA side visually "Vazirmatn" — intended).
//   - EN side: the selected EN font alone.
// Two things make plain stack composition wrong here, so the rules use
// literal face names (font.face) instead of the next/font variables:
//   1. `@theme inline` bakes font utilities into literals at build time,
//      so --font-sans/--font-heading overrides alone never apply.
//   2. next/font emits a synthetic "<Face> Fallback" system face per font;
//      on Windows it (Arial) answers Persian glyphs before Vazirmatn when
//      an EN variable comes first in the stack.
// The vars are still set for var()-based consumers (mono in particular).
function buildFontCssText(
  enBodyFace: string,
  enHeadingFace: string,
  faBodyFace: string,
  faHeadingFace: string,
  monoFace: string
) {
  const enSans = `"${enBodyFace}", sans-serif`
  const enHeading = `"${enHeadingFace}", sans-serif`
  const faSans = `"${faBodyFace}", "${enBodyFace}", sans-serif`
  const faHeading = `"${faHeadingFace}", "${enHeadingFace}", sans-serif`
  const mono = `"${monoFace}", "${faBodyFace}", monospace`

  // LTR rules first: <html dir="ltr"> is an ancestor of the RTL half too,
  // so FA-side titles match both rules — RTL must come later to win
  // that cascade tie. Body text is unaffected either way (it inherits from
  // the nearest [dir] ancestor, its own half). The heading selector covers
  // every component that ships with font-heading (shadcn's set).
  const HEADING_SLOTS =
    '[data-slot="card-title"], [data-slot="dialog-title"], [data-slot="alert-dialog-title"], [data-slot="sheet-title"], [data-slot="drawer-title"], [data-slot="empty-title"]'
  return (
    `[dir="ltr"] {\n  font-family: ${enSans};\n}\n` +
    `[dir="ltr"] ${HEADING_SLOTS} {\n  font-family: ${enHeading};\n}\n` +
    `[dir="rtl"] {\n  font-family: ${faSans};\n}\n` +
    `[dir="rtl"] ${HEADING_SLOTS} {\n  font-family: ${faHeading};\n}\n` +
    `:is(code, kbd, pre, samp, .font-mono) {\n  font-family: ${mono};\n}\n`
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
      document.getElementById(FONT_STYLE_ELEMENT_ID)?.remove()

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

    // Update fonts per script side (see buildFontCssText): the EN pickers
    // drive the LTR half, the FA pickers the RTL half, mono applies to
    // code/mono surfaces on both. Vars stay set for var()-based consumers.
    const bodyFont =
      FONTS.find((font) => font.value === params.font) ?? FONTS[0]
    const headingFont =
      params.fontHeading === "inherit"
        ? bodyFont
        : (FONTS.find((font) => font.value === params.fontHeading) ?? bodyFont)
    const monoFont =
      MONO_FONTS.find((font) => font.value === params.fontMono) ?? MONO_FONTS[0]
    const faBodyFace = resolveFaFace(params.faFont)
    const faHeadingFace =
      params.faFontHeading === "inherit"
        ? faBodyFace
        : resolveFaFace(params.faFontHeading)

    root.style.setProperty(
      "--font-sans",
      `"${faBodyFace}", "${bodyFont?.font.face}", sans-serif`
    )
    root.style.setProperty(
      "--font-heading",
      `"${faHeadingFace}", "${headingFont?.font.face}", sans-serif`
    )
    root.style.setProperty(
      "--font-mono",
      `"${monoFont?.font.face}", "${faBodyFace}", monospace`
    )

    let fontStyleElement = document.getElementById(
      FONT_STYLE_ELEMENT_ID
    ) as HTMLStyleElement | null

    if (!fontStyleElement) {
      fontStyleElement = document.createElement("style")
      fontStyleElement.id = FONT_STYLE_ELEMENT_ID
      document.head.appendChild(fontStyleElement)
    }

    fontStyleElement.textContent = buildFontCssText(
      bodyFont?.font.face ?? "Geist",
      headingFont?.font.face ?? "Geist",
      faBodyFace,
      faHeadingFace,
      monoFont?.font.face ?? "Geist Mono"
    )

    setIsReady(true)
  }, [
    params.baseColor,
    params.font,
    params.fontHeading,
    params.fontMono,
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
