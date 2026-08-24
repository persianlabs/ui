import type { ApiReferenceRow } from "@/components/api-reference"

export const plateInputApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "Partial<PlateValue>",
    default: "—",
    description:
      "The controlled plate value — { twoDigit, letter, threeDigit, serial }.",
  },
  {
    prop: "defaultValue",
    type: "Partial<PlateValue>",
    default: "{}",
    description: "The initial plate value when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: PlateValue) => void",
    default: "—",
    description:
      "Called with the full value whenever any segment changes. Digits are normalized to Latin.",
  },
  {
    prop: "id",
    type: "string",
    default: "—",
    description:
      "Lands on the first digit input, so <label htmlFor> clicks focus the plate where typing starts.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables every segment, including the letter picker.",
  },
  {
    prop: "invalid",
    type: "boolean",
    default: "false",
    description:
      "Marks failed validation — destructive ring on the whole plate, and every still-empty segment (inputs and the letter picker) turns red until filled.",
  },
]

export const plateInputPartsApi: ApiReferenceRow[] = [
  {
    prop: "PLATE_LETTERS",
    type: "ReadonlyArray<{ value: string; label: string }>",
    default: "—",
    description:
      "Every plate letter the picker offers — the same set and order AZKI uses. Values are the bare letters; الف's label spells out its name.",
  },
  {
    prop: "DISABLED_PLATE_LETTER",
    type: '"معلولان"',
    default: "—",
    description:
      "The letter value used for the accessibility (wheelchair) plate option, rendered as an info-colored icon instead of text.",
  },
]
