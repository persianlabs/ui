"use client"

import * as React from "react"
import { LockIcon } from "lucide-react"

import { LockButton } from "@/components/create/lock-button"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerLabel,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerTrigger,
} from "@/components/create/picker"
import { usePreviewOverride } from "@/components/create/preview-override"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"
import {
  FA_FONTS,
  FONTS,
  MONO_FONTS,
  getFontSources,
  type FontOption,
} from "@/lib/create/fonts"
import {
  useDesignSystemSearchParams,
  type DesignSystemSearchParams,
} from "@/lib/create/search-params"

type FontParam = Extract<
  keyof DesignSystemSearchParams,
  "font" | "fontHeading" | "fontMono" | "faFont" | "faFontHeading"
>

type FontSourceParam = Extract<
  keyof DesignSystemSearchParams,
  | "fontSource"
  | "fontHeadingSource"
  | "fontMonoSource"
  | "faFontSource"
  | "faFontHeadingSource"
>

const SOURCE_PARAM: Record<FontParam, FontSourceParam> = {
  font: "fontSource",
  fontHeading: "fontHeadingSource",
  fontMono: "fontMonoSource",
  faFont: "faFontSource",
  faFontHeading: "faFontHeadingSource",
}

type FontPickerOption = Pick<FontOption, "title" | "value" | "type" | "font">

export function FontPicker({
  label,
  param,
  options,
  isMobile,
  anchorRef,
}: {
  label: string
  param: FontParam
  options: readonly FontPickerOption[]
  isMobile: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}) {
  const [params, setParams] = useDesignSystemSearchParams()
  const { setOverride, clearOverride } = usePreviewOverride()
  const currentValue = params[param]
  const handleFontChange = React.useCallback(
    (value: string) => {
      setParams({
        [param]: value,
      } as Partial<DesignSystemSearchParams>)
    },
    [param, setParams]
  )

  const currentFont = React.useMemo(
    () => options.find((font) => font.value === currentValue),
    [options, currentValue]
  )
  // For heading params the "inherit" option resolves to the body font.
  // (fontMono has no inherit/body relationship — it stands alone.)
  const bodyFontList = param === "faFontHeading" ? FA_FONTS : FONTS
  const bodyFontValue =
    param === "fontMono"
      ? params.fontMono
      : param === "faFontHeading"
        ? params.faFont
        : params.font
  const currentBodyFont = React.useMemo(
    () => bodyFontList.find((font) => font.value === bodyFontValue),
    [bodyFontList, bodyFontValue]
  )
  const isHeadingParam = param === "fontHeading" || param === "faFontHeading"
  const inheritsBodyFont = isHeadingParam && currentValue === "inherit"
  const displayFontName = inheritsBodyFont
    ? currentBodyFont?.title
    : currentFont?.title
  const inheritFontLabel = currentBodyFont ? currentBodyFont.title : "Body font"
  const groupedFonts = React.useMemo(() => {
    const pickerFonts = isHeadingParam
      ? options.filter((font) => font.value !== "inherit")
      : options
    const groups = new Map<string, FontPickerOption[]>()

    for (const font of pickerFonts) {
      const existing = groups.get(font.type)
      if (existing) {
        existing.push(font)
        continue
      }

      groups.set(font.type, [font])
    }

    return Array.from(groups.entries()).map(([type, items]) => ({
      type,
      label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      items,
    }))
  }, [options, isHeadingParam])

  return (
    <div className="group/picker flex items-stretch gap-1.5">
      <FontSourceToggle
        param={param}
        value={inheritsBodyFont ? bodyFontValue : currentValue}
      />
      <div className="relative min-w-0 flex-1">
        <Picker
          onOpenChange={(open) => {
            if (!open) {
              clearOverride()
            }
          }}
        >
          <PickerTrigger className="w-full">
            <div className="flex flex-col justify-start text-left">
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="line-clamp-1 max-w-[80%] truncate text-sm font-medium text-foreground">
                {displayFontName}
              </div>
            </div>
            <div
              className="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base text-foreground select-none md:right-2.5"
              style={{
                fontFamily:
                  currentFont?.font?.style.fontFamily ??
                  currentBodyFont?.font.style.fontFamily,
              }}
            >
              Aa
            </div>
          </PickerTrigger>
          <PickerContent
            anchor={isMobile ? anchorRef : undefined}
            side={isMobile ? "top" : "right"}
            align={isMobile ? "center" : "start"}
            className="max-h-96"
            onMouseLeave={clearOverride}
          >
            <PickerRadioGroup
              value={currentValue}
              onValueChange={handleFontChange}
              onItemPreview={
                isMobile
                  ? undefined
                  : (value) =>
                      setOverride({
                        [param]: value,
                      } as Partial<DesignSystemSearchParams>)
              }
            >
              {isHeadingParam ? (
                <>
                  <PickerGroup>
                    <PickerRadioItem value="inherit" closeOnClick={isMobile}>
                      {inheritFontLabel}
                    </PickerRadioItem>
                  </PickerGroup>
                  <PickerSeparator />
                </>
              ) : null}
              {groupedFonts.map((group) => (
                <PickerGroup key={group.type}>
                  <PickerLabel>{group.label}</PickerLabel>
                  {group.items.map((font) => (
                    <PickerRadioItem
                      key={font.value}
                      value={font.value}
                      closeOnClick={isMobile}
                      style={{ fontFamily: font.font.style.fontFamily }}
                    >
                      {font.title}
                    </PickerRadioItem>
                  ))}
                </PickerGroup>
              ))}
            </PickerRadioGroup>
          </PickerContent>
        </Picker>
        <LockButton
          param={param}
          className="absolute top-1/2 right-8 -translate-y-1/2"
        />
      </div>
    </div>
  )
}

