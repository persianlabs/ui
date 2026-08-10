"use client"

import type * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { useControllableState } from "@workspace/ui/hooks/use-controllable-state"
import { normalizePersianDigits } from "@workspace/ui/lib/normalize-persian-digits"
import { cn } from "@workspace/ui/lib/utils"

export interface PriceInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "value" | "defaultValue" | "onChange" | "type"
> {
  /** The numeric value. Use when controlled. */
  value?: number | null
  /** The initial numeric value when uncontrolled. */
  defaultValue?: number | null
  /** Called with the numeric value whenever it changes. */
  onValueChange?: (value: number | null) => void
  /** The minimum allowed value, applied on blur. */
  min?: number
  /** The maximum allowed value, applied on blur. */
  max?: number
  /** The locale used to group digits as you type. @default "en-US" */
  locale?: Intl.LocalesArgument
}

function clamp(value: number, min?: number, max?: number) {
  let next = value
  if (min !== undefined) next = Math.max(next, min)
  if (max !== undefined) next = Math.min(next, max)
  return next
}

function formatValue(value: number | null, locale: Intl.LocalesArgument) {
  if (value === null) return ""
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    value
  )
}

function countDigits(text: string) {
  return (text.match(/\d/g) ?? []).length
}

/** The index right after the Nth digit in `text` (commas/signs don't count). */
function offsetAfterDigitCount(text: string, digitCount: number) {
  if (digitCount <= 0) return 0

  let seen = 0
  for (let i = 0; i < text.length; i++) {
    if (/\d/.test(text.charAt(i))) {
      seen++
      if (seen === digitCount) return i + 1
    }
  }
  return text.length
}

/**
 * Deleting a thousands separator removes zero digits, so reformatting
 * would snap the text right back and the keystroke would visibly do
 * nothing. When that happens, extend the deletion to the nearest digit
 * in the same direction, so Delete/Backspace always removes one digit
 * no matter which character the caret sits next to.
 */
function extendDeletionToDigit(
  raw: string,
  cursor: number,
  direction: "forward" | "backward"
) {
  if (direction === "forward") {
    const after = raw.slice(cursor)
    const relativeIndex = after.search(/\d/)
    if (relativeIndex === -1) return raw
    const index = cursor + relativeIndex
    return raw.slice(0, index) + raw.slice(index + 1)
  }

  const before = raw.slice(0, cursor)
  const digitMatches = [...before.matchAll(/\d/g)]
  const lastDigit = digitMatches.at(-1)
  if (!lastDigit || lastDigit.index === undefined) return raw
  return raw.slice(0, lastDigit.index) + raw.slice(lastDigit.index + 1)
}

function PriceInput({
  value,
  defaultValue = null,
  onValueChange,
  min,
  max,
  locale = "en-US",
  placeholder = "0",
  className,
  onBlur,
  ...props
}: PriceInputProps) {
  const [numericValue, setNumericValue] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: "PriceInput",
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target
    const cursor = input.selectionStart ?? input.value.length
    let raw = normalizePersianDigits(input.value)

    const inputType = (event.nativeEvent as InputEvent).inputType
    const previousDigitCount =
      numericValue === null ? 0 : String(Math.abs(numericValue)).length
    let digits = raw.replace(/\D/g, "")

    if (
      (inputType === "deleteContentForward" ||
        inputType === "deleteContentBackward") &&
      digits.length === previousDigitCount
    ) {
      raw = extendDeletionToDigit(
        raw,
        cursor,
        inputType === "deleteContentForward" ? "forward" : "backward"
      )
      digits = raw.replace(/\D/g, "")
    }

    const digitsBeforeCursor = countDigits(raw.slice(0, cursor))
    const negative =
      min === undefined || min < 0 ? raw.trimStart().startsWith("-") : false

    if (!digits) {
      setNumericValue(null)
      return
    }

    const nextValue = (negative ? -1 : 1) * Number(digits)
    const formatted = formatValue(nextValue, locale)

    // Reformatting shifts thousands separators around, which would
    // otherwise reset the caret to the end of the input on every
    // keystroke — restore it based on digit count instead of raw offset.
    if (formatted !== input.value) {
      const nextPos = offsetAfterDigitCount(formatted, digitsBeforeCursor)
      input.value = formatted
      input.setSelectionRange(nextPos, nextPos)
    }

    setNumericValue(nextValue)
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (numericValue !== null) {
      const clamped = clamp(numericValue, min, max)
      if (clamped !== numericValue) setNumericValue(clamped)
    }
    onBlur?.(event)
  }

  return (
    <Input
      {...props}
      type="text"
      inputMode={min !== undefined && min >= 0 ? "numeric" : "text"}
      dir="ltr"
      value={formatValue(numericValue, locale)}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={cn("font-mono", className)}
    />
  )
}

export { PriceInput }
