import type { ApiReferenceRow } from "@/components/api-reference"

export const receiptPrinterApi: ApiReferenceRow[] = [
  {
    prop: "stage",
    type: '"processing" | "printing" | "complete"',
    default: '"complete"',
    description:
      "Sets the machine status light, screen treatment, and receipt state.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Adds styles to the printer root.",
  },
]
