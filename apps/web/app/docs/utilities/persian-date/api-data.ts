import type { ApiReferenceRow } from "@/components/api-reference"

export const formattingParsingApi: ApiReferenceRow[] = [
  {
    prop: "formatDate(date, pattern, options?)",
    type: "(date: Date | number, pattern: string, options?: DateOptions) => string",
    description:
      "Formats a date using date-fns tokens (yyyy/MM/dd, EEEE d MMMM, ...), switching between the Jalali and Gregorian calendars via calendarType.",
  },
  {
    prop: "parseDate(value, pattern, referenceDate?, options?)",
    type: "(value: string, pattern: string, referenceDate?: Date | number, options?: DateOptions) => Date | null",
    description:
      "Parses a date string against a date-fns pattern. Normalizes Persian/Arabic-Indic digits before parsing. Returns null instead of an invalid Date on failure.",
  },
  {
    prop: "isValidDate(value)",
    type: "(value: unknown) => value is Date",
    description: "True if value is a valid, non-NaN Date.",
  },
]

export const conversionApi: ApiReferenceRow[] = [
  {
    prop: "toParts(date, calendarType?)",
    type: '(date: Date, calendarType?: CalendarType) => DateParts',
    default: '"shamsi"',
    description: "Reads a date's calendar fields (1-indexed month) in the given calendar.",
  },
  {
    prop: "fromParts(parts, calendarType?)",
    type: "(parts: DateParts, calendarType?: CalendarType) => Date",
    default: '"shamsi"',
    description: "Builds a Date (at local midnight) from calendar fields (1-indexed month).",
  },
  {
    prop: "toShamsi(date)",
    type: "(date: Date) => DateParts",
    description: 'Shorthand for toParts(date, "shamsi").',
  },
  {
    prop: "toMiladi(date)",
    type: "(date: Date) => DateParts",
    description: 'Shorthand for toParts(date, "miladi").',
  },
  {
    prop: "fromShamsi(parts)",
    type: "(parts: DateParts) => Date",
    description: 'Shorthand for fromParts(parts, "shamsi").',
  },
  {
    prop: "fromMiladi(parts)",
    type: "(parts: DateParts) => Date",
    description: 'Shorthand for fromParts(parts, "miladi").',
  },
]

export const arithmeticApi: ApiReferenceRow[] = [
  {
    prop: "today()",
    type: "() => Date",
    description: "Local midnight of the current date.",
  },
  {
    prop: "now()",
    type: "() => Date",
    description: "The current date and time.",
  },
  {
    prop: "addDays(date, amount)",
    type: "(date: Date, amount: number) => Date",
    description: "Adds calendar-independent days to date.",
  },
  {
    prop: "addWeeks(date, amount)",
    type: "(date: Date, amount: number) => Date",
    description: "Adds calendar-independent weeks to date.",
  },
  {
    prop: "addMonths(date, amount, calendarType?)",
    type: "(date: Date, amount: number, calendarType?: CalendarType) => Date",
    default: '"shamsi"',
    description: "Adds months; month length is resolved in the given calendar.",
  },
  {
    prop: "addYears(date, amount, calendarType?)",
    type: "(date: Date, amount: number, calendarType?: CalendarType) => Date",
    default: '"shamsi"',
    description: "Adds years; year length is resolved in the given calendar.",
  },
  {
    prop: "startOfDay(date) / endOfDay(date)",
    type: "(date: Date) => Date",
    description: "Local midnight, or the last instant of the day.",
  },
  {
    prop: "startOfWeek(date, calendarType?) / endOfWeek(date, calendarType?)",
    type: "(date: Date, calendarType?: CalendarType) => Date",
    default: '"shamsi"',
    description: "Week starts on Saturday for shamsi, Sunday for miladi.",
  },
  {
    prop: "startOfMonth(date, calendarType?) / endOfMonth(date, calendarType?)",
    type: "(date: Date, calendarType?: CalendarType) => Date",
    default: '"shamsi"',
    description: "First/last day of the month in the given calendar.",
  },
  {
    prop: "startOfYear(date, calendarType?) / endOfYear(date, calendarType?)",
    type: "(date: Date, calendarType?: CalendarType) => Date",
    default: '"shamsi"',
    description: "First/last day of the year in the given calendar.",
  },
  {
    prop: "daysInMonth(date, calendarType?)",
    type: "(date: Date, calendarType?: CalendarType) => number",
    default: '"shamsi"',
    description: "Number of days in date's month, in the given calendar.",
  },
  {
    prop: "isLeapYear(date, calendarType?)",
    type: "(date: Date, calendarType?: CalendarType) => boolean",
    default: '"shamsi"',
    description: "True when date's year is a leap year in the given calendar.",
  },
]

