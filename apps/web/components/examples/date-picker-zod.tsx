"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  addYears,
  formatDate,
  toggleRangeSelection,
} from "@workspace/ui/lib/persian-date"
import {
  zPersianDate,
  zPersianDateRange,
} from "@workspace/ui/lib/persian-date-zod"

export function DatePickerZodExample() {
  const [today, setToday] = React.useState<Date | null>(null)
  const [appointment, setAppointment] = React.useState<Date | undefined>(
    undefined
  )
  const [stay, setStay] = React.useState<DateRange | undefined>(undefined)
  const [openAppointment, setOpenAppointment] = React.useState(false)
  const [openStay, setOpenStay] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  React.useEffect(() => {
    const init = () => setToday(new Date())
    init()
  }, [])

  if (!today) return null

  const appointmentSchema = zPersianDate({
    min: today,
    max: addYears(today, 1),
  })
  const staySchema = zPersianDateRange({
    minDays: 1,
    maxDays: 7,
    disablePast: true,
  })

  const appointmentResult = submitted
    ? appointmentSchema.safeParse(appointment)
    : null
  const stayResult = submitted
    ? staySchema.safeParse({ from: stay?.from, to: stay?.to })
    : null

  return (
    <div className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel>تاریخ نوبت</FieldLabel>
          <Popover open={openAppointment} onOpenChange={setOpenAppointment}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  <CalendarIcon className="size-4" />
                  {appointment
                    ? formatDate(appointment, "yyyy/MM/dd")
                    : "انتخاب تاریخ نوبت"}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={appointment}
                onSelect={(value) => {
                  setAppointment(value)
                  setOpenAppointment(false)
                }}
                defaultMonth={appointment ?? today}
                disabled={{ before: today }}
                className="p-2"
              />
            </PopoverContent>
          </Popover>
          {appointmentResult && (
            <FieldDescription
              className={
                appointmentResult.success
                  ? "text-emerald-500"
                  : "text-destructive"
              }
            >
              {appointmentResult.success
                ? `معتبر — ${formatDate(appointmentResult.data, "yyyy/MM/dd")}`
                : appointmentResult.error.issues[0]?.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>بازه اقامت</FieldLabel>
          <Popover open={openStay} onOpenChange={setOpenStay}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  <CalendarIcon className="size-4" />
                  {stay?.from
                    ? stay.to
                      ? `${formatDate(stay.from, "yyyy/MM/dd")} تا ${formatDate(stay.to, "yyyy/MM/dd")}`
                      : formatDate(stay.from, "yyyy/MM/dd")
                    : stay?.to
                      ? `— تا ${formatDate(stay.to, "yyyy/MM/dd")}`
                      : "انتخاب بازه اقامت"}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={stay?.from ? stay : undefined}
                modifiers={
                  !stay?.from && stay?.to ? { range_end: stay.to } : undefined
                }
                onSelect={(_next, day) =>
                  setStay((current) =>
                    toggleRangeSelection(current ?? { from: undefined }, day)
                  )
                }
                defaultMonth={today}
                disabled={[
                  { before: today },
                  ...(!stay?.from && stay?.to ? [{ after: stay.to }] : []),
                  ...(stay?.from && !stay.to ? [{ before: stay.from }] : []),
                ]}
                className="p-2"
              />
            </PopoverContent>
          </Popover>
          {stayResult && (
            <FieldDescription
              className={
                stayResult.success ? "text-emerald-500" : "text-destructive"
              }
            >
              {stayResult.success
                ? "بازه انتخابی معتبر است."
                : `نامعتبر: ${stayResult.error.issues[0]?.message}`}
            </FieldDescription>
          )}
        </Field>

        <Button type="button" onClick={() => setSubmitted(true)}>
          ثبت رزرو
        </Button>
      </FieldGroup>
    </div>
  )
}
