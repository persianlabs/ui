import type { ApiReferenceRow } from "@/components/api-reference"

export const commandRootApi: ApiReferenceRow[] = [
  {
    prop: "items",
    type: "Value[]",
    typeDetail: "readonly Value[] | readonly Group<Value>[]",
    default: "undefined",
    description: "A flat array of items, or an array of groups with items.",
  },
  {
    prop: "open",
    type: "boolean",
    default: "true",
    description: "Controls whether the command is open.",
  },
  {
    prop: "autoHighlight",
    type: "boolean | 'always'",
    default: "'always'",
    description: "Controls automatic highlighting of items.",
  },
  {
    prop: "keepHighlight",
    type: "boolean",
    default: "true",
    description: "Whether to maintain highlight state.",
  },
]

export const commandDialogApi: ApiReferenceRow[] = [
  {
    prop: "open",
    type: "boolean",
    description: "Controls whether the dialog is open.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
]

export const commandDialogTriggerApi: ApiReferenceRow[] = [
  {
    prop: "render",
    type: "React.ReactElement",
    description: "Element to render as the trigger.",
  },
]

export const commandDialogPopupApi: ApiReferenceRow[] = [
  {
    prop: "portalProps",
    type: "Dialog.Portal.Props",
    default: "undefined",
    description:
      "Props forwarded to the internal portal (keepMounted, container, etc.).",
  },
  {
    prop: "title",
    type: "string",
    default: "'Command Palette'",
    description: "Visually hidden dialog title, read by assistive technology.",
  },
  {
    prop: "description",
    type: "string",
    default: "'Search for a command to run...'",
    description:
      "Visually hidden dialog description, read by assistive technology.",
  },
]

export const commandInputApi: ApiReferenceRow[] = [
  {
    prop: "placeholder",
    type: "string",
    default: "undefined",
    description: "The placeholder text for the input.",
  },
]

export const commandItemApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Value",
    default: "required",
    description: "The value associated with this item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents selection of this item.",
  },
]

export const commandGroupApi: ApiReferenceRow[] = [
  {
    prop: "items",
    type: "readonly unknown[]",
    default: "undefined",
    description: "The array of items in this group.",
  },
]

export const commandPanelApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description:
      "Bordered, elevated container for standalone commands rendered outside a dialog.",
  },
]

export const commandFooterApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description:
      "Hint bar for keyboard shortcuts. Hidden below the sm breakpoint, since touch devices have no arrow/enter keys to hint at.",
  },
]
