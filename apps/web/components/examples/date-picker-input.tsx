"use client"

import { CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import { Input } from "@workspace/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  formatDate,
  parseDate,
  toLatinDigits,
  toPersianDigits,
} from "@workspace/ui/lib/persian-date"

// Every field in "yyyy/MM/dd" is explicit, so parseDate's referenceDate
// never actually affects the result -- pass a fixed value instead of
// relying on the default `new Date()`, which would make this depend on
// the current time.
const EPOCH = new Date(0)

export function DatePickerInputExample() {
  const [text, setText] = React.useState("")
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  function handleTextChange(value: string) {
    // Left as typed (no live digit conversion) so the cursor and keystrokes
    // stay predictable while the user is still typing -- normalized to a
    // consistent digit style once they're done, in handleCommit below.
    setText(value)
    const parsed = parseDate(toLatinDigits(value), "yyyy/MM/dd", EPOCH)
    if (parsed) setDate(parsed)
  }

  function handleCommit() {
    setText((current) =>
      current ? toPersianDigits(toLatinDigits(current)) : current
    )
  }

  function handleSelect(value: Date | undefined) {
    setDate(value)
    setText(value ? formatDate(value, "yyyy/MM/dd") : "")
    setOpen(false)
  }

  return (
    <div className="flex w-64 items-center gap-1.5">
      <Input
        dir="ltr"
        value={text}
        onChange={(event) => handleTextChange(event.target.value)}
        onBlur={handleCommit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleCommit()
            event.currentTarget.blur()
          }
        }}
        placeholder="1405/05/19"
        className="font-mono"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon" aria-label="باز کردن تقویم">
              <CalendarIcon className="size-4" />
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            defaultMonth={date}
            className="p-2"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
