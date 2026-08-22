import type { ApiReferenceRow } from "@/components/api-reference"

export const hitboxApi: ApiReferenceRow[] = [
  {
    prop: "size",
    type: '"sm" | "default" | "lg" | string',
    default: '"default"',
    description:
      "How far the hitbox extends beyond the child. Pass a CSS length for a custom size.",
  },
  {
    prop: "position",
    type: '"all" | "top" | "bottom" | "left" | "right" | "vertical" | "horizontal"',
    default: '"all"',
    description: "Which side or sides of the child receive the extended area.",
  },
  {
    prop: "radius",
    type: '"none" | "sm" | "md" | "lg" | "full"',
    default: '"none"',
    description: "Corner radius applied to the extended area.",
  },
  {
    prop: "debug",
    type: "boolean",
    default: "false",
    description:
      "Shows the hitbox with a dashed red outline and translucent fill for development.",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes applied to the child element.",
  },
]
