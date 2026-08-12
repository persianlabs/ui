"use client"

import { DayPicker as PersianDayPicker, faIR } from "@daypicker/persian"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import * as React from "react"
import {
  DayPicker as GregorianDayPicker,
  getDefaultClassNames,
} from "react-day-picker"
import { enUS } from "react-day-picker/locale"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  endOfMonth,
  isSameDay,
  startOfDay,
  startOfMonth,
  type CalendarType,
} from "@/lib/persian-date"
import {
  getHolidaysInRange,
  type ResolvedHoliday,
} from "@/lib/persian-holidays"
import { cn } from "@/lib/utils"

/**
 * "shamsi" renders the Jalali/Solar Hijri calendar via `@daypicker/persian`
 * (faIR locale, RTL, Persian numerals by default). "miladi" renders the
 * plain Gregorian calendar via `react-day-picker` (enUS locale, LTR, Latin
 * numerals).
 */
export type { CalendarType } from "@/lib/persian-date"

// A fixed, non-time-dependent placeholder month used only for the very first
// render (server + initial client) when the caller controls neither `month`
// nor `defaultMonth`. react-day-picker falls back to `new Date()` internally
// whenever both are absent, and reading the current date during render trips
// Next 16 Cache Components' "blocking prerender" guard. The real current
// month is swapped in client-side via an effect immediately after mount.
const DEFAULT_MONTH_FALLBACK = new Date(2024, 0, 1)

type GregorianDayPickerProps = React.ComponentProps<typeof GregorianDayPicker>
type PersianDayPickerProps = React.ComponentProps<typeof PersianDayPicker>

export type CalendarProps = GregorianDayPickerProps & {
  /** @default "shamsi" */
  calendarType?: CalendarType
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  /**
   * Highlights Iranian holidays (red text) for the visible month(s) and
   * shows a hover tooltip with the holiday's title and whether it's an
   * official day off or a commemorative occasion. Uses `persian-holidays`
   * internally. @default false
   */
  showHolidays?: boolean
}

