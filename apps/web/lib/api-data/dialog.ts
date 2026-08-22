import type { ApiReferenceRow } from "@/components/api-reference"

export const dialogRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the dialog is open. Use when controlled.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Whether the dialog is initially open when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open, details) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
  {
    prop: "modal",
    type: 'boolean | "trap-focus"',
    default: "true",
    description:
      'Whether the dialog blocks interaction with the rest of the page. Use "trap-focus" when nesting inside another already-modal dialog/drawer.',
  },
]

export const dialogPopupApi: ApiReferenceRow[] = [
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "true",
    description: "Whether to render the built-in close button.",
  },
]
