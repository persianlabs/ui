import type { ApiReferenceRow } from "@/components/api-reference"

export const textareaRootApi: ApiReferenceRow[] = [
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents interaction and dims the textarea.",
  },
  {
    prop: "rows",
    type: "number",
    default: "undefined",
    description: "The number of visible text lines.",
  },
]
