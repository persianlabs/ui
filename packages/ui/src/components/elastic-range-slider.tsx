"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"

import { useControllableState } from "@workspace/ui/hooks/use-controllable-state"
import { cn } from "@workspace/ui/lib/utils"

// Drag detection & rubber band (only at the absolute min/max edges — the
// two thumbs clamping against each other is a hard boundary, not elastic).
const CLICK_THRESHOLD = 3
const DEAD_ZONE = 32
const MAX_CURSOR_RANGE = 200
const MAX_STRETCH = 8

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

function decimalsForStep(step: number): number {
  const s = step.toString()
  const dot = s.indexOf(".")
  return dot === -1 ? 0 : s.length - dot - 1
}

function roundValue(val: number, step: number): number {
  const raw = Math.round(val / step) * step
  return parseFloat(raw.toFixed(decimalsForStep(step)))
}

type Thumb = "min" | "max"

export type ElasticRangeSliderProps = {
  /** Label shown at the start of the track. */
  label: string

  /** Controlled [min, max] value. Use together with `onValueChange` */
  value?: [number, number]
  /** Initial [min, max] value for uncontrolled mode. Falls back to `[min, max]` */
  defaultValue?: [number, number]
  /** Called with the new [min, max] on drag, click, or key press. */
  onValueChange?: (value: [number, number]) => void

  /**
   * Minimum value.
   * @defaultValue 0 */
  min?: number
  /**
   * Maximum value.
   * @defaultValue 100 */
  max?: number
  /**
   * Smallest increment.
   * @defaultValue 1 */
  step?: number
  /** Format each displayed value. Defaults to `value.toFixed(...)` based on `step` */
  formatValue?: (value: number) => string

  className?: string
  /** Accessible name for the lower thumb. @defaultValue "Minimum" */
  minThumbLabel?: string
  /** Accessible name for the upper thumb. @defaultValue "Maximum" */
  maxThumbLabel?: string
}

