import type { ApiReferenceRow } from "@/components/api-reference"

export const sidebarProviderApi: ApiReferenceRow[] = [
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "true",
    description: "Whether the sidebar is initially expanded when uncontrolled.",
  },
  {
    prop: "open",
    type: "boolean",
    default: "undefined",
    description: "The controlled expanded state of the sidebar.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    default: "-",
    description: "Called when the expanded state changes.",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    default: "-",
    description:
      "Style for the wrapper. Set --sidebar-width or --sidebar-width-icon here to override the defaults.",
  },
]

export const sidebarApi: ApiReferenceRow[] = [
  {
    prop: "side",
    type: '"left" | "right"',
    default: '"left"',
    description:
      "Which physical edge the sidebar docks to. The panel and its rail follow this side in both directions.",
  },
  {
    prop: "variant",
    type: '"sidebar" | "floating" | "inset"',
    default: '"sidebar"',
    description:
      "Visual treatment. floating adds a border, radius, and padding; inset pairs with SidebarInset. With inset, wrap main content in SidebarInset.",
  },
  {
    prop: "collapsible",
    type: '"offcanvas" | "icon" | "none"',
    default: '"offcanvas"',
    description:
      "Collapse behavior. offcanvas slides out of view, icon collapses to an icon rail, none keeps it always visible (uncontrollable).",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"ltr"',
    description:
      'Text direction for the sidebar contents and its mobile sheet. Pass rtl together with side="right" for Persian layouts.',
  },
]

export const useSidebarApi: ApiReferenceRow[] = [
  {
    prop: "state",
    type: '"expanded" | "collapsed"',
    default: "-",
    description: "Derived open state of the desktop sidebar.",
  },
  {
    prop: "open",
    type: "boolean",
    default: "-",
    description: "Whether the desktop sidebar is open.",
  },
  {
    prop: "setOpen",
    type: "(open: boolean) => void",
    default: "-",
    description: "Sets the desktop sidebar state.",
  },
  {
    prop: "openMobile",
    type: "boolean",
    default: "-",
    description: "Whether the mobile sheet sidebar is open.",
  },
  {
    prop: "setOpenMobile",
    type: "(open: boolean) => void",
    default: "-",
    description: "Sets the mobile sheet state.",
  },
  {
    prop: "isMobile",
    type: "boolean",
    default: "-",
    description:
      "Whether the viewport is below md. Drives which sidebar variant renders.",
  },
  {
    prop: "toggleSidebar",
    type: "() => void",
    default: "-",
    description:
      "Toggles the sidebar on either surface. Also bound to ⌘B / Ctrl+B by SidebarProvider.",
  },
]

export const sidebarMenuButtonApi: ApiReferenceRow[] = [
  {
    prop: "render",
    type: "ReactElement | ((props) => ReactElement)",
    default: "-",
    description:
      "Base UI render prop. Render a link (e.g. <a> or router Link) instead of a button while keeping menu styles.",
  },
  {
    prop: "isActive",
    type: "boolean",
    default: "false",
    description: "Marks the item active with accent background and text.",
  },
  {
    prop: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    description: "Visual style of the button.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "lg"',
    default: '"default"',
    description:
      "Height of the button. lg renders icon-only content suitable for large collapsed rows.",
  },
  {
    prop: "tooltip",
    type: "string | TooltipContentProps",
    default: "-",
    description:
      "Tooltip shown on the inline-end side when the sidebar is collapsed to icons.",
  },
]
