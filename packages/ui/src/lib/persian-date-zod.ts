import { parseISO } from "date-fns"
import { z } from "zod"

import {
  isAfter,
  isBefore,
  isValidDate,
  parseDate,
  validateRange,
  type RangeValidationOptions,
} from "@workspace/ui/lib/persian-date"

/** Matches an ISO-8601 date, e.g. "2026-08-10" or "2026-08-10T12:00:00Z". */
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}/

/** A fixed, non-time-dependent stand-in for parseDate's referenceDate. */
const EPOCH = new Date(0)

/** Anything zPersianDate can coerce: an ISO string, a "yyyy/MM/dd" shamsi string, an epoch number, or a Date. */
export type PersianDateInput = string | number | Date

function coerceToDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return isValidDate(value) ? value : null
  }

  if (typeof value === "number") {
    const date = new Date(value)
    return isValidDate(date) ? date : null
  }

  if (typeof value === "string") {
    // Try a strict ISO-8601 string first (Gregorian), then fall back to a
    // "yyyy/MM/dd" shamsi string -- the two most common serialized forms.
    // Deliberately not `new Date(value)`: its native parsing is dangerously
    // lenient and will happily misinterpret "1405/05/19" as some other date
    // instead of rejecting it, silently producing the wrong result.
    if (ISO_DATE_PATTERN.test(value)) {
      const iso = parseISO(value)
      if (isValidDate(iso)) return iso
    }
    // Every field is explicit in "yyyy/MM/dd", so referenceDate never
    // actually affects the result -- pass a fixed value instead of relying
    // on parseDate's `new Date()` default, which would otherwise make this
    // function's output depend on the current time (and break SSR/prerender
    // for any caller that runs it synchronously during render).
    return parseDate(value, "yyyy/MM/dd", EPOCH)
  }

  return null
}

export interface ZPersianDateOptions {
  /** Inclusive lower bound. Accepts anything zPersianDate itself accepts. */
  min?: PersianDateInput
  /** Inclusive upper bound. Accepts anything zPersianDate itself accepts. */
  max?: PersianDateInput
}

/**
 * A zod schema that accepts an ISO-8601 string, a "yyyy/MM/dd" shamsi string,
 * an epoch number, or a native Date, and outputs a plain `Date`. `min`/`max`
 * bounds are inclusive.
 */
export function zPersianDate(options: ZPersianDateOptions = {}) {
  const minDate = options.min != null ? coerceToDate(options.min) : undefined
  const maxDate = options.max != null ? coerceToDate(options.max) : undefined

  return z.custom<PersianDateInput>().transform((value, ctx): Date => {
    const date = coerceToDate(value)

    if (!date) {
      ctx.addIssue({ code: "custom", message: "Invalid date" })
      return z.NEVER
    }

    if (minDate && isBefore(date, minDate)) {
      ctx.addIssue({
        code: "custom",
        message: `Date must be on or after ${minDate.toISOString()}`,
      })
      return z.NEVER
    }

    if (maxDate && isAfter(date, maxDate)) {
      ctx.addIssue({
        code: "custom",
        message: `Date must be on or before ${maxDate.toISOString()}`,
      })
      return z.NEVER
    }

    return date
  })
}

/**
 * A zod schema for a `{ from, to }` reservation-style range, validated with
 * the same rules as `validateRange` from persian-date (ordering, minDays,
 * maxDays, disablePast, disabledDates). The failure reason is attached to
 * the `to` field.
 */
export function zPersianDateRange(options: RangeValidationOptions = {}) {
  return z
    .object({
      from: zPersianDate(),
      to: zPersianDate(),
    })
    .superRefine((value, ctx) => {
      const reason = validateRange(value, options)
      if (reason) {
        ctx.addIssue({ code: "custom", message: reason, path: ["to"] })
      }
    })
}
