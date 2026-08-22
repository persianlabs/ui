import type { ApiReferenceRow } from "@/components/api-reference"

export const tabsRootApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Value",
    typeDetail: "any | null",
    default: "undefined",
    description: "The value of the currently active tab. Use when controlled.",
  },
  {
    prop: "defaultValue",
    type: "Value",
    typeDetail: "any | null",
    default: "0",
    description: "The initial active tab value when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value, details) => void",
    typeDetail: "(value: Value, eventDetails: Tabs.ChangeEventDetails) => void",
    default: "—",
    description:
      "Called when the active tab changes, whether by click, keyboard, or an automatic fallback.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The layout flow direction of the tab list.",
  },
  {
    prop: "variant",
    type: "TabsVariant",
    typeDetail: '"default" | "rounded" | "line" | "ghost"',
    default: '"default"',
    description: "The visual style of the tab list and its sliding indicator.",
  },
]

export const tabsListApi: ApiReferenceRow[] = [
  {
    prop: "activateOnFocus",
    type: "boolean",
    default: "false",
    description:
      "Activate a tab as soon as it receives keyboard focus, instead of requiring Enter or Space.",
  },
  {
    prop: "loopFocus",
    type: "boolean",
    default: "true",
    description:
      "Loop keyboard focus back to the first tab when the end of the list is reached.",
  },
]

export const tabsTriggerApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Value",
    typeDetail: "any | null",
    default: "required",
    description: "The value associated with this tab.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Prevents interaction and excludes the tab from keyboard navigation.",
  },
]

export const tabsContentApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Value",
    typeDetail: "any | null",
    default: "required",
    description: "Shown when the Tab with the matching value is active.",
  },
  {
    prop: "keepMounted",
    type: "boolean",
    default: "false",
    description:
      "Keep the panel mounted in the DOM while hidden, instead of unmounting it.",
  },
]
