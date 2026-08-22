import type { ApiReferenceRow } from "@/components/api-reference"

export const zPersianDateApi: ApiReferenceRow[] = [
  {
    prop: "zPersianDate(options?)",
    type: "(options?: ZPersianDateOptions) => ZodType<Date>",
    description:
      "A zod schema that accepts an ISO-8601 string, a shamsi yyyy/MM/dd string, an epoch number, or a native Date, and outputs a plain Date.",
  },
  {
    prop: "min / max",
    type: "string | number | Date",
    default: "undefined",
    description:
      "Inclusive bounds. Accepts anything zPersianDate itself accepts (an ISO string, a shamsi string, an epoch number, or a Date).",
  },
]

export const zPersianDateRangeApi: ApiReferenceRow[] = [
  {
    prop: "zPersianDateRange(options?)",
    type: "(options?: RangeValidationOptions) => ZodType<{ from: Date; to: Date }>",
    description:
      "A zod schema for a { from, to } reservation-style range, validated with the same rules as persian-date's validateRange. The failure reason is attached to the to field.",
  },
  {
    prop: "minDays / maxDays",
    type: "number",
    default: "undefined",
    description: "Minimum/maximum inclusive stay length in days.",
  },
  {
    prop: "disablePast",
    type: "boolean",
    default: "false",
    description: "Reject a from date before today.",
  },
  {
    prop: "disabledDates",
    type: "Date[]",
    default: "undefined",
    description: "Reject a range that overlaps any of these dates.",
  },
]
