import type { ApiReferenceRow } from "@/components/api-reference"

export const fieldApi: ApiReferenceRow[] = [
  {
    prop: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "The layout direction of the label and control.",
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
