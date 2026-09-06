"use client"

import * as React from "react"

import { LockButton } from "@/components/create/lock-button"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerRadioGroup,
  PickerRadioItem,
  PickerTrigger,
} from "@/components/create/picker"
import { usePreviewOverride } from "@/components/create/preview-override"
import {
  FA_FONTS,
  FONTS,
  getFontTitle,
  type FontOption,
} from "@/lib/create/fonts"
import {
  useDesignSystemSearchParams,
  type DesignSystemSearchParams,
} from "@/lib/create/search-params"

type FontParam = Extract<
  keyof DesignSystemSearchParams,
  "font" | "fontHeading" | "faFont" | "faFontHeading"
>

export function FontPicker({
  label,
  param,
  options,
  isMobile,
  anchorRef,
}: {
  label: string
  param: FontParam
  options: readonly FontOption[]
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

  const currentOption = React.useMemo(
    () => options.find((option) => option.value === currentValue),
    [options, currentValue]
  )
  // For heading params the "inherit" option resolves to the body font.
  const bodyFontList = param === "faFontHeading" ? FA_FONTS : FONTS
  const bodyFontValue = param === "faFontHeading" ? params.faFont : params.font
  const inheritsBodyFont =
    (param === "fontHeading" || param === "faFontHeading") &&
    currentValue === "inherit"
  const displayFontName = inheritsBodyFont
    ? getFontTitle(bodyFontList, bodyFontValue)
    : currentOption?.title

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
          <div className="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base text-foreground select-none md:right-2.5">
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
            value={currentValue === "inherit" ? bodyFontValue : currentValue}
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
            <PickerGroup>
              {options
                .filter((option) => option.value !== "inherit")
                .map((option) => (
                  <PickerRadioItem
                    key={option.value}
                    value={option.value}
                    closeOnClick={isMobile}
                  >
                    {option.title}
                  </PickerRadioItem>
                ))}
            </PickerGroup>
          </PickerRadioGroup>
        </PickerContent>
      </Picker>
      <LockButton
        param={param}
        className="absolute top-1/2 right-8 -translate-y-1/2"
      />
    </div>
  )
}
