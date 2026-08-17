"use client"

import * as React from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Base UI's Slider resolves drag and keyboard direction through its own
 * DirectionContext (default "ltr"), not the DOM `dir` attribute — so a
 * slider rendered under an ambient `dir="rtl"` wrapper still drags and
 * responds to arrow keys as if LTR unless told otherwise. Measure the
 * ambient computed direction and feed it into Base UI's own
 * DirectionProvider, the same fix already applied to
 * ContextMenu/Menubar/Tooltip in this repo.
 */
function useAmbientDirection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")

  React.useEffect(() => {
    function update() {
      if (!ref.current) return
      setDir(getComputedStyle(ref.current).direction === "rtl" ? "rtl" : "ltr")
    }

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return { ref, dir }
}

function Slider({
  className,
  defaultValue,
  value,
  onValueChange,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const { ref: controlRef, dir } = useAmbientDirection()

  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  const isArrayValue = Array.isArray(value) || Array.isArray(defaultValue)

  // Base UI's pointer-drag path reports a bare number for a single-thumb
  // slider even when value/defaultValue is an array — keyboard input goes
  // through a different internal code path that gets this right, so the
  // shape only breaks on drag. Normalize to the shape the consumer opted
  // into so `value[0]` never turns undefined mid-drag.
  const handleValueChange: SliderPrimitive.Root.Props["onValueChange"] = (
    next,
    eventDetails
  ) => {
    const normalized: typeof next =
      isArrayValue && !Array.isArray(next) ? ([next] as typeof next) : next
    onValueChange?.(normalized, eventDetails)
  }

  return (
    <DirectionProvider direction={dir}>
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        thumbAlignment="edge"
        className={cn("data-horizontal:w-full data-vertical:h-full", className)}
        {...props}
      >
        <SliderPrimitive.Control
          ref={controlRef}
          className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col"
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className="relative grow overflow-hidden rounded-full bg-primary/20 select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
          >
            <SliderPrimitive.Indicator
              data-slot="slider-range"
              className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
            />
          </SliderPrimitive.Track>
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              key={index}
              className="relative block size-4 shrink-0 touch-manipulation rounded-full border-2 border-primary bg-background ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2.5 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    </DirectionProvider>
  )
}

export { Slider }
