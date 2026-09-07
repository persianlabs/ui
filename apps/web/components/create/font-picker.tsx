"use client"

import * as React from "react"

import { LockButton } from "@/components/create/lock-button"
import {
  Picker,
  PickerCheckboxItem,
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
    <div className="group/picker relative">
      <Picker
        onOpenChange={(open) => {
          if (!open) {
            clearOverride()
          }
        }}
      >
        <PickerTrigger>
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
          <PickerSeparator />
          <PickerGroup>
            <PickerLabel>Delivery</PickerLabel>
            <FontDeliveryToggle
              param={param}
              currentValue={inheritsBodyFont ? bodyFontValue : currentValue}
            />
          </PickerGroup>
        </PickerContent>
      </Picker>
      <LockButton
        param={param}
        className="absolute top-1/2 right-8 -translate-y-1/2"
      />
    </div>
  )
}

// Install-source toggle inside the font menu: checked = "Local" (offline
// woff2 downloaded from the registry), unchecked = "CDN" (web font served
// by the registry / next/font import in the template — one delivery, two
// names for the same switch). Shown per selected font: only togglable when
// the font supports both deliveries; single-delivery fonts render their
// state disabled so availability stays visible.
function FontDeliveryToggle({
  param,
  currentValue,
}: {
  param: FontParam
  currentValue: string
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
  const supported = getFontSources(list, currentValue)
  const isLocal = currentSource === "local"
  const togglable = supported.includes("local") && supported.includes("next")

  return (
    <PickerCheckboxItem
      checked={isLocal}
      disabled={!togglable}
      closeOnClick={false}
      onCheckedChange={(checked) =>
        setParams({
          [sourceParam]: checked ? "local" : "next",
        } as Partial<DesignSystemSearchParams>)
      }
    >
      Local
    </PickerCheckboxItem>
  )
}
