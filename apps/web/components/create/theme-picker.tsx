"use client"

import * as React from "react"

import { useMounted } from "@/hooks/use-mounted"
import {
  BASE_COLORS,
  getThemeSwatch,
  THEMES,
  type ThemeName,
} from "@/lib/create/config"
import { LockButton } from "@/components/create/lock-button"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerTrigger,
} from "@/components/create/picker"
import { usePreviewOverride } from "@/components/create/preview-override"
import { useDesignSystemSearchParams } from "@/lib/create/search-params"

export function ThemePicker({
  themes = THEMES,
  isMobile,
  anchorRef,
}: {
  themes?: ReadonlyArray<{ value: ThemeName; title: string }>
  isMobile: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}) {
  const mounted = useMounted()
  const [params, setParams] = useDesignSystemSearchParams()
  const { setOverride, clearOverride } = usePreviewOverride()

  const currentTheme = React.useMemo(
    () => themes.find((theme) => theme.value === params.theme),
    [themes, params.theme]
  )

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
            <div className="text-xs text-muted-foreground">Theme</div>
            <div className="text-sm font-medium text-foreground">
              {currentTheme?.title}
            </div>
          </div>
          {mounted && (
            <div
              style={
                {
                  "--color": getThemeSwatch(params.theme),
                } as React.CSSProperties
              }
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none md:right-2.5"
            />
          )}
        </PickerTrigger>
        <PickerContent
          anchor={isMobile ? anchorRef : undefined}
          side={isMobile ? "top" : "right"}
          align={isMobile ? "center" : "start"}
          className="max-h-92"
          onMouseLeave={clearOverride}
        >
          <PickerRadioGroup
            value={currentTheme?.value}
            onValueChange={(value) => {
              setParams({ theme: value as ThemeName })
            }}
            onItemPreview={
              isMobile
                ? undefined
                : (value) => setOverride({ theme: value as ThemeName })
            }
          >
            <PickerGroup>
              {themes
                .filter((theme) =>
                  BASE_COLORS.some(
                    (baseColor) => baseColor.value === theme.value
                  )
                )
                .map((theme) => {
                  return (
                    <PickerRadioItem
                      key={theme.value}
                      value={theme.value}
                      closeOnClick={isMobile}
                    >
                      {theme.title}
                    </PickerRadioItem>
                  )
                })}
            </PickerGroup>
            <PickerSeparator />
            <PickerGroup>
              {themes
                .filter(
                  (theme) =>
                    !BASE_COLORS.some(
                      (baseColor) => baseColor.value === theme.value
                    )
                )
                .map((theme) => {
                  return (
                    <PickerRadioItem
                      key={theme.value}
                      value={theme.value}
                      closeOnClick={isMobile}
                    >
                      {theme.title}
                    </PickerRadioItem>
                  )
                })}
            </PickerGroup>
          </PickerRadioGroup>
        </PickerContent>
      </Picker>
      <LockButton
        param="theme"
        className="absolute top-1/2 right-8 -translate-y-1/2"
      />
    </div>
  )
}
