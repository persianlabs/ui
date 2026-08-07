import type { ApiReferenceRow } from "@/components/api-reference"

export const progressRootApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "number | null",
    default: "null",
    description:
      "The current progress value. Pass null for an indeterminate state.",
  },
  {
    prop: "min",
    type: "number",
    default: "0",
    description: "The minimum value.",
  },
  {
    prop: "max",
    type: "number",
    default: "100",
    description: "The maximum value.",
  },
]
