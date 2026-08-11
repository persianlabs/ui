"use client"

import { CalendarIcon, ClockIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Calendar,
  type CalendarProps,
  type CalendarType,
} from "@/components/ui/calendar"
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
import {
  formatTimePickerValue,
  ResponsiveTimePicker,
  ResponsiveTimePickerContent,
  ResponsiveTimePickerTrigger,
  type TimePickerDigits,
  type TimePickerHourFormat,
  type TimePickerValue,
} from "@/components/ui/time-picker"
import { useMediaQuery } from "@/hooks/use-media-query"
import { formatDate } from "@/lib/persian-date"
import { cn } from "@/lib/utils"

export type DatePickerPresentation = "auto" | "popover" | "drawer"
export type DatePickerConfirmMode = "auto" | "immediate" | "explicit"
export type DatePickerDefaultValue = Date | "today" | null

export interface DateTimePickerValue {
  date: Date | null
  time: TimePickerValue
}

export type DatePickerCalendarProps = Omit<
  CalendarProps,
  | "mode"
  | "selected"
  | "onSelect"
  | "month"
  | "defaultMonth"
  | "onMonthChange"
  | "calendarType"
>

interface PickerShellProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  presentation?: DatePickerPresentation
  /** Width below which auto presentation uses a Drawer. @default 800 */
  mobileBreakpoint?: number
  disabled?: boolean
  className?: string
  contentClassName?: string
  drawerTitle?: string
}

export interface DatePickerProps extends PickerShellProps {
  value?: Date | null
  defaultValue?: DatePickerDefaultValue
  onValueChange?: (value: Date | null) => void
  /** @default "shamsi" */
  calendarType?: CalendarType
  /** @default "auto" — immediate in Popover, explicit in Drawer. */
  confirmMode?: DatePickerConfirmMode
  placeholder?: string
  format?: string
  confirmLabel?: string
  cancelLabel?: string
  calendarProps?: DatePickerCalendarProps
  renderTrigger?: (state: {
    value: Date | null
    formattedValue: string | null
    open: boolean
  }) => React.ReactElement
}

export interface DateTimePickerProps extends PickerShellProps {
  value?: DateTimePickerValue
  defaultValue?: {
    date?: DatePickerDefaultValue
    time?: TimePickerValue
  }
  onValueChange?: (value: DateTimePickerValue) => void
  /** @default "shamsi" */
  calendarType?: CalendarType
  dateFormat?: string
  hourFormat?: TimePickerHourFormat
  digits?: TimePickerDigits
  showSeconds?: boolean
  showTimeLabels?: boolean
  placeholder?: string
  timeLabel?: string
  confirmLabel?: string
  cancelLabel?: string
  calendarProps?: DatePickerCalendarProps
  renderTrigger?: (state: {
    value: DateTimePickerValue
    formattedValue: string | null
    open: boolean
  }) => React.ReactElement
}

const DEFAULT_TIME: TimePickerValue = { hour: 0, minute: 0 }

function resolveStaticDate(value: DatePickerDefaultValue | undefined) {
  return value instanceof Date ? value : null
}

