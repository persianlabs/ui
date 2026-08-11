import type { ApiReferenceRow } from "@/components/api-reference"

export const calendarApi: ApiReferenceRow[] = [
  {
    prop: "calendarType",
    type: '"shamsi" | "miladi"',
    default: '"shamsi"',
    description:
      "Switches between the Jalali (Shamsi, via @daypicker/persian, faIR locale + RTL + Persian numerals) and Gregorian (Miladi, via react-day-picker, enUS locale + LTR + Latin numerals) calendars.",
  },
  {
    prop: "mode",
    type: '"single" | "multiple" | "range"',
    description: "The selection mode of the calendar.",
  },
  {
    prop: "selected",
    type: "Date | Date[] | DateRange | undefined",
    description:
      "The selected date(s), shaped according to mode. Pair with onSelect for a controlled calendar.",
  },
  {
    prop: "onSelect",
    type: "(value) => void",
    description: "Called with the new selection whenever it changes.",
  },
  {
    prop: "month",
    type: "Date",
    description: "The month displayed in the calendar (controlled).",
  },
  {
    prop: "onMonthChange",
    type: "(month: Date) => void",
    description: "Called when the displayed month changes.",
  },
  {
    prop: "defaultMonth",
    type: "Date",
    description:
      "The initial month to show. Pass this explicitly (e.g. a Date computed after mount) instead of relying on the internal default, to avoid reading the current date during render.",
  },
  {
    prop: "captionLayout",
    type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
    default: '"label"',
    description: "Renders the month caption as plain text or as dropdowns.",
  },
  {
    prop: "buttonVariant",
    type: "Button variant",
    default: '"ghost"',
    description: "The variant used for the previous/next navigation buttons.",
  },
  {
    prop: "showOutsideDays",
    type: "boolean",
    default: "true",
    description: "Shows days outside the current month.",
  },
  {
    prop: "showHolidays",
    type: "boolean",
    default: "false",
    description:
      "Highlights Iranian holidays for the visible month, using persian-holidays internally: official days off are red, commemorative-only days are blue (red wins if a day has both). A hover tooltip shows each holiday's title and type.",
  },
  {
    prop: "showWeekNumber",
    type: "boolean",
    default: "false",
    description: "Shows a column with the ISO week number.",
  },
  {
    prop: "numberOfMonths",
    type: "number",
    default: "1",
    description: "The number of months to render side by side.",
  },
  {
    prop: "disabled",
    type: "Matcher | Matcher[]",
    description: "Dates that cannot be selected.",
  },
  {
    prop: "modifiers",
    type: "Record<string, Matcher | Matcher[]>",
    description:
      "Custom named day matchers, paired with modifiersClassNames/modifiersStyles.",
  },
  {
    prop: "modifiersClassNames",
    type: "Record<string, string>",
    description: "Class names applied to days matching each modifier.",
  },
  {
    prop: "locale",
    type: "DayPickerLocale",
    default: 'faIR ("shamsi") / enUS ("miladi")',
    description: "Overrides the locale used for month/weekday names.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"rtl" ("shamsi") / "ltr" ("miladi")',
    description: "Overrides the calendar's text direction.",
  },
  {
    prop: "numerals",
    type: '"latn" | "arabext" | ...',
    default: '"arabext" ("shamsi") / "latn" ("miladi")',
    description: "Overrides the numeral system used to format day numbers.",
  },
  {
    prop: "className",
    type: "string",
    description: "Class name applied to the root element.",
  },
  {
    prop: "classNames",
    type: "Partial<ClassNames>",
    description: "Overrides individual react-day-picker element class names.",
  },
]
