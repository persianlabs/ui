import type { ApiReferenceRow } from "@/components/api-reference"

export const responsiveDialogRootApi: ApiReferenceRow[] = [
  {
    prop: "drawerPosition",
    type: '"top" | "right" | "bottom" | "left" | "start" | "end"',
    default: '"bottom"',
    description: "Which edge the mobile drawer slides in from.",
  },
]