// The "local" delivery toggle, rendered as a vertical strip to the left of
// each font picker trigger (not inside the dropdown). Checked/active =
// "local" (offline woff2 downloaded from the registry and bundled into the
// project), unchecked = "next" (web font served via next/font/CDN import).
// A font only gets the toggle when it supports both deliveries; single
// delivery fonts (Vazirmatn — our custom cut, local-only) render the strip
// in a locked state so availability stays visible. Hovering shows a tooltip
// that explains the current behavior and what clicking does.
function FontSourceToggle({
  param,
  value,
}: {
  param: FontParam
  value: string
}) {
  const [params, setParams] = useDesignSystemSearchParams()
  const sourceParam = SOURCE_PARAM[param]
  const currentSource = params[sourceParam]
  const list =
    param === "faFont" || param === "faFontHeading"
      ? FA_FONTS
      : param === "fontMono"
        ? MONO_FONTS
        : FONTS
  const supported = getFontSources(list, value)
  const isLocal = currentSource === "local"
  const togglable = supported.includes("local") && supported.includes("next")

  const label = togglable ? (
    <>
      <span
        aria-hidden
        className="rotate-180 leading-none tracking-[0.25em] select-none [writing-mode:vertical-rl]"
      >
        LOCAL
      </span>
      <span className="sr-only">Local delivery</span>
    </>
  ) : (
    <>
      <LockIcon className="size-3.5" strokeWidth={2} />
      <span className="sr-only">
        {isLocal ? "Available locally only" : "Local delivery"}
      </span>
    </>
  )

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-pressed={togglable ? isLocal : undefined}
            aria-label="Local delivery"
            disabled={!togglable}
            onClick={() =>
              setParams({
                [sourceParam]: isLocal ? "next" : "local",
              } as Partial<DesignSystemSearchParams>)
            }
          >
            {label}
          </button>
        }
        className={cn(
          "flex w-5 shrink-0 cursor-pointer touch-manipulation flex-col items-center justify-center rounded-lg text-[10px] font-semibold tracking-wide ring-1 ring-foreground/10 transition-colors select-none focus-visible:ring-foreground/50 focus-visible:outline-none disabled:cursor-not-allowed",
          isLocal
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground hover:bg-foreground/10",
          !togglable &&
            "bg-muted text-muted-foreground/60 ring-foreground/5 hover:bg-muted"
        )}
      />
      <TooltipContent side="right" align="center" sideOffset={8}>
        {!togglable ? (
          <span>
            Only available as a local file — this font is not on a CDN.
          </span>
        ) : isLocal ? (
          <span>
            Installed locally — the font file is downloaded and bundled into
            your project, with no external requests at runtime. Click to serve
            it from a CDN instead.
          </span>
        ) : (
          <span>
            Served from a CDN at runtime via a font import. Click to download
            and install the font locally for offline use.
          </span>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
