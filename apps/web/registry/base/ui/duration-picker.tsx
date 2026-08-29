"use client"

import { getSvgPath } from "figma-squircle"
import { interpolate } from "flubber"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type MotionStyle,
  type MotionValue,
} from "motion/react"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import useMeasure from "react-use-measure"

import {
  useRender,
  type UseRenderComponentProps,
} from "@base-ui/react/use-render"

import { cn } from "@/lib/utils"

const PEN_PATH =
  "M3.78181 16.3092L3 21L7.69086 20.2182C8.50544 20.0825 9.25725 19.6956 9.84119 19.1116L20.4198 8.53288C21.1934 7.75922 21.1934 6.5049 20.4197 5.73126L18.2687 3.58024C17.495 2.80658 16.2406 2.80659 15.4669 3.58027L4.88841 14.159C4.30447 14.7429 3.91757 15.4947 3.78181 16.3092Z"
const TICK_PATH =
  "M7.959 20.513L1.592 12.872L3.128 11.592L8.041 17.487L20.947 3.587L22.413 4.948L7.959 20.513Z"

const OPEN_GAP = 8
const CORNER_RADIUS = 12
// Snappier than the upstream constants (stiffness 200 / damping 28): higher
// stiffness with a touch less mass removes the perceived lag on split/merge
// while the damping ratio keeps the gooey overshoot.
const GAP_SPRING = { stiffness: 380, damping: 30, mass: 0.9 }
const ICON_SPRING = { stiffness: 400, damping: 32 }
const WIDTH_SPRING = { stiffness: 400, damping: 32 }
const SWAY_SPRING = { stiffness: 320, damping: 26 }
// Slightly higher damping than upstream (9) so the clamp shake settles fast
// instead of jittering after the correction.
const ERROR_SPRING = { stiffness: 700, damping: 14 }

export type DurationValue = {
  hours: number
  minutes: number
}

export type DurationPickerProps = Omit<
  React.ComponentProps<"div">,
  | "onChange"
  | "defaultValue"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
> & {
  value?: DurationValue
  defaultValue?: DurationValue
  onChange?: (value: DurationValue) => void
  onConfirm?: (value: DurationValue) => void
  onEditingChange?: (editing: boolean) => void
  defaultEditing?: boolean
  maxHours?: number
  maxMinutes?: number
  hoursLabel?: string
  minutesLabel?: string
  disabled?: boolean
  /** Force the text direction instead of auto-detecting it from the nearest `[dir]` ancestor. */
  dir?: "ltr" | "rtl"
}

type SquircleSegmentProps = {
  asChild?: boolean
  cornerSmoothing?: number
  leftRadius: number | MotionValue<number>
  rightRadius: number | MotionValue<number>
  className?: string
  style?: MotionStyle
  children: React.ReactNode
}

const radiusValue = (radius: number | MotionValue<number>) =>
  typeof radius === "number" ? radius : radius.get()

/**
 * Base UI equivalent of Radix's Slot — renders a single child element with the
 * incoming props/ref merged into it (event handlers, className, and style are
 * joined; other props overwrite the child's). Backed by `useRender`.
 */
function Slot({
  children,
  ...props
}: UseRenderComponentProps<"span"> & { children: React.ReactNode }) {
  const child = React.Children.only(children) as React.ReactElement<{
    ref?: React.Ref<unknown>
  }>

  return useRender({
    render: child,
    defaultTagName: "span",
    props,
  })
}

const MotionSlot = motion.create(Slot)

const SquircleSegment = ({
  asChild = false,
  cornerSmoothing = 1,
  leftRadius,
  rightRadius,
  className,
  style,
  children,
}: SquircleSegmentProps) => {
  const [ref, bounds] = useMeasure()
  const width = useMotionValue(0)
  const height = useMotionValue(0)
  const Component = asChild ? MotionSlot : motion.div

  useEffect(() => {
    width.set(bounds.width)
    height.set(bounds.height)
  }, [bounds.width, bounds.height, width, height])

  const clipPath = useTransform(() => {
    const w = width.get()
    const h = height.get()
    if (w <= 0 || h <= 0) {
      return "none"
    }
    const left = radiusValue(leftRadius)
    const right = radiusValue(rightRadius)
    const path = getSvgPath({
      width: w,
      height: h,
      topLeftCornerRadius: left,
      bottomLeftCornerRadius: left,
      topRightCornerRadius: right,
      bottomRightCornerRadius: right,
      cornerSmoothing,
    })
    return `path('${path}')`
  })

  return (
    <Component
      data-slot="duration-picker-segment"
      ref={ref}
      className={className}
      style={{ ...style, clipPath }}
    >
      {children}
    </Component>
  )
}

type DurationFieldProps = {
  value: string
  onValueChange: (value: string) => void
  max: number
  isEditing: boolean
  shouldReduceMotion: boolean
  disabled?: boolean
  swayX: MotionValue<number>
  inputRef?: React.RefObject<HTMLInputElement | null>
}

