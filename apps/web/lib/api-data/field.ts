import type { ApiReferenceRow } from "@/components/api-reference"

export const fieldApi: ApiReferenceRow[] = [
  {
    prop: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "The layout direction of the label and control.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the whole field. Label and description dim automatically via group styling.",
  },
]

export const fieldItemApi: ApiReferenceRow[] = [
  {
    prop: "...props",
    type: "FieldPrimitive.Item.Props",
    default: "—",
    description:
      "A flex container for grouping field content, passed through to Base UI's Field.Item.",
  },
]

export const fieldControlApi: ApiReferenceRow[] = [
  {
    prop: "...props",
    type: "FieldPrimitive.Control.Props",
    default: "—",
    description:
      "Alias for Base UI's Field.Control. Use it to register a custom or third-party control (e.g. a plain textarea) with the field context so it participates in labelling, validation, and error state.",
  },
]

export const fieldValidityApi: ApiReferenceRow[] = [
  {
    prop: "children",
    type: "(validity: FieldValidity) => ReactNode",
    default: "—",
    description:
      "Alias for Base UI's Field.Validity. A render prop exposing the live validity state (including the error message) of the field.",
  },
]

export const fieldErrorApi: ApiReferenceRow[] = [
  {
    prop: "match",
    type: "boolean | keyof ValidityState",
    default: "—",
    description:
      "Controls when the error shows. Pass true to always show it, letting an external validation library control visibility.",
  },
]
