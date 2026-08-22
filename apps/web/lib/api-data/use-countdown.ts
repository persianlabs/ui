import type { ApiReferenceRow } from "@/components/api-reference"

export const useCountdownApi: ApiReferenceRow[] = [
  {
    prop: "targetIso",
    type: "string | null",
    default: "—",
    description:
      "An ISO-8601 date string to count down to. Pass null or an invalid value to disable the timer.",
  },
]

export const countdownResultApi: ApiReferenceRow[] = [
  {
    prop: "hours",
    type: "number",
    default: "—",
    description: "Whole absolute hours remaining; not capped at 24.",
  },
  {
    prop: "minutes",
    type: "number",
    default: "—",
    description: "Remaining absolute minutes after hours, from 0 to 59.",
  },
  {
    prop: "seconds",
    type: "number",
    default: "—",
    description: "Remaining absolute seconds after minutes, from 0 to 59.",
  },
  {
    prop: "totalSeconds",
    type: "number",
    default: "—",
    description:
      "Signed whole seconds remaining. Negative after the target passes.",
  },
  {
    prop: "isOverdue",
    type: "boolean",
    default: "—",
    description: "True when the target time has passed.",
  },
  {
    prop: "formatted",
    type: "string",
    default: "—",
    description: "Zero-padded absolute duration in HH:MM:SS form.",
  },
]
