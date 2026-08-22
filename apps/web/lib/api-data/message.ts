import type { ApiReferenceRow } from "@/components/api-reference"

export const messageApi: ApiReferenceRow[] = [
  {
    prop: "align",
    type: '"start" | "end"',
    default: '"start"',
    description:
      "Which side the message row sits on, e.g. end for the current user's own messages.",
  },
]
