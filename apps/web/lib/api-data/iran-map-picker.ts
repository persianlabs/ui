import type { ApiReferenceRow } from "@/components/api-reference"

export const iranMapPickerApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "string | null",
    description:
      'The selected province\'s ISO 3166-2 code (e.g. "IR-23" for Tehran). Use when controlled.',
  },
  {
    prop: "defaultValue",
    type: "string | null",
    description:
      "The initially selected province code when uncontrolled. Defaults to null.",
  },
  {
    prop: "onValueChange",
    type: "(value: string | null) => void",
    description:
      "Called with the province code when a province is selected, and with null when the selected province is clicked again to clear.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description:
      "Disables every interaction with the map — provinces ignore clicks and keyboard input, and the whole map dims.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Applied to the root <svg>. The map scales responsively through its viewBox; size it from here (e.g. max-w-md).",
  },
]
