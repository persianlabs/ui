import type { ApiReferenceRow } from "@/components/api-reference"

export const buttonRootApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: "ButtonVariant",
    typeDetail:
      '"default" | "outline" | "secondary" | "ghost" | "destructive" | "link" | "blue" | "blue-subtle"',
    default: '"default"',
    description: "The visual style of the button.",
  },
  {
    prop: "size",
    type: "ButtonSize",
    typeDetail:
      '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    default: '"default"',
    description: "The size of the button.",
  },
  {
    prop: "loading",
    type: "boolean",
    default: "false",
    description:
      "Shows a spinner alongside the button's content and disables interaction.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction and dims the button.",
  },
  {
    prop: "render",
    type: "ReactElement | (props, state) => ReactElement",
    default: "undefined",
    description:
      "Renders a different element (e.g. a link) in place of the native button, keeping the same styles and behavior.",
  },
]
