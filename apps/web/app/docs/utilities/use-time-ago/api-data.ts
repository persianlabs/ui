import type { ApiReferenceRow } from "@/components/api-reference"

export const useTimeAgoApi: ApiReferenceRow[] = [
  {
    prop: "time",
    type: "Date | number | string",
    description: "The moment to compare against now.",
  },
  {
    prop: "updateInterval",
    type: "number",
    default: "30000",
    description: "Re-render interval in milliseconds. Set 0 to compute once and never update.",
  },
  {
    prop: "max",
    type: "TimeAgoUnitName | number",
    default: "undefined",
    description: "Beyond this many milliseconds (or this unit's max), fall back to a full date.",
  },
  {
    prop: "fullDateFormatter",
    type: "(date: Date) => string",
    default: "formatDate(date, \"yyyy/MM/dd\")",
    description: "Formatter used for the full-date fallback.",
  },
  {
    prop: "messages",
    type: "TimeAgoMessages",
    default: "faMessages",
    description: "Message table used to render each unit. See faMessages/enMessages below.",
  },
  {
    prop: "locale",
    type: '"fa" | "en"',
    default: '"fa"',
    description: "Selects faMessages or enMessages when messages isn't given explicitly.",
  },
  {
    prop: "calendarType",
    type: '"shamsi" | "miladi"',
    default: '"shamsi"',
    description: "Calendar used by the default fullDateFormatter.",
  },
  {
    prop: "showSecond",
    type: "boolean",
    default: "false",
    description: "Show seconds instead of collapsing sub-minute diffs into \"just now\".",
  },
  {
    prop: "rounding",
    type: '"round" | "ceil" | "floor" | number',
    default: '"round"',
    description: "Rounding strategy for each unit's numeric value, or a fixed decimal precision.",
  },
  {
    prop: "units",
    type: "TimeAgoUnit[]",
    default: "DEFAULT_UNITS",
    description: "Override the unit table (thresholds in milliseconds).",
  },
]

export const formatTimeAgoApi: ApiReferenceRow[] = [
  {
    prop: "formatTimeAgo(from, options?, now?)",
    type: "(from: Date, options?: FormatTimeAgoOptions, now?: Date | number) => string",
    description:
      "Pure function counterpart of useTimeAgo — formats the difference between from and now as a relative time string. Accepts the same options minus updateInterval.",
  },
]

export const timeAgoMessagesApi: ApiReferenceRow[] = [
  {
    prop: "justNow",
    type: "string",
    description: "Shown for diffs under a minute, unless showSecond is set.",
  },
  {
    prop: "past / future",
    type: "string | (value: string, isPast: boolean) => string",
    description: "Wraps the formatted unit string, e.g. \"{0} ago\" / \"in {0}\".",
  },
  {
    prop: "invalid",
    type: "string",
    description: "Fallback string when no unit matches (should not normally occur).",
  },
  {
    prop: "second / minute / hour / day / week / month / year",
    type: "string | (value: number, isPast: boolean) => string",
    description:
      "Per-unit formatter. day/week/month/year formatters also receive isPast so they can special-case a value of 1 (\"yesterday\"/\"tomorrow\").",
  },
]

export const builtInTablesApi: ApiReferenceRow[] = [
  {
    prop: "faMessages",
    type: "TimeAgoMessages",
    description: "Built-in Persian message table, the default when locale isn't \"en\".",
  },
  {
    prop: "enMessages",
    type: "TimeAgoMessages",
    description: "Built-in English message table, used when locale is \"en\".",
  },
]
