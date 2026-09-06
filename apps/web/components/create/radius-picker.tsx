"use client"

import * as React from "react"

import { RADII, type RadiusName } from "@/lib/create/config"
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

export function RadiusPicker({
  isMobile,
  anchorRef,
}: {
  isMobile: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}) {
  const [params, setParams] = useDesignSystemSearchParams()
  const { setOverride, clearOverride } = usePreviewOverride()

  const currentRadius = RADII.find((radius) => radius.value === params.radius)
  const defaultRadius = RADII.find((radius) => radius.value === "default")
  const otherRadii = RADII.filter((radius) => radius.value !== "default")

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
            <div className="text-xs text-muted-foreground">Radius</div>
            <div className="text-sm font-medium text-foreground">
              {currentRadius?.title}
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 rotate-90 items-center justify-center text-base text-foreground select-none md:right-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-foreground"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 20v-5C4 8.925 8.925 4 15 4h5"
              />
            </svg>
          </div>
        </PickerTrigger>
        <PickerContent
          anchor={isMobile ? anchorRef : undefined}
          side={isMobile ? "top" : "right"}
          align={isMobile ? "center" : "start"}
          onMouseLeave={clearOverride}
        >
          <PickerRadioGroup
            value={currentRadius?.value}
            onValueChange={(value) => {
              setParams({ radius: value as RadiusName })
            }}
            onItemPreview={
              isMobile
                ? undefined
                : (value) => setOverride({ radius: value as RadiusName })
            }
          >
            <PickerGroup>
              {defaultRadius && (
                <PickerRadioItem
                  key={defaultRadius.value}
                  value={defaultRadius.value}
                  closeOnClick={isMobile}
                >
                  {defaultRadius.title}
                </PickerRadioItem>
              )}
            </PickerGroup>
            <PickerSeparator />
            <PickerGroup>
              {otherRadii.map((radius) => (
                <PickerRadioItem
                  key={radius.value}
                  value={radius.value}
                  closeOnClick={isMobile}
                >
                  {radius.title}
                </PickerRadioItem>
              ))}
            </PickerGroup>
          </PickerRadioGroup>
        </PickerContent>
      </Picker>
      <LockButton
        param="radius"
        className="absolute top-1/2 right-8 -translate-y-1/2"
      />
    </div>
  )
}