export function ElasticRangeSlider({
  label,

  value: valueProp,
  defaultValue,
  onValueChange,

  min: absoluteMin = 0,
  max: absoluteMax = 100,
  step = 1,
  formatValue,

  className,
  minThumbLabel = "Minimum",
  maxThumbLabel = "Maximum",
}: ElasticRangeSliderProps) {
  const [range = [absoluteMin, absoluteMax], setRange] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [absoluteMin, absoluteMax],
    onChange: onValueChange,
  })
  const [min, max] = range

  const shouldReduceMotion = useReducedMotion()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [keyboardFocusThumb, setKeyboardFocusThumb] = useState<Thumb | null>(
    null
  )
  const isActive = isHovered || isDragging

  // Pointer session state — mutable, does not trigger re-renders.
  const draggingThumb = useRef<Thumb | null>(null)
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null)
  const isClickRef = useRef(true)
  const wrapperRectRef = useRef<DOMRect | null>(null)
  const scaleRef = useRef(1)
  const minAnimRef = useRef<ReturnType<typeof animate> | null>(null)
  const maxAnimRef = useRef<ReturnType<typeof animate> | null>(null)

  const percentFromValue = useCallback(
    (v: number) => ((v - absoluteMin) / (absoluteMax - absoluteMin)) * 100,
    [absoluteMin, absoluteMax]
  )

  const displayMin = formatValue
    ? formatValue(min)
    : min.toFixed(decimalsForStep(step))
  const displayMax = formatValue
    ? formatValue(max)
    : max.toFixed(decimalsForStep(step))

  // Each thumb gets its own motion value so drags stay perfectly in sync
  // frame-to-frame, instead of both re-deriving from combined React state.
  const minPercent = useMotionValue(percentFromValue(min))
  const maxPercent = useMotionValue(percentFromValue(max))
  const minLeft = useTransform(
    minPercent,
    (pct) => `max(4px, min(calc(100% - 8px), calc(${pct}% - 4px)))`
  )
  const maxLeft = useTransform(
    maxPercent,
    (pct) => `max(4px, min(calc(100% - 8px), calc(${pct}% - 4px)))`
  )
  const fillLeft = useTransform(minPercent, (pct) => `${pct}%`)
  const fillRight = useTransform(maxPercent, (pct) => `${100 - pct}%`)

  // Rubber band at the absolute edges only.
  const rubberStretch = useMotionValue(0)
  const rubberWidth = useTransform(
    rubberStretch,
    (s) => `calc(100% + ${Math.abs(s)}px)`
  )
  const rubberX = useTransform(rubberStretch, (s) => (s < 0 ? s : 0))

  // Sync from props when not actively dragging that thumb.
  useEffect(() => {
    if (draggingThumb.current !== "min" && !minAnimRef.current) {
      minPercent.jump(percentFromValue(min))
    }
  }, [min, percentFromValue, minPercent])

  useEffect(() => {
    if (draggingThumb.current !== "max" && !maxAnimRef.current) {
      maxPercent.jump(percentFromValue(max))
    }
  }, [max, percentFromValue, maxPercent])

  const positionToValue = useCallback(
    (clientX: number) => {
      const rect = wrapperRectRef.current
      if (!rect) return absoluteMin

      const sceneX = (clientX - rect.left) / scaleRef.current
      const nativeWidth = wrapperRef.current?.offsetWidth ?? rect.width
      const percent = clamp(sceneX / nativeWidth, 0, 1)

      return clamp(
        absoluteMin + percent * (absoluteMax - absoluteMin),
        absoluteMin,
        absoluteMax
      )
    },
    [absoluteMin, absoluteMax]
  )

  const animateThumbTo = useCallback(
    (thumb: Thumb, targetPercent: number) => {
      const motionValue = thumb === "min" ? minPercent : maxPercent
      const animRef = thumb === "min" ? minAnimRef : maxAnimRef

      animRef.current?.stop()

      if (shouldReduceMotion) {
        motionValue.jump(targetPercent)
        animRef.current = null
        return
      }

      animRef.current = animate(motionValue, targetPercent, {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
        onComplete: () => {
          animRef.current = null
        },
      })
    },
    [minPercent, maxPercent, shouldReduceMotion]
  )

  const computeRubberStretch = useCallback((clientX: number, sign: number) => {
    const rect = wrapperRectRef.current
    if (!rect) return 0

    const distancePast = sign < 0 ? rect.left - clientX : clientX - rect.right
    const overflow = Math.max(0, distancePast - DEAD_ZONE)

    return (
      sign * MAX_STRETCH * Math.sqrt(Math.min(overflow / MAX_CURSOR_RANGE, 1))
    )
  }, [])

  const handlePointerDown = useCallback((thumb: Thumb) => {
    return (e: React.PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)

      pointerDownPos.current = { x: e.clientX, y: e.clientY }
      isClickRef.current = true
      draggingThumb.current = thumb
      setIsDragging(true)
      setKeyboardFocusThumb(null)

      const wrapper = wrapperRef.current
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        wrapperRectRef.current = rect
        scaleRef.current = rect.width / wrapper.offsetWidth
      }
    }
  }, [])

  const handleTrackPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const wrapper = wrapperRef.current
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        wrapperRectRef.current = rect
        scaleRef.current = rect.width / wrapper.offsetWidth
      }

      const value = positionToValue(e.clientX)
      const thumb: Thumb =
        Math.abs(value - min) <= Math.abs(value - max) ? "min" : "max"

      pointerDownPos.current = { x: e.clientX, y: e.clientY }
      isClickRef.current = true
      draggingThumb.current = thumb
      setIsDragging(true)
      setKeyboardFocusThumb(null)
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [positionToValue, min, max]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const thumb = draggingThumb.current
      if (!thumb || !pointerDownPos.current) return

      const dx = e.clientX - pointerDownPos.current.x
      const dy = e.clientY - pointerDownPos.current.y
      if (isClickRef.current && Math.hypot(dx, dy) > CLICK_THRESHOLD) {
        isClickRef.current = false
      }
      if (isClickRef.current) return

      const rect = wrapperRectRef.current
      if (rect && !shouldReduceMotion) {
        // The min thumb only rubber-bands past the left edge (absoluteMin);
        // the max thumb only past the right edge (absoluteMax). Dragging
        // toward the other thumb is a hard clamp, not elastic.
        if (thumb === "min" && e.clientX < rect.left) {
          rubberStretch.jump(computeRubberStretch(e.clientX, -1))
        } else if (thumb === "max" && e.clientX > rect.right) {
          rubberStretch.jump(computeRubberStretch(e.clientX, 1))
        } else {
          rubberStretch.jump(0)
        }
      }

      const value = roundValue(positionToValue(e.clientX), step)
      const motionValue = thumb === "min" ? minPercent : maxPercent
      const animRef = thumb === "min" ? minAnimRef : maxAnimRef
      animRef.current?.stop()
      animRef.current = null
      motionValue.jump(percentFromValue(value))

      setRange(([currentMin, currentMax]) =>
        thumb === "min"
          ? [clamp(value, absoluteMin, currentMax), currentMax]
          : [currentMin, clamp(value, currentMin, absoluteMax)]
      )
    },
    [
      positionToValue,
      percentFromValue,
      setRange,
      step,
      absoluteMin,
      absoluteMax,
      minPercent,
      maxPercent,
      rubberStretch,
      computeRubberStretch,
      shouldReduceMotion,
    ]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      const thumb = draggingThumb.current
      if (!thumb) return

      if (isClickRef.current) {
        const rawValue = positionToValue(e.clientX)
        const snapped =
          thumb === "min"
            ? clamp(roundValue(rawValue, step), absoluteMin, max)
            : clamp(roundValue(rawValue, step), min, absoluteMax)

        animateThumbTo(thumb, percentFromValue(snapped))
        setRange(([currentMin, currentMax]) =>
          thumb === "min" ? [snapped, currentMax] : [currentMin, snapped]
        )
      } else {
        // Snap the dragged value to the step grid on release.
        const current = thumb === "min" ? min : max
        const snapped = roundValue(current, step)
        if (snapped !== current) {
          animateThumbTo(thumb, percentFromValue(snapped))
          setRange(([currentMin, currentMax]) =>
            thumb === "min" ? [snapped, currentMax] : [currentMin, snapped]
          )
        }
      }

      if (!shouldReduceMotion && rubberStretch.get() !== 0) {
        animate(rubberStretch, 0, {
          type: "spring",
          visualDuration: 0.35,
          bounce: 0.15,
        })
      }

      draggingThumb.current = null
      pointerDownPos.current = null
      setIsDragging(false)
    },
    [
      positionToValue,
      percentFromValue,
      animateThumbTo,
      setRange,
      min,
      max,
      step,
      absoluteMin,
      absoluteMax,
      rubberStretch,
      shouldReduceMotion,
    ]
  )

  const handleKeyDown = useCallback(
    (thumb: Thumb) => (e: React.KeyboardEvent) => {
      const arrowStep = e.shiftKey ? step * 10 : step

      let next: number | null = null
      const current = thumb === "min" ? min : max

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = current + arrowStep
          break
        case "ArrowLeft":
        case "ArrowDown":
          next = current - arrowStep
          break
        case "Home":
          next = thumb === "min" ? absoluteMin : min
          break
        case "End":
          next = thumb === "min" ? max : absoluteMax
          break
        default:
          return
      }

      e.preventDefault()
      setKeyboardFocusThumb(thumb)

      const bounds: [number, number] =
        thumb === "min" ? [absoluteMin, max] : [min, absoluteMax]
      const snapped = clamp(roundValue(next, step), bounds[0], bounds[1])

      animateThumbTo(thumb, percentFromValue(snapped))
      setRange(([currentMin, currentMax]) =>
        thumb === "min" ? [snapped, currentMax] : [currentMin, snapped]
      )
    },
    [
      step,
      min,
      max,
      absoluteMin,
      absoluteMax,
      animateThumbTo,
      percentFromValue,
      setRange,
    ]
  )

  return (
    <div
      ref={wrapperRef}
      data-slot="elastic-range-slider"
      className={cn(
        "[--elastic-slider-height:--spacing(9)] [--elastic-slider-radius:var(--radius-lg)]",
        "[--elastic-slider-bg:var(--muted)]",
        "[--elastic-slider-fill:var(--muted-foreground)]/10",
        "[--elastic-slider-fill-active:var(--muted-foreground)]/20",
        "[--elastic-slider-handle:var(--foreground)]",
        "[--elastic-slider-label:var(--muted-foreground)]",
        "[--elastic-slider-focus:var(--foreground)]",
        "relative h-(--elastic-slider-height)",
        className
      )}
    >
      <motion.div
        ref={trackRef}
        data-slot="elastic-slider-track"
        data-active={isActive}
        className="group/elastic-slider absolute inset-0 touch-none overflow-hidden rounded-(--elastic-slider-radius) bg-(--elastic-slider-bg) select-none"
        style={{ width: rubberWidth, x: rubberX }}
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          data-slot="elastic-slider-fill"
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 bg-(--elastic-slider-fill) transition-colors group-data-[active=true]/elastic-slider:bg-(--elastic-slider-fill-active)"
          style={{
            left: fillLeft,
            right: fillRight,
          }}
        />

        <motion.div
          role="slider"
          tabIndex={0}
          data-slot="elastic-slider-handle"
          data-focus-visible={keyboardFocusThumb === "min"}
          aria-label={minThumbLabel}
          aria-valuemin={absoluteMin}
          aria-valuemax={max}
          aria-valuenow={min}
          aria-valuetext={displayMin}
          onPointerDown={handlePointerDown("min")}
          onKeyDown={handleKeyDown("min")}
          onFocus={() => setKeyboardFocusThumb("min")}
          onBlur={() => setKeyboardFocusThumb(null)}
          className="absolute top-1/2 h-5 w-1 -translate-y-1/2 cursor-pointer touch-none rounded-full bg-(--elastic-slider-handle) opacity-0 transition-opacity outline-none group-data-[active=true]/elastic-slider:opacity-50 data-[focus-visible=true]:opacity-80 data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-ring/50"
          style={{ left: minLeft, y: "-50%" }}
        />
        <motion.div
          role="slider"
          tabIndex={0}
          data-slot="elastic-slider-handle"
          data-focus-visible={keyboardFocusThumb === "max"}
          aria-label={maxThumbLabel}
          aria-valuemin={min}
          aria-valuemax={absoluteMax}
          aria-valuenow={max}
          aria-valuetext={displayMax}
          onPointerDown={handlePointerDown("max")}
          onKeyDown={handleKeyDown("max")}
          onFocus={() => setKeyboardFocusThumb("max")}
          onBlur={() => setKeyboardFocusThumb(null)}
          className="absolute top-1/2 h-5 w-1 -translate-y-1/2 cursor-pointer touch-none rounded-full bg-(--elastic-slider-handle) opacity-0 transition-opacity outline-none group-data-[active=true]/elastic-slider:opacity-50 data-[focus-visible=true]:opacity-80 data-[focus-visible=true]:ring-2 data-[focus-visible=true]:ring-ring/50"
          style={{ left: maxLeft, y: "-50%" }}
        />

        <span
          data-slot="elastic-slider-label"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 inline-flex -translate-y-1/2 items-center text-sm/none font-medium text-(--elastic-slider-label) transition-colors"
        >
          {label}
        </span>

        <span
          data-slot="elastic-slider-value"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-sm/none font-medium text-(--elastic-slider-label) transition-colors group-data-[active=true]/elastic-slider:text-(--elastic-slider-focus)"
        >
          {displayMin} – {displayMax}
        </span>
      </motion.div>
    </div>
  )
}