function Calendar({
  calendarType = "shamsi",
  className,
  classNames,
  showOutsideDays,
  fixedWeeks = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  locale,
  dir,
  numerals,
  numberOfMonths,
  showHolidays = false,
  month,
  onMonthChange,
  modifiers,
  modifiersClassNames,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  // Tracks the visible month locally whenever the caller isn't already
  // controlling `month` (or hasn't supplied a static `defaultMonth`) so we
  // can snap the calendar to "today" once mounted, and so `showHolidays` has
  // a month to compute against. Deferred to an effect (not read at render
  // time) since "today" differs between server and client, and since
  // react-day-picker itself would otherwise read `new Date()` during render
  // -- see DEFAULT_MONTH_FALLBACK above.
  const [fallbackMonth, setFallbackMonth] = React.useState<Date | null>(null)
  React.useEffect(() => {
    if (month || props.defaultMonth) return
    const init = () => setFallbackMonth((current) => current ?? new Date())
    init()
  }, [month, props.defaultMonth])

  const visibleMonth = month ?? fallbackMonth ?? undefined
  const handleMonthChange = (nextMonth: Date) => {
    onMonthChange?.(nextMonth)
    if (!month) setFallbackMonth(nextMonth)
  }

  const holidays = React.useMemo(() => {
    if (!showHolidays || !visibleMonth) return []
    return getHolidaysInRange(
      startOfMonth(visibleMonth),
      endOfMonth(visibleMonth),
      { includeUnofficial: true }
    )
  }, [showHolidays, visibleMonth])

  // A day can carry both an official and an unofficial holiday at once, so
  // group by day first and let official win -- rather than assigning both
  // modifiers to the same date and leaving the result to CSS class order.
  const { officialHolidayDates, unofficialHolidayDates } = React.useMemo(() => {
    const officialByDay = new Map<number, boolean>()
    for (const holiday of holidays) {
      const key = startOfDay(holiday.date).getTime()
      officialByDay.set(
        key,
        (officialByDay.get(key) ?? false) || holiday.official
      )
    }
    const official: Date[] = []
    const unofficial: Date[] = []
    for (const [time, isOfficial] of officialByDay) {
      ;(isOfficial ? official : unofficial).push(new Date(time))
    }
    return {
      officialHolidayDates: official,
      unofficialHolidayDates: unofficial,
    }
  }, [holidays])

  const resolvedModifiers = showHolidays
    ? {
        ...modifiers,
        holidayOfficial: officialHolidayDates,
        holidayUnofficial: unofficialHolidayDates,
      }
    : modifiers
  const resolvedModifiersClassNames = showHolidays
    ? {
        ...modifiersClassNames,
        holidayOfficial: "text-destructive font-semibold",
        holidayUnofficial: "text-info font-semibold",
      }
    : modifiersClassNames

  const resolvedLocale = locale ?? (calendarType === "shamsi" ? faIR : enUS)
  const resolvedDir = dir ?? (calendarType === "shamsi" ? "rtl" : "ltr")
  const resolvedNumerals =
    numerals ?? (calendarType === "shamsi" ? "arabext" : "latn")
  // With multiple months shown side by side, each month's leading/trailing
  // "outside days" bleed into the adjacent month's grid, so the shared
  // boundary date (e.g. the 31st) visually appears twice. Defaulting outside
  // days off for multi-month layouts avoids that -- still overridable.
  const resolvedShowOutsideDays = showOutsideDays ?? true

  const dayPickerProps = {
    showOutsideDays: resolvedShowOutsideDays,
    fixedWeeks,
    numberOfMonths,
    ...(visibleMonth
      ? { month: visibleMonth }
      : { defaultMonth: DEFAULT_MONTH_FALLBACK }),
    onMonthChange: handleMonthChange,
    modifiers: resolvedModifiers,
    modifiersClassNames: resolvedModifiersClassNames,
    className: cn(
      "group/calendar bg-background p-3 [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(9)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
      // A Gregorian calendar retains its LTR grid by default, but it can be
      // placed within an RTL interface. Mirror only its arrow artwork in that
      // inherited RTL context; an explicit dir="rtl" is handled directly by
      // the Chevron component below.
      className
    ),
    captionLayout,
    locale: resolvedLocale,
    dir: resolvedDir,
    numerals: resolvedNumerals,
    formatters: {
      formatMonthDropdown: (date: Date) =>
        date.toLocaleString("default", { month: "short" }),
      ...formatters,
    },
    classNames: {
      root: cn("m-0 w-fit", defaultClassNames.root),
      months: cn(
        "relative flex flex-col gap-4 md:flex-row",
        defaultClassNames.months
      ),
      month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
      nav: cn(
        // Absolutely positioned and full-width so the prev/next buttons can
        // sit flush at either edge, but that leaves its empty middle
        // stretching across the whole caption row -- including right over
        // captionLayout="dropdown"'s month/year Select triggers, silently
        // eating their clicks before they ever reach the trigger underneath.
        // pointer-events-none here (re-enabled per-button below) lets clicks
        // pass through the empty middle instead of dead-ending on <nav>.
        "pointer-events-none absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
        defaultClassNames.nav
      ),
      button_previous: cn(
        buttonVariants({ variant: buttonVariant }),
        "pointer-events-auto size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
        defaultClassNames.button_previous
      ),
      button_next: cn(
        buttonVariants({ variant: buttonVariant }),
        "pointer-events-auto size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
        defaultClassNames.button_next
      ),
      month_caption: cn(
        "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
        defaultClassNames.month_caption
      ),
      dropdowns: cn(
        "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
        defaultClassNames.dropdowns
      ),
      caption_label: cn(
        "font-medium select-none",
        captionLayout === "label"
          ? "text-sm"
          : "flex h-8 items-center gap-1 rounded-md ps-2 pe-1 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
        defaultClassNames.caption_label
      ),
      month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
      weekdays: cn("flex", defaultClassNames.weekdays),
      weekday: cn(
        "flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
        defaultClassNames.weekday
      ),
      week: cn("mt-2 flex w-full", defaultClassNames.week),
      week_number_header: cn(
        "w-(--cell-size) select-none",
        defaultClassNames.week_number_header
      ),
      week_number: cn(
        "text-[0.8rem] text-muted-foreground select-none",
        defaultClassNames.week_number
      ),
      day: cn(
        "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:first-child[data-selected=true]_button]:rounded-s-md [&:last-child[data-selected=true]_button]:rounded-e-md",
        defaultClassNames.day
      ),
      range_start: cn("rounded-s-md bg-accent", defaultClassNames.range_start),
      range_middle: cn("rounded-none", defaultClassNames.range_middle),
      range_end: cn("rounded-e-md bg-accent", defaultClassNames.range_end),
      today: cn(
        "rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none data-[selected=true]:bg-transparent",
        defaultClassNames.today
      ),
      outside: cn(
        "text-muted-foreground aria-selected:text-muted-foreground",
        defaultClassNames.outside
      ),
      disabled: cn(
        "text-muted-foreground opacity-50",
        defaultClassNames.disabled
      ),
      hidden: cn("invisible", defaultClassNames.hidden),
      ...classNames,
    },
    components: {
      Root: ({
        className: rootClassName,
        rootRef,
        ...rootProps
      }: {
        className?: string
        rootRef?: React.Ref<HTMLDivElement>
      } & React.HTMLAttributes<HTMLDivElement>) => {
        return (
          <div
            data-slot="calendar"
            data-calendar-type={calendarType}
            ref={rootRef}
            className={cn(rootClassName)}
            {...rootProps}
          />
        )
      },
      Chevron: ({
        className: chevronClassName,
        orientation,
        ...chevronProps
      }: {
        className?: string
        orientation?: "up" | "down" | "left" | "right"
      } & React.SVGProps<SVGSVGElement>) => {
        if (orientation === "left") {
          const Icon =
            resolvedDir === "rtl" ? ChevronRightIcon : ChevronLeftIcon
          return (
            <Icon
              className={cn("size-4.5 sm:size-4", chevronClassName)}
              {...chevronProps}
            />
          )
        }

        if (orientation === "right") {
          const Icon =
            resolvedDir === "rtl" ? ChevronLeftIcon : ChevronRightIcon
          return (
            <Icon
              className={cn("size-4.5 sm:size-4", chevronClassName)}
              {...chevronProps}
            />
          )
        }

        return (
          <ChevronDownIcon
            className={cn("size-4", chevronClassName)}
            {...chevronProps}
          />
        )
      },
      DayButton: showHolidays
        ? (dayButtonProps: CalendarDayButtonProps) => (
            <HolidayDayButton {...dayButtonProps} holidays={holidays} />
          )
        : CalendarDayButton,
      Dropdown: CalendarDropdown,
      WeekNumber: ({
        children,
        ...weekNumberProps
      }: {
        children?: React.ReactNode
      } & React.ThHTMLAttributes<HTMLTableCellElement>) => {
        return (
          <td {...weekNumberProps}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        )
      },
      ...components,
    },
    ...props,
  }

  const picker =
    calendarType === "shamsi" ? (
      <PersianDayPicker
        {...(dayPickerProps as unknown as PersianDayPickerProps)}
      />
    ) : (
      <GregorianDayPicker {...(dayPickerProps as GregorianDayPickerProps)} />
    )

  const content = (
    <>
      {calendarType === "miladi" && dir !== "rtl" && (
        <style>{`[dir="rtl"] [data-calendar-type="miladi"] .rdp-button_previous svg,
[dir="rtl"] [data-calendar-type="miladi"] .rdp-button_next svg { transform: rotate(180deg); }`}</style>
      )}
      {picker}
    </>
  )

  return showHolidays ? (
    <TooltipProvider delay={150}>{content}</TooltipProvider>
  ) : (
    content
  )
}

interface CalendarDayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  day: { date: Date }
  modifiers: Record<string, boolean>
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: CalendarDayButtonProps) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-today={modifiers.today}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 text-base leading-none font-normal select-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 disabled:text-muted-foreground/72 disabled:line-through disabled:opacity-100 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-s-none data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-e-none data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[today=true]:after:pointer-events-none data-[today=true]:after:absolute data-[today=true]:after:inset-x-0 data-[today=true]:after:bottom-1 data-[today=true]:after:z-1 data-[today=true]:after:mx-auto data-[today=true]:after:size-[3px] data-[today=true]:after:rounded-full data-[today=true]:after:bg-primary data-[today=true]:after:content-[''] data-[today=true]:disabled:after:bg-foreground/30 data-[today=true]:data-[range-end=true]:after:bg-primary-foreground data-[today=true]:data-[range-start=true]:after:bg-primary-foreground data-[today=true]:data-[selected-single=true]:after:bg-primary-foreground sm:text-sm [&>span]:text-xs [&>span]:opacity-70",
        // The selected/range states above set bg-primary + text-primary-foreground on
        // the *base* class, but Button's own ghost variant also carries a plain
        // hover:bg-muted hover:text-foreground with the same specificity -- whichever
        // rule Tailwind happens to emit later in the stylesheet wins on hover,
        // regardless of selected state. That's what produced the white/black flicker
        // in dark mode (hovering a selected, white day could randomly flip it dark).
        // Force hover to keep showing the selected color instead of falling back to
        // ghost's generic hover. The `dark:hover:bg-muted/50` in Button's own ghost
        // variant is a compound (dark+hover) variant that outranks a plain
        // data-[x]:hover: override in Tailwind's generated stylesheet order in dark
        // mode specifically -- so the dark-mode-selected day silently fell back to
        // ghost's muted hover. Matching it with an equally-compound
        // dark:data-[x]:hover: override wins regardless of source order.
        "data-[selected-single=true]:hover:bg-primary data-[selected-single=true]:hover:text-primary-foreground dark:data-[selected-single=true]:hover:bg-primary dark:data-[selected-single=true]:hover:text-primary-foreground",
        "data-[range-start=true]:hover:bg-primary data-[range-start=true]:hover:text-primary-foreground dark:data-[range-start=true]:hover:bg-primary dark:data-[range-start=true]:hover:text-primary-foreground",
        "data-[range-end=true]:hover:bg-primary data-[range-end=true]:hover:text-primary-foreground dark:data-[range-end=true]:hover:bg-primary dark:data-[range-end=true]:hover:text-primary-foreground",
        "data-[range-middle=true]:hover:bg-accent data-[range-middle=true]:hover:text-accent-foreground dark:data-[range-middle=true]:hover:bg-accent dark:data-[range-middle=true]:hover:text-accent-foreground",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

