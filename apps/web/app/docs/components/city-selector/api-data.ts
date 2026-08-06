import type { ApiReferenceRow } from "@/components/api-reference"

export const citySelectorApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "CitySelectorValue",
    typeDetail: "{ province: PersianProvince | null; city: PersianCity | null }",
    default: "undefined",
    description: "The selected province and city. Use when controlled.",
  },
  {
    prop: "defaultValue",
    type: "CitySelectorValue",
    default: "{ province: null, city: null }",
    description: "The initially selected province and city when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: CitySelectorValue) => void",
    default: "—",
    description:
      "Called when the province or city changes. Selecting a new province resets the city.",
  },
  {
    prop: "locale",
    type: '"fa" | "en"',
    default: "auto",
    description:
      "Forces Persian or English labels, placeholders, and text direction. When omitted, follows the document's text direction (rtl → fa, ltr → en).",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables both the province and city comboboxes.",
  },
  {
    prop: "children",
    type: "ReactNode",
    default: "<CitySelectorProvince /><CitySelectorCity />",
    description:
      "Pass CitySelectorProvince and CitySelectorCity yourself to fully customize layout, labels, and placeholders.",
  },
]

export const citySelectorProvinceApi: ApiReferenceRow[] = [
  {
    prop: "placeholder",
    type: "string",
    default: "locale default",
    description: "Overrides the province input's placeholder text.",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Forwarded to the underlying ComboboxInputGroup.",
  },
]

export const citySelectorCityApi: ApiReferenceRow[] = [
  {
    prop: "placeholder",
    type: "string",
    default: "locale default",
    description: "Overrides the city input's placeholder text.",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Forwarded to the underlying ComboboxInputGroup.",
  },
]
