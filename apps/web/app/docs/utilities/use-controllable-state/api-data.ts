import type { ApiReferenceRow } from "@/components/api-reference"

export const useControllableStateApi: ApiReferenceRow[] = [
  {
    prop: "prop",
    type: "T | undefined",
    description:
      "The controlled value. When defined, the hook is controlled and always mirrors this value.",
  },
  {
    prop: "defaultProp",
    type: "T",
    description: "The initial value when uncontrolled (i.e. prop is undefined).",
  },
  {
    prop: "onChange",
    type: "(value: T) => void",
    default: "—",
    description: "Called whenever the value changes, in both modes.",
  },
  {
    prop: "caller",
    type: "string",
    default: "—",
    description:
      "A component name used in the dev-only warning if the value switches between controlled and uncontrolled across renders.",
  },
]