function DatePicker({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  presentation = "auto",
  mobileBreakpoint = 800,
  calendarType = "shamsi",
  confirmMode = "auto",
  placeholder = "انتخاب تاریخ",
  format = "yyyy/MM/dd",
  confirmLabel = "تایید",
  cancelLabel = "انصراف",
  disabled,
  className,
  contentClassName,
  drawerTitle,
  calendarProps,
  renderTrigger,
}: DatePickerProps) {
  const isControlled = valueProp !== undefined
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(
    resolveStaticDate(defaultValue)
  )
  const value = isControlled ? valueProp : uncontrolledValue
  const [draft, setDraft] = React.useState<Date | null>(value)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen

  React.useEffect(() => {
    if (defaultValue !== "today" || isControlled) return
    const init = () => setUncontrolledValue((current) => current ?? new Date())
    init()
  }, [defaultValue, isControlled])

  React.useEffect(() => {
    if (open) return
    const sync = () => setDraft(value)
    sync()
  }, [open, value])

  const shell = usePickerShell({
    open,
    setOpen: (next) => {
      if (openProp === undefined) setUncontrolledOpen(next)
      onOpenChange?.(next)
      if (next) setDraft(value)
    },
    presentation,
    mobileBreakpoint,
  })
  const resolvedConfirmMode =
    confirmMode === "auto"
      ? shell.isDrawer
        ? "explicit"
        : "immediate"
      : confirmMode

  const commit = (next: Date | null) => {
    if (!isControlled) setUncontrolledValue(next)
    onValueChange?.(next)
  }
  const select = (next: Date | undefined) => {
    if (!next) return
    setDraft(next)
    if (resolvedConfirmMode === "immediate") {
      commit(next)
      shell.setOpen(false)
    }
  }
  const apply = () => {
    commit(draft)
    shell.setOpen(false)
  }
  const cancel = () => {
    setDraft(value)
    shell.setOpen(false)
  }
  const formattedValue = value
    ? formatDate(value, format, { calendarType })
    : null
  const trigger = renderTrigger?.({ value, formattedValue, open }) ?? (
    <Button
      variant="outline"
      disabled={disabled}
      className={cn("w-56 justify-start font-normal", className)}
    >
      <CalendarIcon className="size-4" />
      {formattedValue ?? placeholder}
    </Button>
  )
  const calendar = (
    <Calendar
      {...calendarProps}
      mode="single"
      calendarType={calendarType}
      selected={draft ?? undefined}
      onSelect={select}
      defaultMonth={draft ?? value ?? undefined}
      className={cn(
        "p-2",
        shell.isDrawer && "rounded-xl border bg-transparent",
        calendarProps?.className
      )}
    />
  )
  const actions = resolvedConfirmMode === "explicit" && (
    <PickerActions
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      onConfirm={apply}
      onCancel={cancel}
      confirmDisabled={!draft}
      showCancel={!shell.isDrawer}
    />
  )

  return shell.render({
    trigger,
    content: calendar,
    actions,
    contentClassName,
    title: drawerTitle ?? placeholder,
  })
}

function DateTimePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  presentation = "auto",
  mobileBreakpoint = 800,
  calendarType = "shamsi",
  dateFormat = "yyyy/MM/dd",
  hourFormat = "24",
  digits = "fa",
  showSeconds = false,
  showTimeLabels = false,
  placeholder = "انتخاب تاریخ و زمان",
  timeLabel = "انتخاب زمان",
  confirmLabel = "تایید",
  cancelLabel = "انصراف",
  disabled,
  className,
  contentClassName,
  drawerTitle,
  calendarProps,
  renderTrigger,
}: DateTimePickerProps) {
  const isControlled = valueProp !== undefined
  const initialValue: DateTimePickerValue = {
    date: resolveStaticDate(defaultValue?.date),
    time: defaultValue?.time ?? DEFAULT_TIME,
  }
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<DateTimePickerValue>(initialValue)
  const value = isControlled ? valueProp : uncontrolledValue
  const [draft, setDraft] = React.useState<DateTimePickerValue>(value)
  const [timeOpen, setTimeOpen] = React.useState(false)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen

  React.useEffect(() => {
    if (defaultValue?.date !== "today" || isControlled) return
    const init = () =>
      setUncontrolledValue((current) =>
        current.date ? current : { ...current, date: new Date() }
      )
    init()
  }, [defaultValue?.date, isControlled])

  React.useEffect(() => {
    if (open) return
    const sync = () => setDraft(value)
    sync()
  }, [open, value])

  const shell = usePickerShell({
    open,
    setOpen: (next) => {
      if (openProp === undefined) setUncontrolledOpen(next)
      onOpenChange?.(next)
      if (next) setDraft(value)
    },
    presentation,
    mobileBreakpoint,
  })
  const apply = () => {
    if (!isControlled) setUncontrolledValue(draft)
    onValueChange?.(draft)
    shell.setOpen(false)
  }
  const cancel = () => {
    setDraft(value)
    shell.setOpen(false)
  }
  const formattedValue = value.date
    ? `${formatDate(value.date, dateFormat, { calendarType })} - ${formatTimePickerValue(value.time, { hourFormat, showSeconds, digits })}`
    : null
  const trigger = renderTrigger?.({ value, formattedValue, open }) ?? (
    <Button
      variant="outline"
      disabled={disabled}
      className={cn("w-64 justify-start font-normal", className)}
    >
      <CalendarIcon className="size-4" />
      {formattedValue ?? placeholder}
    </Button>
  )
  const content = (
    <div className={cn("flex w-fit flex-col", shell.isDrawer && "gap-4")}>
      <Calendar
        {...calendarProps}
        mode="single"
        calendarType={calendarType}
        selected={draft.date ?? undefined}
        onSelect={(date) =>
          date && setDraft((current) => ({ ...current, date }))
        }
        defaultMonth={draft.date ?? value.date ?? undefined}
        className={cn(
          "p-2",
          shell.isDrawer && "rounded-xl border bg-transparent",
          calendarProps?.className
        )}
      />
      <div className={cn("w-full", shell.isDrawer ? "px-0" : "p-3 pt-1")}>
        <ResponsiveTimePicker open={timeOpen} onOpenChange={setTimeOpen}>
          <ResponsiveTimePickerTrigger
            render={
              <Button variant="outline" className="w-full justify-start">
                <ClockIcon className="size-4" />
                {timeLabel}
                <span className="ms-auto font-mono tabular-nums">
                  {formatTimePickerValue(draft.time, {
                    hourFormat,
                    showSeconds,
                    digits,
                  })}
                </span>
              </Button>
            }
          />
          <ResponsiveTimePickerContent
            value={draft.time}
            onValueChange={(time) =>
              setDraft((current) => ({ ...current, time }))
            }
            hourFormat={hourFormat}
            digits={digits}
            showSeconds={showSeconds}
            showLabels={showTimeLabels}
            drawerTitle={timeLabel}
            drawerConfirmLabel={confirmLabel}
            onDrawerConfirm={() => setTimeOpen(false)}
          />
        </ResponsiveTimePicker>
      </div>
    </div>
  )
  const actions = (
    <PickerActions
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      onConfirm={apply}
      onCancel={cancel}
      confirmDisabled={!draft.date}
      showCancel={!shell.isDrawer}
    />
  )

  return shell.render({
    trigger,
    content,
    actions,
    contentClassName,
    title: drawerTitle ?? placeholder,
  })
}

function PickerActions({
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  confirmDisabled,
  showCancel = true,
}: {
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
  confirmDisabled?: boolean
  showCancel?: boolean
}) {
  return (
    <>
      {showCancel && (
        <Button variant="outline" onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}
      <Button disabled={confirmDisabled} onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </>
  )
}

function usePickerShell({
  open,
  setOpen,
  presentation,
  mobileBreakpoint,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  presentation: DatePickerPresentation
  mobileBreakpoint: number
}) {
  const matchesMobile = useMediaQuery({ max: mobileBreakpoint })
  const isDrawer =
    presentation === "drawer" || (presentation === "auto" && matchesMobile)

  return {
    isDrawer,
    setOpen,
    render({
      trigger,
      content,
      actions,
      contentClassName,
      title,
    }: {
      trigger: React.ReactElement
      content: React.ReactNode
      actions: React.ReactNode
      contentClassName?: string
      title: string
    }) {
      if (isDrawer) {
        return (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
              render={
                trigger as React.ReactElement<
                  React.ComponentProps<typeof DrawerTrigger>
                >
              }
            />
            <DrawerPopup showBar>
              <DrawerTitle className="sr-only">{title}</DrawerTitle>
              <DrawerPanel
                scrollable
                className={cn("flex flex-col items-center", contentClassName)}
              >
                {content}
              </DrawerPanel>
              {actions && <DrawerFooter>{actions}</DrawerFooter>}
            </DrawerPopup>
          </Drawer>
        )
      }

      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={trigger} />
          <PopoverContent className={cn("w-auto p-0", contentClassName)}>
            {content}
            {actions && (
              <div className="flex justify-end gap-2 border-t border-border p-3">
                {actions}
              </div>
            )}
          </PopoverContent>
        </Popover>
      )
    },
  }
}

export { DatePicker, DateTimePicker }
