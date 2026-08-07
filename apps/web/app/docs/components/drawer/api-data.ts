import type { ApiReferenceRow } from "@/components/api-reference"

export const drawerRootApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "Whether the drawer is open. Use when controlled.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Whether the drawer is initially open when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open, details) => void",
    default: "—",
    description: "Called when the open state changes.",
  },
  {
    prop: "position",
    type: '"top" | "right" | "bottom" | "left" | "start" | "end"',
    default: '"bottom"',
    description:
      "Which edge the drawer slides in from. start/end resolve to left/right based on the ambient direction.",
  },
  {
    prop: "swipeDirection",
    type: '"up" | "down" | "left" | "right"',
    default: "derived from position",
    description: "Which way a swipe gesture dismisses the drawer.",
  },
]

export const drawerPopupApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "straight" | "inset"',
    default: '"default"',
    description: "Controls the drawer's corner rounding and edge inset.",
  },
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "false",
    description: "Whether to render the built-in close button.",
  },
  {
    prop: "showBar",
    type: "boolean",
    default: "false",
    description: "Whether to render the drag handle bar.",
  },
  {
    prop: "portalProps",
    type: "Drawer.Portal.Props",
    default: "—",
    description: "Props forwarded to the underlying portal.",
  },
]