export const comparisonsRangesApi: ApiReferenceRow[] = [
  {
    prop: "daysBetween(from, to)",
    type: "(from: Date, to: Date) => number",
    description: "Real elapsed days between two dates, independent of calendar system.",
  },
  {
    prop: "monthsBetween(from, to, calendarType?)",
    type: "(from: Date, to: Date, calendarType?: CalendarType) => number",
    default: '"shamsi"',
    description: "Calendar-month distance between two dates; month length depends on calendarType.",
  },
  {
    prop: "isSameDay(a, b) / isBefore(a, b) / isAfter(a, b)",
    type: "(a: Date, b: Date) => boolean",
    description: "Basic day-level comparisons.",
  },
  {
    prop: "isToday(date) / isPast(date) / isFuture(date)",
    type: "(date: Date) => boolean",
    description: "Relative-to-now comparisons.",
  },
  {
    prop: "minDate(...dates) / maxDate(...dates)",
    type: "(...dates: Date[]) => Date",
    description: "The earliest/latest date in a list.",
  },
  {
    prop: "clampDate(date, { min?, max? })",
    type: "(date: Date, bounds: { min?: Date; max?: Date }) => Date",
    description: "Clamps date between optional min/max bounds (inclusive).",
  },
  {
    prop: "eachDayOfRange(from, to)",
    type: "(from: Date, to: Date) => Date[]",
    description: "Inclusive day list between from and to.",
  },
  {
    prop: "isWithinRange(date, range)",
    type: "(date: Date, range: DateRange) => boolean",
    description: "True when date falls within range (inclusive, missing bounds are open-ended).",
  },
  {
    prop: "rangeLengthInDays(range)",
    type: "(range: DateRange) => number",
    description: "Inclusive day count spanned by a range, or 0 if incomplete.",
  },
  {
    prop: "validateRange(range, options?)",
    type: '(range: DateRange, options?: RangeValidationOptions) => "incomplete" | "inverted" | "too-short" | "too-long" | "in-past" | "disabled-date" | null',
    typeDetail:
      "RangeValidationOptions: { minDays?: number; maxDays?: number; disablePast?: boolean; disabledDates?: Date[] }",
    description:
      "Validates a from/to range against reservation-style constraints: ordering, minimum/maximum stay length, past dates, and specific blocked dates. Returns null when valid, or a machine-readable reason otherwise.",
  },
]

export const digitsApi: ApiReferenceRow[] = [
  {
    prop: "toPersianDigits(value)",
    type: "(value: string) => string",
    description: "Converts every plain 0-9 digit in a string to its Persian (۰-۹) equivalent.",
  },
  {
    prop: "toLatinDigits(value)",
    type: "(value: string) => string",
    description:
      "Converts Persian/Arabic-Indic digits back to plain 0-9. Alias of normalizePersianDigits.",
  },
]

export const dateOptionsApi: ApiReferenceRow[] = [
  {
    prop: "calendarType",
    type: '"shamsi" | "miladi"',
    default: '"shamsi"',
    description: '"shamsi" is the Jalali/Solar Hijri calendar (default, Iran-first). "miladi" is the Gregorian calendar.',
  },
  {
    prop: "locale",
    type: '"fa" | "en"',
    default: 'calendarType === "shamsi" ? "fa" : "en"',
    description: "Month/weekday names.",
  },
  {
    prop: "digits",
    type: '"fa" | "en"',
    default: 'calendarType === "shamsi" ? "fa" : "en"',
    description: "Output digit style.",
  },
]
