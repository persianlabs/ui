import type { ApiReferenceRow } from "@/components/api-reference"

export const markerApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"default" | "separator" | "border"',
    default: '"default"',
    description: "The visual style of the marker.",
  },
  {
    prop: "render",
    type: "ReactElement",
    default: "—",
    description: "Render the marker as a different element.",
  },
]
