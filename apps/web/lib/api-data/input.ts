import type { ApiReferenceRow } from "@/components/api-reference"

export const inputRootApi: ApiReferenceRow[] = [
  {
    prop: "type",
    type: "string",
    default: '"text"',
    description: "The native input type, e.g. text, email, file, password.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction and dims the input.",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Marks the input as required for form submission.",
  },
]

export const fieldRootApi: ApiReferenceRow[] = [
  {
    prop: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "The layout flow direction of the field.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Marks the field's label and description as disabled.",
  },
]

export const fieldLabelApi: ApiReferenceRow[] = [
  {
    prop: "htmlFor",
    type: "string",
    default: "undefined",
    description: "The id of the associated control.",
  },
]
