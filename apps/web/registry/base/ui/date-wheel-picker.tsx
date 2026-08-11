"use client"

import * as React from "react"

import {
  Drawer,
  DrawerPanel,
  DrawerPopup,
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
import {
  daysInMonth,
  formatDate,
  fromParts,
  toParts,
  toPersianDigits,
  type CalendarType,
  type DigitStyle,
} from "@/lib/persian-date"
import { cn } from "@/lib/utils"

/** Mirrors persian-date's `DigitStyle`, kept local so this file has no digit-only dependency on it. */
export type DateWheelPickerDigits = DigitStyle

const DEFAULT_MIN_YEAR: Record<CalendarType, number> = {
  shamsi: 1300,
  miladi: 1921,
}

const DEFAULT_MAX_YEAR: Record<CalendarType, number> = {
  shamsi: 1450,
  miladi: 2071,
}

// A fixed, non-"today" default -- reading the current date at module load or
// in a bare useState initializer would embed whatever date the server
// happened to build/start at, which can differ from whatever date the client
// happens to hydrate at and trigger a hydration mismatch. Nowruz 1403 is an
// arbitrary, static stand-in; consumers that actually want "today" as the
// initial value should compute it themselves, deferred via useEffect (see
// the Demo example on the doc page), not rely on this component to do it.
const DEFAULT_VALUE = fromParts({ year: 1403, month: 1, day: 1 }, "shamsi")

function label(value: number, digits: DateWheelPickerDigits): string {
  const text = String(value)
  return digits === "fa" ? toPersianDigits(text) : text
}

export interface DateWheelPickerProps {
  /** Current value in controlled mode. */
  value?: Date
  /** Initial value in uncontrolled mode. @default 1403/01/01 (Nowruz) */
  defaultValue?: Date
  onValueChange?: (date: Date) => void
  /** @default "shamsi" */
  calendarType?: CalendarType
  /** Wheel label digit style. @default "fa" */
  digits?: DateWheelPickerDigits
  /** Lower bound of the year wheel, in `calendarType`'s years. @default 1300 (shamsi) / 1921 (miladi) */
  minYear?: number
  /** Upper bound of the year wheel, in `calendarType`'s years. @default 1450 (shamsi) / 2071 (miladi) */
  maxYear?: number
  /**
   * Interval between year wheel options, e.g. 5 for a decade-jump picker.
   * When greater than 1, `value`/`defaultValue`'s year must land on the
   * stepped sequence (`minYear + n * yearStep`) to be selectable.
   * @default 1
   */
  yearStep?: number
  /**
   * Whether the wheels loop past their ends (December back to January, the
   * last day of the month back to the 1st, the last year back to the
   * first). @default false
   */
  loop?: boolean
  className?: string
}

function DateWheelPicker({
  value: valueProp,
  defaultValue = DEFAULT_VALUE,
  onValueChange,
  calendarType = "shamsi",
  digits = "fa",
  minYear,
  maxYear,
  yearStep = 1,
  loop = false,
  className,
}: DateWheelPickerProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<Date>(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolledValue

  const setValue = React.useCallback(
    (next: Date) => {
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const resolvedMinYear = minYear ?? DEFAULT_MIN_YEAR[calendarType]
  const resolvedMaxYear = maxYear ?? DEFAULT_MAX_YEAR[calendarType]

  const parts = toParts(value, calendarType)

  const yearOptions = React.useMemo<WheelPickerOption<number>[]>(() => {
    const years: WheelPickerOption<number>[] = []
    for (
      let year = resolvedMinYear;
      year <= resolvedMaxYear;
      year += yearStep
    ) {
      years.push({ label: label(year, digits), value: year })
    }
    return years
  }, [resolvedMinYear, resolvedMaxYear, yearStep, digits])

  const monthOptions = React.useMemo<WheelPickerOption<number>[]>(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const month = index + 1
      const sample = fromParts(
        { year: parts.year, month, day: 1 },
        calendarType
      )
      return {
        label: formatDate(sample, "MMMM", { calendarType, digits }),
        value: month,
      }
    })
  }, [parts.year, calendarType, digits])

  const dayCount = daysInMonth(
    fromParts({ year: parts.year, month: parts.month, day: 1 }, calendarType),
    calendarType
  )

  const dayOptions = React.useMemo<WheelPickerOption<number>[]>(
    () =>
      Array.from({ length: dayCount }, (_, index) => {
        const day = index + 1
        return { label: label(day, digits), value: day }
      }),
    [dayCount, digits]
  )

  const day = Math.min(parts.day, dayCount)

  function handleYearChange(nextYear: number) {
    const nextDayCount = daysInMonth(
      fromParts({ year: nextYear, month: parts.month, day: 1 }, calendarType),
      calendarType
    )
    setValue(
      fromParts(
        {
          year: nextYear,
          month: parts.month,
          day: Math.min(day, nextDayCount),
        },
        calendarType
      )
    )
  }

  function handleMonthChange(nextMonth: number) {
    const nextDayCount = daysInMonth(
      fromParts({ year: parts.year, month: nextMonth, day: 1 }, calendarType),
      calendarType
    )
    setValue(
      fromParts(
        {
          year: parts.year,
          month: nextMonth,
          day: Math.min(day, nextDayCount),
        },
        calendarType
      )
    )
  }

  function handleDayChange(nextDay: number) {
    setValue(
      fromParts(
        { year: parts.year, month: parts.month, day: nextDay },
        calendarType
      )
    )
  }

  return (
    <WheelPickerWrapper className={cn("min-w-72", className)}>
      <WheelPicker
        options={yearOptions}
        value={parts.year}
        onValueChange={handleYearChange}
        infinite={loop}
        classNames={{ optionItem: "tabular-nums" }}
      />
      <WheelPicker
        options={monthOptions}
        value={parts.month}
        onValueChange={handleMonthChange}
        infinite={loop}
        classNames={{ optionItem: "truncate px-1" }}
      />
      <WheelPicker
        options={dayOptions}
        value={day}
        onValueChange={handleDayChange}
        infinite={loop}
        classNames={{ optionItem: "tabular-nums" }}
      />
    </WheelPickerWrapper>
  )
}

/**
 * A responsive wrapper around DateWheelPicker: a Popover trigger + content on
 * desktop, a Drawer trigger + panel on mobile. Follows the same
 * root/trigger/content composition as ResponsiveTimePicker, ResponsiveDialog,
 * and ResponsiveMenu.
 *
 * Note: Base UI's `render` prop only picks up children placed *inside* the
 * render target, not children passed to the wrapping trigger --
 * `<ResponsiveDateWheelPickerTrigger render={<Button/>}>{icon}</ResponsiveDateWheelPickerTrigger>`
 * silently renders an empty button. Put trigger content on the target
 * element itself instead: `<ResponsiveDateWheelPickerTrigger render={<Button>{icon}</Button>} />`.
 */
type ResponsiveDateWheelPickerContextValue = { isDesktop: boolean }

const ResponsiveDateWheelPickerContext =
  React.createContext<ResponsiveDateWheelPickerContextValue | null>(null)

function useResponsiveDateWheelPickerContext() {
  const context = React.useContext(ResponsiveDateWheelPickerContext)
  if (!context) {
    throw new Error(
      "ResponsiveDateWheelPicker components must be used within <ResponsiveDateWheelPicker>"
    )
  }
  return context
}

type ResponsiveDateWheelPickerProps = {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function ResponsiveDateWheelPicker({
  children,
  open,
  defaultOpen,
  onOpenChange,
}: ResponsiveDateWheelPickerProps) {
  const isDesktop = !useIsMobile()
  const contextValue = React.useMemo(() => ({ isDesktop }), [isDesktop])

  return (
    <ResponsiveDateWheelPickerContext.Provider value={contextValue}>
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
    </ResponsiveDateWheelPickerContext.Provider>
  )
}

function ResponsiveDateWheelPickerTrigger(
  props: React.ComponentProps<typeof PopoverTrigger>
) {
  const { isDesktop } = useResponsiveDateWheelPickerContext()
  return isDesktop ? (
    <PopoverTrigger {...props} />
  ) : (
    <DrawerTrigger {...(props as React.ComponentProps<typeof DrawerTrigger>)} />
  )
}

type ResponsiveDateWheelPickerContentProps = DateWheelPickerProps & {
  align?: React.ComponentProps<typeof PopoverContent>["align"]
  side?: React.ComponentProps<typeof PopoverContent>["side"]
  sideOffset?: number
}

function ResponsiveDateWheelPickerContent({
  align = "center",
  side = "bottom",
  sideOffset = 6,
  className,
  ...dateWheelPickerProps
}: ResponsiveDateWheelPickerContentProps) {
  const { isDesktop } = useResponsiveDateWheelPickerContext()

  if (isDesktop) {
    return (
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-auto p-3"
      >
        <DateWheelPicker className={className} {...dateWheelPickerProps} />
      </PopoverContent>
    )
  }

  return (
    <DrawerPopup showBar>
      <DrawerPanel
        scrollable={false}
        className={cn("flex items-center justify-center pb-8")}
      >
        <DateWheelPicker className={className} {...dateWheelPickerProps} />
      </DrawerPanel>
    </DrawerPopup>
  )
}

export {
  DateWheelPicker,
  ResponsiveDateWheelPicker,
  ResponsiveDateWheelPickerContent,
  ResponsiveDateWheelPickerTrigger,
}
