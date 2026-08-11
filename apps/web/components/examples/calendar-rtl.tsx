"use client"

import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { formatDate } from "@workspace/ui/lib/persian-date"

export function CalendarRtlExample() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [today, setToday] = React.useState<Date | null>(null)

  React.useEffect(() => {
    const init = () => {
      const now = new Date()
      setToday(now)
      setDate(now)
    }
    init()
  }, [])

  if (!today) return null

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>انتخاب تاریخ نوبت</CardTitle>
        <CardDescription>
          {date
            ? formatDate(date, "EEEE d MMMM yyyy")
            : "یک روز را انتخاب کنید"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={today}
          className="p-0"
        />
      </CardContent>
    </Card>
  )
}
