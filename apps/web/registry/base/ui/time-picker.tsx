"use client"

import { CheckIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerFooter,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { WheelPickerOption } from "@/components/ui/wheel-picker"
import { WheelPicker, WheelPickerWrapper } from "@/components/ui/wheel-picker"
import { useIsMobile } from "@/hooks/use-media-query"
import { toPersianDigits, type DigitStyle } from "@/lib/persian-date"
import { cn } from "@/lib/utils"

/** Time-of-day value. Plain fields, not a `Date` -- a clock has no calendar date. */
export interface TimePickerValue {
  hour: number
  minute: number
  second?: number
}

/** Mirrors persian-date's `DigitStyle`, kept local so this file has no digit-only dependency on it. */
export type TimePickerDigits = DigitStyle

export type TimePickerHourFormat = "24" | "12"

const DEFAULT_VALUE: TimePickerValue = { hour: 0, minute: 0 }

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function pad(value: number): string {
  return value.toString().padStart(2, "0")
}

function label(value: number, digits: TimePickerDigits): string {
  const text = pad(value)
  return digits === "fa" ? toPersianDigits(text) : text
}

function to12Hour(hour: number): { hour12: number; period: "AM" | "PM" } {
  const period: "AM" | "PM" = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return { hour12, period }
}

function from12Hour(hour12: number, period: "AM" | "PM"): number {
  const base = hour12 % 12
  return period === "PM" ? base + 12 : base
}

function periodOptions(
  digits: TimePickerDigits
): WheelPickerOption<"AM" | "PM">[] {
  return digits === "fa"
    ? [
        { label: "ق.ظ", value: "AM" },
        { label: "ب.ظ", value: "PM" },
      ]
    : [
        { label: "AM", value: "AM" },
        { label: "PM", value: "PM" },
      ]
}

/** Formats a `TimePickerValue` for display, e.g. "09:30" or "09:30 ب.ظ". */
export function formatTimePickerValue(
  value: TimePickerValue,
  options: {
    hourFormat?: TimePickerHourFormat
    showSeconds?: boolean
    digits?: TimePickerDigits
  } = {}
): string {
  const hourFormat = options.hourFormat ?? "24"
  const showSeconds = options.showSeconds ?? false
  const digits = options.digits ?? "fa"

  const second = value.second ?? 0
  const parts: string[] = []

  if (hourFormat === "12") {
    const { hour12, period } = to12Hour(value.hour)
    parts.push(label(hour12, digits))
    parts.push(label(value.minute, digits))
    if (showSeconds) parts.push(label(second, digits))
    const periodLabel = periodOptions(digits).find(
      (o) => o.value === period
    )?.label
    return `${parts.join(":")} ${periodLabel}`
  }

  parts.push(label(value.hour, digits))
  parts.push(label(value.minute, digits))
  if (showSeconds) parts.push(label(second, digits))
  return parts.join(":")
}

export interface TimePickerProps {
  /** Current value in controlled mode. */
  value?: TimePickerValue
  /** Initial value in uncontrolled mode. @default { hour: 0, minute: 0 } */
  defaultValue?: TimePickerValue
  onValueChange?: (value: TimePickerValue) => void
  /** Adds a seconds wheel. @default false */
  showSeconds?: boolean
  /** Shows h, m, and s labels above their wheel columns. @default false */
  showLabels?: boolean
  /** 24-hour or 12-hour (with an AM/PM wheel) display. @default "24" */
  hourFormat?: TimePickerHourFormat
  /** Wheel label digit style. @default "fa" */
  digits?: TimePickerDigits
  className?: string
}

function TimePicker({
  value: valueProp,
  defaultValue = DEFAULT_VALUE,
  onValueChange,
  showSeconds = false,
  showLabels = false,
  hourFormat = "24",
  digits = "fa",
  className,
}: TimePickerProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<TimePickerValue>(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolledValue

  const setValue = React.useCallback(
    (next: TimePickerValue) => {
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const hourOptions = React.useMemo<WheelPickerOption<number>[]>(() => {
    if (hourFormat === "12") {
      return Array.from({ length: 12 }, (_, index) => {
        const hour12 = index + 1
        return { label: label(hour12, digits), value: hour12 }
      })
    }
    return Array.from({ length: 24 }, (_, hour) => ({
      label: label(hour, digits),
      value: hour,
    }))
  }, [hourFormat, digits])

  const minuteOptions = React.useMemo<WheelPickerOption<number>[]>(
    () =>
      Array.from({ length: 60 }, (_, minute) => ({
        label: label(minute, digits),
        value: minute,
      })),
    [digits]
  )

  const secondOptions = minuteOptions

  const { hour12, period } = to12Hour(value.hour)
  const second = clamp(value.second ?? 0, 0, 59)

  return (
    <div className={cn("flex flex-col", className)}>
      {showLabels && (
        <div
          aria-hidden="true"
          dir="ltr"
          className="grid auto-cols-fr grid-flow-col px-1 pb-1 text-center text-xs text-muted-foreground"
        >
          <span>h</span>
          <span>m</span>
          {showSeconds && <span>s</span>}
          {hourFormat === "12" && <span>AM/PM</span>}
        </div>
      )}
      <WheelPickerWrapper>
        <WheelPicker
          options={hourOptions}
          value={hourFormat === "12" ? hour12 : value.hour}
          onValueChange={(nextHour) => {
            const hour =
              hourFormat === "12" ? from12Hour(nextHour, period) : nextHour
            setValue({ ...value, hour })
          }}
          infinite
        />
        <WheelPicker
          options={minuteOptions}
          value={value.minute}
          onValueChange={(minute) => setValue({ ...value, minute })}
          infinite
        />
        {showSeconds && (
          <WheelPicker
            options={secondOptions}
            value={second}
            onValueChange={(nextSecond) =>
              setValue({ ...value, second: nextSecond })
            }
            infinite
          />
        )}
        {hourFormat === "12" && (
          <WheelPicker
            options={periodOptions(digits)}
            value={period}
            onValueChange={(nextPeriod) =>
              setValue({ ...value, hour: from12Hour(hour12, nextPeriod) })
            }
          />
        )}
      </WheelPickerWrapper>
    </div>
  )
}

/**
 * A responsive wrapper around TimePicker: a Popover trigger + content on
 * desktop, a Drawer trigger + panel on mobile. Follows the same
 * root/trigger/content composition as ResponsiveDialog and ResponsiveMenu.
 *
 * Note: Base UI's `render` prop only picks up children placed *inside* the
 * render target, not children passed to the wrapping trigger --
 * `<ResponsiveTimePickerTrigger render={<Button/>}>{icon}</ResponsiveTimePickerTrigger>`
 * silently renders an empty button. Put trigger content on the target
 * element itself instead: `<ResponsiveTimePickerTrigger render={<Button>{icon}</Button>} />`.
 */
type ResponsiveTimePickerContextValue = { isDesktop: boolean }

const ResponsiveTimePickerContext =
  React.createContext<ResponsiveTimePickerContextValue | null>(null)

function useResponsiveTimePickerContext() {
  const context = React.useContext(ResponsiveTimePickerContext)
  if (!context) {
    throw new Error(
      "ResponsiveTimePicker components must be used within <ResponsiveTimePicker>"
    )
  }
  return context
}

type ResponsiveTimePickerProps = {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function ResponsiveTimePicker({
  children,
  open,
  defaultOpen,
  onOpenChange,
}: ResponsiveTimePickerProps) {
  const isDesktop = !useIsMobile()
  const contextValue = React.useMemo(() => ({ isDesktop }), [isDesktop])

  return (
    <ResponsiveTimePickerContext.Provider value={contextValue}>
      {isDesktop ? (
        <Popover
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children}
        </Popover>
      ) : (
        <Drawer
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children}
        </Drawer>
      )}
    </ResponsiveTimePickerContext.Provider>
  )
}

function ResponsiveTimePickerTrigger(
  props: React.ComponentProps<typeof PopoverTrigger>
) {
  const { isDesktop } = useResponsiveTimePickerContext()
  return isDesktop ? (
    <PopoverTrigger {...props} />
  ) : (
    <DrawerTrigger {...(props as React.ComponentProps<typeof DrawerTrigger>)} />
  )
}

type ResponsiveTimePickerContentProps = TimePickerProps & {
  align?: React.ComponentProps<typeof PopoverContent>["align"]
  side?: React.ComponentProps<typeof PopoverContent>["side"]
  sideOffset?: number
  drawerTitle?: React.ReactNode
  drawerConfirmLabel?: React.ReactNode
  onDrawerConfirm?: () => void
}

function ResponsiveTimePickerContent({
  align = "center",
  side = "bottom",
  sideOffset = 6,
  drawerTitle = "انتخاب زمان",
  drawerConfirmLabel,
  onDrawerConfirm,
  className,
  ...timePickerProps
}: ResponsiveTimePickerContentProps) {
  const { isDesktop } = useResponsiveTimePickerContext()

  if (isDesktop) {
    return (
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-auto p-3"
      >
        {onDrawerConfirm && (
          <div dir="ltr" className="mb-1 flex w-full justify-end">
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={
                typeof drawerConfirmLabel === "string"
                  ? drawerConfirmLabel
                  : "تایید زمان"
              }
              onClick={onDrawerConfirm}
            >
              <CheckIcon />
            </Button>
          </div>
        )}
        <TimePicker className={className} {...timePickerProps} />
      </PopoverContent>
    )
  }

  return (
    <DrawerPopup showBar>
      <DrawerTitle className="sr-only">{drawerTitle}</DrawerTitle>
      <DrawerPanel
        scrollable={false}
        className={cn("flex items-center justify-center pb-8")}
      >
        <TimePicker className={className} {...timePickerProps} />
      </DrawerPanel>
      {drawerConfirmLabel && (
        <DrawerFooter>
          <Button className="w-full" onClick={onDrawerConfirm}>
            {drawerConfirmLabel}
          </Button>
        </DrawerFooter>
      )}
    </DrawerPopup>
  )
}

export {
  ResponsiveTimePicker,
  ResponsiveTimePickerContent,
  ResponsiveTimePickerTrigger,
  TimePicker,
}
