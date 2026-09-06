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
import { useDesignSystemSearchParams } from "@/lib/create/search-params"

const MENU_OPTIONS: { value: string; label: string }[] = [
  { value: "default", label: "Default / Solid" },
  { value: "default-translucent", label: "Default / Translucent" },
  { value: "inverted", label: "Inverted / Solid" },
  { value: "inverted-translucent", label: "Inverted / Translucent" },
]

export function MenuColorPicker({
  isMobile,
  anchorRef,
}: {
  isMobile: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}) {
  const [params, setParams] = useDesignSystemSearchParams()
  const { setOverride, clearOverride } = usePreviewOverride()

  const currentMenu = MENU_OPTIONS.find((menu) => menu.value === params.menuColor)

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
            <div className="text-muted-foreground text-xs">Menu</div>
            <div className="text-foreground text-sm font-medium">
              {currentMenu?.label}
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="text-foreground pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 select-none md:right-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </PickerTrigger>
        <PickerContent
          anchor={isMobile ? anchorRef : undefined}
          side={isMobile ? "top" : "right"}
          align={isMobile ? "center" : "start"}
          onMouseLeave={clearOverride}
        >
          <PickerRadioGroup
            value={params.menuColor}
            onValueChange={(value) => {
              setParams({
                menuColor: value as DesignSystemMenuColor,
              })
            }}
            onItemPreview={
              isMobile
                ? undefined
                : (value) =>
                    setOverride({
                      menuColor: value as DesignSystemMenuColor,
                    })
            }
          >
            <PickerGroup>
              {MENU_OPTIONS.map((menu) => (
                <PickerRadioItem
                  key={menu.value}
                  value={menu.value}
                  closeOnClick={isMobile}
                >
                  {menu.label}
                </PickerRadioItem>
              ))}
            </PickerGroup>
          </PickerRadioGroup>
        </PickerContent>
      </Picker>
      <LockButton
        param="menuColor"
        className="absolute top-1/2 right-8 -translate-y-1/2"
      />
    </div>
  )
}

type DesignSystemMenuColor =
  | "default"
  | "inverted"
  | "default-translucent"
  | "inverted-translucent"
