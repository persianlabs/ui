import type { ApiReferenceRow } from "@/components/api-reference"

export const bounceSidebarApi: ApiReferenceRow[] = [
  {
    prop: "items",
    type: "BounceSidebarItem[]",
    typeDetail:
      "Array<string | { label: string; href?: string } | { label: string; heading: true }>",
    default: "required",
    description:
      "Rows rendered as the vertical list. A plain string or an object with a label is a nav item, and href turns it into a link. Add heading: true to render a non-selectable group label the marker skips over.",
  },
  {
    prop: "value",
    type: "number",
    default: "undefined",
    description:
      "Active item index for controlled usage. When set, the component won't manage its own state.",
  },
  {
    prop: "defaultValue",
    type: "number",
    default: "0",
    description:
      "Initial active index for uncontrolled usage. Ignored when value is provided.",
  },
  {
    prop: "onChange",
    type: "(index: number) => void",
    default: "—",
    description: "Called with the new index whenever an item is selected.",
  },
  {
    prop: "dotColor",
    type: "string",
    default: '"#FC4C01"',
    description:
      "Any CSS color for the bouncing active marker (hex, rgb, hsl, var).",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Extra classes merged onto the root <ul> element.",
  },
]
