import type { ApiReferenceRow } from "@/components/api-reference"

export const holidaysApi: ApiReferenceRow[] = [
  {
    prop: "getHolidays(year, calendarType?, options?)",
    type: "(year: number, calendarType?: CalendarType, options?: GetHolidaysOptions) => ResolvedHoliday[]",
    default: '"shamsi"',
    description:
      "Convenience wrapper around getHolidaysInRange for a whole calendar year, e.g. getHolidays(1405) for Jalali year 1405, or getHolidays(2026, \"miladi\").",
  },
  {
    prop: "getHolidaysInRange(from, to, options?)",
    type: "(from: Date, to: Date, options?: GetHolidaysOptions) => ResolvedHoliday[]",
    description:
      "Resolves every holiday/occasion whose date falls within [from, to] (inclusive). A hijri (lunar) holiday can appear zero, one, or twice, since a lunar year is shorter than a solar one.",
  },
  {
    prop: "isHoliday(date, options?)",
    type: "(date: Date, options?: GetHolidaysOptions) => boolean",
    description: "True if date matches any (official, by default) holiday.",
  },
  {
    prop: "getHolidayInfo(date, options?)",
    type: "(date: Date, options?: GetHolidaysOptions) => ResolvedHoliday[]",
    description: "Every holiday/occasion that falls on date.",
  },
]

export const getHolidaysOptionsApi: ApiReferenceRow[] = [
  {
    prop: "includeUnofficial",
    type: "boolean",
    default: "false",
    description:
      "Include commemorative/unofficial occasions, not just official days off.",
  },
]

export const resolvedHolidayApi: ApiReferenceRow[] = [
  {
    prop: "calendar",
    type: '"jalali" | "gregorian" | "hijri"',
    description: "Which calendar the entry's month/day fields are defined in.",
  },
  {
    prop: "official",
    type: "boolean",
    description:
      "Whether this is an official day off, as opposed to a commemorative occasion.",
  },
  {
    prop: "title",
    type: "string",
    description: "Persian title of the holiday or occasion.",
  },
  {
    prop: "month",
    type: "number",
    description: "1-indexed month, in the entry's own calendar field above.",
  },
  {
    prop: "day",
    type: "number",
    description: "1-indexed day, in the entry's own calendar field above.",
  },
  {
    prop: "date",
    type: "Date",
    description: "The resolved Gregorian Date for this occurrence.",
  },
  {
    prop: "approximate",
    type: "boolean",
    description:
      "True for hijri (lunar) entries, which are resolved via a tabular approximation and can shift by up to a day from the real, moon-sighting-announced date.",
  },
]

export const lowLevelHijriApi: ApiReferenceRow[] = [
  {
    prop: "hijriToJdn(year, month, day)",
    type: "(year: number, month: number, day: number) => number",
    description:
      "Tabular (\"civil\"/Kuwaiti) Hijri calendar day → Julian Day Number.",
  },
  {
    prop: "jdnToGregorian(jdn)",
    type: "(jdn: number) => Date",
    description:
      "Julian Day Number → Gregorian calendar Date (local midnight), via the Fliegel & Van Flandern algorithm.",
  },
  {
    prop: "hijriMonthLength(year, month)",
    type: "(year: number, month: number) => number",
    description: "Number of days in a tabular Hijri month (29 or 30).",
  },
]
