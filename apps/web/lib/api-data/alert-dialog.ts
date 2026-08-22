import type { ApiReferenceRow } from "@/components/api-reference"

export const alertDialogRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the dialog is open. Use when controlled.",
  },
  {
    prop: "onOpenChange",
    type: "(open, details) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
]

export const alertDialogContentApi: ApiReferenceRow[] = [
  {
    prop: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description: "Controls the dialog's max width and footer button layout.",
  },
]