const DurationField = ({
  value,
  onValueChange,
  max,
  isEditing,
  shouldReduceMotion,
  disabled,
  swayX,
  inputRef,
}: DurationFieldProps) => {
  const measureRef = useRef<HTMLSpanElement>(null)
  const [textWidth, setTextWidth] = useState(0)
  const errorX = useSpring(0, ERROR_SPRING)
  const x = useTransform(() => swayX.get() + errorX.get())

  useLayoutEffect(() => {
    if (measureRef.current) {
      setTextWidth(measureRef.current.offsetWidth)
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    if (next !== "" && (Number(next) > max || Number(next) < 0)) {
      onValueChange(String(Math.min(max, Math.max(0, Number(next)))))
      if (!shouldReduceMotion) {
        errorX.jump(6)
        errorX.set(0)
      }
      return
    }
    onValueChange(next)
  }

  const collapsedWidth = Math.max(textWidth + 12, 22)

  return (
    <>
      <motion.input
        data-slot="duration-picker-input"
        ref={inputRef}
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={isEditing ? "" : "0"}
        readOnly={!isEditing}
        disabled={disabled}
        dir="ltr"
        style={{ x, width: isEditing ? 44 : collapsedWidth }}
        animate={{ width: isEditing ? 44 : collapsedWidth }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", ...WIDTH_SPRING }
        }
        className="h-full [appearance:textfield] text-center font-semibold text-black outline-none dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span
        ref={measureRef}
        aria-hidden
        className="invisible absolute text-center font-semibold whitespace-pre"
      >
        {value || "0"}
      </span>
    </>
  )
}

const clampField = (raw: number, max: number) =>
  Math.min(max, Math.max(0, Math.trunc(raw) || 0))

function DurationPicker({
  value,
  defaultValue,
  onChange,
  onConfirm,
  onEditingChange,
  defaultEditing = false,
  maxHours = 24,
  maxMinutes = 60,
  hoursLabel = "Hr.",
  minutesLabel = "Min.",
  disabled = false,
  className,
  dir,
  ...props
}: DurationPickerProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const isControlled = value !== undefined
  const [isEditing, setIsEditing] = useState(defaultEditing)
  const [hoursText, setHoursText] = useState(() =>
    fieldText(value ?? defaultValue, "hours")
  )
  const [minutesText, setMinutesText] = useState(() =>
    fieldText(value ?? defaultValue, "minutes")
  )
  // Auto-detect the direction from the nearest ancestor with a dir attribute
  // (so an RTL wrapper is respected, not just <html>); the explicit `dir`
  // prop wins when given.
  const [detectedDir, setDetectedDir] = useState<"ltr" | "rtl">("ltr")
  const isRtl = dir ? dir === "rtl" : detectedDir === "rtl"

  useEffect(() => {
    const init = () => {
      let el: HTMLElement | null = rootRef.current
      while (el) {
        const d = el.getAttribute("dir")
        if (d) {
          setDetectedDir(d === "rtl" ? "rtl" : "ltr")
          return
        }
        el = el.parentElement
      }
      const root = document.documentElement.getAttribute("dir")
      setDetectedDir(root === "rtl" ? "rtl" : "ltr")
    }
    init()
  }, [])

  useEffect(() => {
    if (!isControlled) {
      return
    }
    if (
      clampField(Number(hoursText), maxHours) !==
      clampField(value.hours, maxHours)
    ) {
      setHoursText(fieldText(value, "hours"))
    }
    if (
      clampField(Number(minutesText), maxMinutes) !==
      clampField(value.minutes, maxMinutes)
    ) {
      setMinutesText(fieldText(value, "minutes"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlled, value?.hours, value?.minutes, maxHours, maxMinutes])

  const toValue = (hours: string, minutes: string): DurationValue => ({
    hours: clampField(Number(hours), maxHours),
    minutes: clampField(Number(minutes), maxMinutes),
  })

  const handleHoursChange = (text: string) => {
    setHoursText(text)
    onChange?.(toValue(text, minutesText))
  }

  const handleMinutesChange = (text: string) => {
    setMinutesText(text)
    onChange?.(toValue(hoursText, text))
  }

  const shouldReduceMotion = useReducedMotion()
  const gap = useSpring(defaultEditing ? OPEN_GAP : 0, GAP_SPRING)
  const openness = (v: number) => Math.min(OPEN_GAP, Math.max(0, v)) / OPEN_GAP

  const segmentSpacing = useTransform(
    gap,
    (v) => `${Math.min(OPEN_GAP, Math.max(0, v)) - (1 - openness(v))}px`
  )
  const innerRadius = useTransform(gap, (v) => CORNER_RADIUS * openness(v))
  const innerPad = useTransform(gap, (v) => `${Math.round(9 * openness(v))}px`)
  const gapVelocity = useVelocity(gap)
  const swayXRaw = useTransform(gapVelocity, [-70, 0, 70], [-3, 0, 3], {
    clamp: true,
  })
  const swayX = useSpring(swayXRaw, SWAY_SPRING)
  const iconProgress = useSpring(defaultEditing ? 1 : 0, ICON_SPRING)
  const iconPath = useTransform(iconProgress, [0, 1], [PEN_PATH, TICK_PATH], {
    clamp: true,
    mixer: (from, to) => interpolate(from, to, { maxSegmentLength: 1 }),
  })
  const iconStrokeWidth = useTransform(iconProgress, [0, 1], [0, 2.5], {
    clamp: true,
  })
  const iconStrokeOpacity = useTransform(iconProgress, [0, 1], [0, 1], {
    clamp: true,
  })
  const iconDashOpacity = useTransform(iconProgress, [0, 0.4], [1, 0], {
    clamp: true,
  })
  const hoursInputRef = useRef<HTMLInputElement>(null)

  const toggleEdit = () => {
    if (disabled) {
      return
    }
    const next = !isEditing
    const targetGap = next ? OPEN_GAP : 0
    const targetIcon = next ? 1 : 0
    if (shouldReduceMotion) {
      gap.jump(targetGap)
      iconProgress.jump(targetIcon)
    } else {
      gap.set(targetGap)
      iconProgress.set(targetIcon)
    }
    setIsEditing(next)
    onEditingChange?.(next)
    if (next) {
      hoursInputRef.current?.focus()
    } else {
      onConfirm?.(toValue(hoursText, minutesText))
    }
  }

  // Physical radii flip under RTL so the outer squircle corners always land on
  // the extreme outer edges of the pill. Flex reverses the DOM order under
  // dir=rtl, so the toggle becomes the leftmost segment (rounded outer start,
  // sharp inner end) and the hours segment the rightmost (sharp inner start,
  // rounded outer end); the middle minutes segment stays inner-radius on both.
  const segmentMargin = { marginInlineEnd: segmentSpacing }

  return (
    <motion.div
      ref={rootRef}
      data-slot="duration-picker"
      data-editing={isEditing || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "flex flex-row items-center justify-center text-card-foreground",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <SquircleSegment
        leftRadius={isRtl ? innerRadius : CORNER_RADIUS}
        rightRadius={isRtl ? CORNER_RADIUS : innerRadius}
        style={{ ...segmentMargin, paddingInlineEnd: innerPad }}
        className="flex h-12 items-center gap-1 bg-[#F4F4F9] ps-2 dark:bg-[#262626]"
      >
        <DurationField
          value={hoursText}
          onValueChange={handleHoursChange}
          max={maxHours}
          isEditing={isEditing}
          shouldReduceMotion={!!shouldReduceMotion}
          disabled={disabled}
          swayX={swayX}
          inputRef={hoursInputRef}
        />
        <motion.span
          style={{ x: swayX }}
          className="font-semibold text-[#868593]/70"
        >
          {hoursLabel}
        </motion.span>
      </SquircleSegment>

      <SquircleSegment
        leftRadius={innerRadius}
        rightRadius={innerRadius}
        style={{
          ...segmentMargin,
          paddingInlineStart: innerPad,
          paddingInlineEnd: innerPad,
        }}
        className="flex h-12 items-center gap-1 bg-[#F4F4F9] dark:bg-[#262626]"
      >
        <DurationField
          value={minutesText}
          onValueChange={handleMinutesChange}
          max={maxMinutes}
          isEditing={isEditing}
          shouldReduceMotion={!!shouldReduceMotion}
          disabled={disabled}
          swayX={swayX}
        />
        <motion.span
          style={{ x: swayX }}
          className="font-medium text-[#868593]/70"
        >
          {minutesLabel}
        </motion.span>
      </SquircleSegment>

      <SquircleSegment
        asChild
        leftRadius={isRtl ? CORNER_RADIUS : innerRadius}
        rightRadius={isRtl ? innerRadius : CORNER_RADIUS}
        className="h-12 w-12"
      >
        <button
          data-slot="duration-picker-toggle"
          type="button"
          onClick={toggleEdit}
          disabled={disabled}
          aria-label={isEditing ? "Save duration" : "Edit duration"}
          className="flex h-12 w-12 items-center justify-center rounded-[inherit] bg-[#F4F4F9] transition-transform duration-100 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.96] disabled:active:scale-100 dark:bg-[#262626]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <motion.path
              fill="#868593"
              stroke="#868593"
              strokeWidth={0}
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                strokeWidth: iconStrokeWidth,
                strokeOpacity: iconStrokeOpacity,
              }}
              d={iconPath}
            />
            <motion.path
              d="M14 6L18 10"
              fill="none"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="stroke-[#F4F4F9] dark:stroke-[#262626]"
              style={{ opacity: iconDashOpacity }}
            />
          </svg>
        </button>
      </SquircleSegment>
    </motion.div>
  )
}

function fieldText(
  value: DurationValue | undefined,
  field: keyof DurationValue
) {
  const n = value?.[field]
  return n === undefined || n === 0 ? "" : String(n)
}

export { DurationPicker }
export default DurationPicker
