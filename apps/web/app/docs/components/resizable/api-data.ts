import type { ApiReferenceRow } from "@/components/api-reference"

export const resizablePanelGroupApi: ApiReferenceRow[] = [
  {
    prop: "direction",
    type: '"horizontal" | "vertical"',
    default: "—",
    description: "The axis panels are laid out and resized along.",
  },
]

export const resizablePanelApi: ApiReferenceRow[] = [
  {
    prop: "defaultSize",
    type: "number",
    default: "—",
    description: "The panel's initial size, as a percentage (0-100).",
  },
  {
    prop: "minSize",
    type: "number",
    default: "—",
    description: "The minimum size the panel can be resized to.",
  },
]

export const resizableHandleApi: ApiReferenceRow[] = [
  {
    prop: "withHandle",
    type: "boolean",
    default: "false",
    description: "Shows a visible grip indicator on the drag handle.",
  },
]
