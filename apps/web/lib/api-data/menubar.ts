import type { ApiReferenceRow } from "@/components/api-reference"

export const menubarRootApi: ApiReferenceRow[] = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The orientation of the menubar.",
  },
  {
    prop: "modal",
    type: "boolean",
    default: "true",
    description: "Whether the menubar is modal.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the whole menubar is disabled.",
  },
  {
    prop: "loopFocus",
    type: "boolean",
    default: "true",
    description:
      "Whether to loop keyboard focus back to the first item at the end of the list.",
  },
]

export const menubarMenuApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether this menu is open. Use when controlled.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether this menu is disabled.",
  },
]