interface HolidayDayButtonProps extends CalendarDayButtonProps {
  holidays: ResolvedHoliday[]
}

/** `showHolidays`'s DayButton: wraps CalendarDayButton with a hover tooltip on holiday cells. */
function HolidayDayButton({
  day,
  modifiers,
  holidays,
  ...props
}: HolidayDayButtonProps) {
  const dayHolidays = holidays.filter((holiday) =>
    isSameDay(holiday.date, day.date)
  )

  if (dayHolidays.length === 0) {
    return <CalendarDayButton day={day} modifiers={modifiers} {...props} />
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <CalendarDayButton day={day} modifiers={modifiers} {...props} />
        }
      />
      <TooltipContent className="flex flex-col items-start gap-1.5 py-2">
        {dayHolidays.map((holiday) => (
          <div key={holiday.title} className="flex items-start gap-1.5">
            <Badge
              // TooltipContent is intentionally inverted (bg-foreground/
              // text-background) relative to the page. Badge's "outline" and
              // "secondary" variants are tuned for a normal bg-background/
              // bg-popover surface (secondary is even a translucent black/
              // white overlay, same pitfall as bg-muted on a floating chip),
              // so they'd wash out or disappear here. "destructive" and
              // "info" are solid theme colors independent of that inversion,
              // so they stay readable on any surface.
              variant={holiday.official ? "destructive" : "info"}
              className="shrink-0 leading-5"
            >
              {holiday.official ? "تعطیل رسمی" : "مناسبت"}
            </Badge>
            <span className="leading-5">{holiday.title}</span>
          </div>
        ))}
      </TooltipContent>
    </Tooltip>
  )
}

