import type { ApiReferenceRow } from "@/components/api-reference"

export const navigationMenuApi: ApiReferenceRow[] = [
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: "mirrors with direction",
    description:
      "How the content popup aligns to the trigger. Defaults to start in LTR and automatically mirrors to end in RTL based on the rendered direction; pass an explicit value to override.",
  },
  {
    prop: "class",
    type: "string",
    default: "-",
    description: "Additional classes for the root element.",
  },
  {
    prop: "…props",
    type: "NavigationMenuPrimitive.Root.Props",
    default: "-",
    description:
      "All other props are forwarded to the Base UI Navigation Menu root. See the Base UI docs for the full list.",
  },
]

export const navigationMenuTriggerApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: "-",
    description: "Additional classes merged over navigationMenuTriggerStyle().",
  },
]

export const navigationMenuContentApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: "-",
    description:
      "Additional classes for the content panel rendered inside the shared viewport.",
  },
]

export const navigationMenuLinkApi: ApiReferenceRow[] = [
  {
    prop: "render",
    type: "ReactElement | function",
    default: "-",
    description:
      "Render as a custom element such as next/link while keeping menu behavior.",
  },
  {
    prop: "class",
    type: "string",
    default: "-",
    description: "Additional classes for the link.",
  },
]
