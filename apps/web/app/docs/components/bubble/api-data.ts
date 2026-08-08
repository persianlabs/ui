import type { ApiReferenceRow } from "@/components/api-reference"

export const bubbleApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"',
    default: '"default"',
    description: "The visual style of the bubble.",
  },
  {
    prop: "align",
    type: '"start" | "end"',
    default: '"start"',
    description: "Which side of the chat the bubble sits on.",
  },
]

export const bubbleReactionsApi: ApiReferenceRow[] = [
  {
    prop: "side",
    type: '"top" | "bottom"',
    default: '"bottom"',
    description: "Which edge of the bubble the reactions badge sits on.",
  },
  {
    prop: "align",
    type: '"start" | "end"',
    default: '"end"',
    description: "Which side the reactions badge is aligned to.",
  },
]
