import type { ApiReferenceRow } from "@/components/api-reference"

export const useCopyToClipboardOptionsApi: ApiReferenceRow[] = [
  {
    prop: "timeout",
    type: "number",
    default: "2000",
    description:
      "Milliseconds before isCopied resets to false. Set to 0 to keep it true.",
  },
  {
    prop: "onCopy",
    type: "() => void",
    default: "—",
    description: "Callback fired after a successful copy.",
  },
]

export const useCopyToClipboardReturnApi: ApiReferenceRow[] = [
  {
    prop: "copyToClipboard",
    type: "(value: string) => void",
    default: "—",
    description:
      "Call with the text to copy. No-op if value is empty or the clipboard API is unavailable.",
  },
  {
    prop: "isCopied",
    type: "boolean",
    default: "—",
    description: "true for timeout ms after a successful copy, then resets.",
  },
]
