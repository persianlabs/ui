import type { ApiReferenceRow } from "@/components/api-reference"

export const comboboxRootApi: ApiReferenceRow[] = [
  {
    prop: "items",
    type: "Value[]",
    typeDetail: "readonly Value[] | readonly Group<Value>[]",
    default: "undefined",
    description: "A flat array of items, or an array of groups with items.",
  },
  {
    prop: "value",
    type: "Value",
    typeDetail: "Multiple extends true ? Value[] : Value",
    default: "undefined",
    description: "The selected value. Use when controlled.",
  },
  {
    prop: "defaultValue",
    type: "Value",
    default: "undefined",
    description: "The initially selected value when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value, details) => void",
    default: "—",
    description: "Called when the selected value changes.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "Whether multiple items can be selected.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction with the combobox.",
  },
  {
    prop: "readOnly",
    type: "boolean",
    default: "false",
    description: "Prevents choosing a different option from the popup.",
  },
  {
    prop: "itemToStringLabel",
    type: "(item: Value) => string",
    default: "undefined",
    description:
      "Converts an object item value to a display string. Not needed when items are already strings.",
  },
  {
    prop: "filter",
    type: "(item, query, itemToString?) => boolean",
    default: "built-in",
    description:
      "Custom filter function used to match items against the input query.",
  },
  {
    prop: "autoHighlight",
    type: "boolean",
    default: "false",
    description:
      "Highlights the first matching item automatically while filtering.",
  },
]

export const comboboxInputApi: ApiReferenceRow[] = [
  {
    prop: "placeholder",
    type: "string",
    default: "undefined",
    description: "Placeholder text shown when the input is empty.",
  },
]

export const comboboxItemApi: ApiReferenceRow[] = [
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

export const comboboxContentApi: ApiReferenceRow[] = [
  {
    prop: "sideOffset",
    type: "number",
    default: "6",
    description: "Distance in pixels between the anchor and the popup.",
  },
]
