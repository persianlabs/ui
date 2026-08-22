import type { ApiReferenceRow } from "@/components/api-reference"

export const toastProviderApi: ApiReferenceRow[] = [
  {
    prop: "position",
    type: '"top-start" | "top-center" | "top-end" | "bottom-start" | "bottom-center" | "bottom-end"',
    default: '"bottom-end"',
    description:
      "Which corner the toast stack anchors to. start/end follow reading direction, so bottom-end is bottom-right in LTR and bottom-left in RTL.",
  },
  {
    prop: "portalProps",
    type: "Toast.Portal.Props",
    default: "undefined",
    description:
      "Props forwarded to the underlying portal, e.g. a custom container.",
  },
  {
    prop: "limit",
    type: "number",
    default: "3",
    description: "Maximum number of toasts visible in the viewport at once.",
  },
  {
    prop: "timeout",
    type: "number",
    default: "5000",
    description:
      "Default auto-dismiss time in ms for toasts that don't set their own.",
  },
  {
    prop: "toastManager",
    type: "ReturnType<typeof Toast.createToastManager>",
    default: "toastManager",
    description:
      "The manager this provider renders. Pass your own (via `Toast.createToastManager()`) to run an isolated toast stack instead of the shared `toastManager` singleton — e.g. when multiple providers are mounted at once.",
  },
]

export const anchoredToastProviderApi: ApiReferenceRow[] = [
  {
    prop: "portalProps",
    type: "Toast.Portal.Props",
    default: "undefined",
    description:
      "Props forwarded to the underlying portal, e.g. a custom container.",
  },
  {
    prop: "toastManager",
    type: "ReturnType<typeof Toast.createToastManager>",
    default: "anchoredToastManager",
    description:
      "The manager this provider renders. Pass your own to run an isolated anchored-toast stack instead of the shared `anchoredToastManager` singleton.",
  },
]

export const toastAddOptionsApi: ApiReferenceRow[] = [
  {
    prop: "title",
    type: "ReactNode",
    default: "undefined",
    description: "The toast's title.",
  },
  {
    prop: "description",
    type: "ReactNode",
    default: "undefined",
    description: "The toast's description.",
  },
  {
    prop: "type",
    type: '"success" | "error" | "warning" | "info" | "loading"',
    default: "undefined",
    description: "Status used to pick the leading icon and its color.",
  },
  {
    prop: "data.variant",
    type: '"default" | "x"',
    default: '"default"',
    description: "Visual style of the toast.",
  },
  {
    prop: "data.avatar",
    type: "ReactNode",
    default: "undefined",
    description:
      "Overrides the status icon in the x variant with an avatar or custom element.",
  },
  {
    prop: "data.dir",
    type: '"ltr" | "rtl"',
    default: "undefined",
    description:
      "Forces this toast's own content direction, overriding the ambient direction the provider otherwise measures automatically. Only affects this toast's text/logical spacing — the stack's corner position still follows the provider's ambient direction.",
  },
  {
    prop: "actionProps",
    type: "ComponentPropsWithoutRef<'button'>",
    default: "undefined",
    description: "Renders an action button — children is its label.",
  },
  {
    prop: "timeout",
    type: "number",
    default: "5000",
    description: "Auto-dismiss time in ms. 0 disables auto-dismiss.",
  },
  {
    prop: "id",
    type: "string",
    default: "undefined",
    description:
      "Adding a toast with an existing id updates it in place instead of stacking a new one.",
  },
]

export const anchoredToastAddOptionsApi: ApiReferenceRow[] = [
  {
    prop: "positionerProps.anchor",
    type: "Element | null",
    default: "undefined",
    description: "The element to position the toast against. Required.",
  },
  {
    prop: "positionerProps.side",
    type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
    default: '"top"',
    description: "Which side of the anchor to render on.",
  },
  {
    prop: "positionerProps.sideOffset",
    type: "number",
    default: "8",
    description: "Distance between the toast and the anchor, in pixels.",
  },
  {
    prop: "positionerProps.align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Alignment against the anchor.",
  },
]