interface CalendarDropdownOption {
  value: number
  label: string
  disabled: boolean
}

type CalendarDropdownProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "value" | "onChange"
> & {
  options?: CalendarDropdownOption[]
  value?: number
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

/**
 * Replaces react-day-picker's default native `<select>` (used for the month/
 * year captionLayout="dropdown" navigation) with this repo's own `Select`.
 * react-day-picker only reads `event.target.value` from `onChange`, so a
 * minimal synthetic event is enough to keep it fully in sync -- no need to
 * fork react-day-picker's internal month/year change handlers.
 */
function CalendarDropdown({
  options,
  value,
  onChange,
  disabled,
  className,
  "aria-label": ariaLabel,
}: CalendarDropdownProps) {
  return (
    <Select
      value={value != null ? String(value) : undefined}
      onValueChange={(next) => {
        onChange?.({
          target: { value: String(next) },
        } as React.ChangeEvent<HTMLSelectElement>)
      }}
      disabled={disabled}
      // SelectValue only knows how to resolve a label for the current value
      // via this `items` map -- without it, it falls back to rendering the
      // raw value ("4") instead of the option's label ("تیر").
      items={options?.map((option) => ({
        value: String(option.value),
        label: option.label,
      }))}
    >
      <SelectTrigger
        aria-label={ariaLabel}
        className={cn(
          "h-8 w-fit min-w-0 gap-1 border-none bg-transparent px-2 text-sm font-medium shadow-none hover:bg-muted data-[popup-open]:bg-muted",
          className
        )}
      >
        <SelectValue className="truncate" />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem
            key={option.value}
            value={String(option.value)}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { Calendar, CalendarDayButton, CalendarDropdown, HolidayDayButton }
