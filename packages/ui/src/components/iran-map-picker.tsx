"use client"

import * as React from "react"

import { useControllableState } from "@workspace/ui/hooks/use-controllable-state"
import { cn } from "@workspace/ui/lib/utils"

import {
  IRAN_MAP_VIEWBOX,
  IRAN_PROVINCE_SHAPES,
} from "@workspace/ui/lib/iran-map-data"

export interface IranMapPickerProps {
  /** The selected province ISO code, e.g. "IR-23". Use when controlled. */
  value?: string | null
  /** The initially selected province code when uncontrolled. */
  defaultValue?: string | null
  /** Called with the province code on selection, or null when cleared. */
  onValueChange?: (value: string | null) => void
  /** Disables every interaction with the map. */
  disabled?: boolean
  className?: string
}

function IranMapPicker({
  value,
  defaultValue = null,
  onValueChange,
  disabled = false,
  className,
}: IranMapPickerProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const [selected, setSelected] = useControllableState<string | null>({
    // Pass null straight through — coercing it to undefined would flip the
    // hook into uncontrolled mode and break click-to-clear.
    prop: value,
    defaultProp: defaultValue ?? null,
    onChange: onValueChange,
  })
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  const [cursor, setCursor] = React.useState({ x: 0, y: 0 })

  const hovered = IRAN_PROVINCE_SHAPES.find(
    (province) => province.id === hoveredId
  )

  const select = (id: string) => {
    if (disabled) return
    setSelected(selected === id ? null : id)
  }

  const trackCursor = (event: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <div
      ref={wrapperRef}
      data-slot="iran-map-picker"
      className={cn("relative", className)}
    >
      <svg
        role="group"
        aria-disabled={disabled}
        viewBox={`0 0 ${IRAN_MAP_VIEWBOX.width} ${IRAN_MAP_VIEWBOX.height}`}
        className="w-full"
        onMouseMove={trackCursor}
        onMouseLeave={() => setHoveredId(null)}
      >
        {IRAN_PROVINCE_SHAPES.map((province) => {
          const isSelected = selected === province.id

          return (
            <path
              key={province.id}
              d={province.d}
              role="button"
              tabIndex={disabled ? undefined : 0}
              aria-label={`${province.fa} (${province.en})`}
              aria-pressed={isSelected}
              aria-disabled={disabled}
              data-slot="iran-map-province"
              data-selected={isSelected || undefined}
              onClick={() => select(province.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  select(province.id)
                }
              }}
              onMouseEnter={() => setHoveredId(province.id)}
              onFocus={() => setHoveredId(province.id)}
              onBlur={() =>
                setHoveredId((current) =>
                  current === province.id ? null : current
                )
              }
              className="cursor-pointer fill-muted stroke-background stroke-[1.5] transition-colors duration-150 outline-none hover:stroke-primary focus-visible:stroke-primary aria-disabled:pointer-events-none aria-disabled:opacity-60 data-[selected=true]:fill-primary data-[selected=true]:stroke-primary"
            />
          )
        })}
      </svg>
      {!disabled && hovered && (
        <div
          role="status"
          className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-md bg-foreground px-2.5 py-1 text-xs leading-5 whitespace-nowrap text-background shadow-md"
          style={{ left: cursor.x, top: cursor.y }}
        >
          {hovered.fa}
        </div>
      )}
    </div>
  )
}

export { IranMapPicker, IRAN_MAP_VIEWBOX, IRAN_PROVINCE_SHAPES }
