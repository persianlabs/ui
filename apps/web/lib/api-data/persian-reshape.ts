import type { ApiReferenceRow } from "@/components/api-reference"

export const persianReshapeApi: ApiReferenceRow[] = [
  {
    prop: "reshapePersian(text)",
    type: "(text: string) => string",
    description:
      "Reshapes Persian/Arabic text into pre-joined Unicode presentation-form codepoints, and reorders runs for renderers that draw text in raw logical order. Mixed Persian + Latin/digit content is preserved correctly.",
  },
]
