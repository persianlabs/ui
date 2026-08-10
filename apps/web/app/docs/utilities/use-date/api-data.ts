import type { ApiReferenceRow } from "@/components/api-reference"

export const useDateApi: ApiReferenceRow[] = [
  {
    prop: "calendarType",
    type: '"shamsi" | "miladi"',
    default: '"shamsi"',
    description: "Calendar used to derive year/month/day and the formatted output.",
  },
  {
    prop: "locale",
    type: '"fa" | "en"',
    default: 'calendarType === "shamsi" ? "fa" : "en"',
    description: "Month/weekday names used by formatted.",
  },
  {
    prop: "digits",
    type: '"fa" | "en"',
    default: 'calendarType === "shamsi" ? "fa" : "en"',
    description: "Digit style used by formatted.",
  },
  {
    prop: "interval",
    type: "number",
    default: "1000",
    description: "Tick interval in milliseconds. Set 0 to read the time once and never update.",
  },
  {
    prop: "pattern",
    type: "string",
    default: '"yyyy/MM/dd HH:mm:ss"',
    description: "date-fns format pattern used for formatted.",
  },
  {
    prop: "checkHoliday",
    type: "boolean",
    default: "false",
    description: "Flag date against the built-in Iranian holiday dataset.",
  },
]

export const useDateResultApi: ApiReferenceRow[] = [
  {
    prop: "date",
    type: "Date",
    description: "The live Date value.",
  },
  {
    prop: "formatted",
    type: "string",
    description: "date formatted with pattern, honoring calendarType/locale/digits.",
  },
  {
    prop: "year / month / day",
    type: "number",
    description: "1-indexed year/month/day in the active calendarType.",
  },
  {
    prop: "hour / minute / second",
    type: "number",
    description: "Local clock time fields.",
  },
  {
    prop: "weekday",
    type: "number",
    description: "0 (Sunday) - 6 (Saturday), same in both calendars — a real-world invariant.",
  },
  {
    prop: "isHoliday",
    type: "boolean",
    description: "True when checkHoliday is enabled and date matches a holiday.",
  },
  {
    prop: "holidays",
    type: "ResolvedHoliday[]",
    description: "Populated only when checkHoliday is true and date matches an entry.",
  },
]
