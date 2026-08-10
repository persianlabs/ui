"use client"

import "@ncdai/react-wheel-picker/style.css"

import { useEffect, useRef, type ComponentProps } from "react"
import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker"

import { cn } from "@/lib/utils"

type WheelPickerValue = WheelPickerPrimitive.WheelPickerValue

type WheelPickerOption<T extends WheelPickerValue = string> =
  WheelPickerPrimitive.WheelPickerOption<T>

type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames

function WheelPickerWrapper({
  className,
  ...props
}: ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  const gestureBoundaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const boundary = gestureBoundaryRef.current
    if (!boundary) return

    // Drawers listen for vertical touch gestures too. Stop propagation at this
    // boundary after the wheel receives it, preserving the picker's inertia.
    const isolateWheelGesture = (event: TouchEvent) => event.stopPropagation()

    boundary.addEventListener("touchstart", isolateWheelGesture)
    boundary.addEventListener("touchmove", isolateWheelGesture)
    boundary.addEventListener("touchend", isolateWheelGesture)
    boundary.addEventListener("touchcancel", isolateWheelGesture)

    return () => {
      boundary.removeEventListener("touchstart", isolateWheelGesture)
      boundary.removeEventListener("touchmove", isolateWheelGesture)
      boundary.removeEventListener("touchend", isolateWheelGesture)
      boundary.removeEventListener("touchcancel", isolateWheelGesture)
    }
  }, [])

  return (
    <div ref={gestureBoundaryRef} dir="ltr" className="touch-none">
      <WheelPickerPrimitive.WheelPickerWrapper
        className={cn(
          "min-w-56 rounded-lg border border-border bg-card px-1 shadow-xs",
          "*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md",
          "*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md",
          className
        )}
        {...props}
      />
    </div>
  )
}

function WheelPicker<T extends WheelPickerValue = string>({
  classNames,
  ...props
}: WheelPickerPrimitive.WheelPickerProps<T>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      classNames={{
        optionItem: cn(
          "text-muted-foreground data-disabled:opacity-40",
          classNames?.optionItem
        ),
        highlightWrapper: cn(
          "bg-[color-mix(in_srgb,var(--card),var(--foreground)_6%)] text-foreground",
          "data-rwp-focused:inset-ring-2 data-rwp-focused:inset-ring-ring/50",
          classNames?.highlightWrapper
        ),
        highlightItem: cn(
          "data-disabled:opacity-40",
          classNames?.highlightItem
        ),
      }}
      {...props}
    />
  )
}

export { WheelPicker, WheelPickerWrapper }
export type { WheelPickerClassNames, WheelPickerOption }
