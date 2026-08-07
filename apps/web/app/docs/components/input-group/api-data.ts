import type { ApiReferenceRow } from "@/components/api-reference"

export const inputGroupRootApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes for the group's container.",
  },
]

export const inputGroupAddonApi: ApiReferenceRow[] = [
  {
    prop: "align",
    type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
    default: '"inline-start"',
    description: "Positions the addon relative to the input.",
  },
]

export const inputGroupButtonApi: ApiReferenceRow[] = [
  {
    prop: "size",
    type: '"xs" | "icon-xs" | "sm" | "icon-sm"',
    default: '"icon-xs"',
    description: "The size of the button.",
  },
  {
    prop: "variant",
    type: "ButtonVariant",
    default: '"ghost"',
    description: "The visual style of the button.",
  },
]

export const inputGroupInputApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes for the input.",
  },
]

export const inputGroupTextareaApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes for the textarea.",
  },
]
