import type { ApiReferenceRow } from "@/components/api-reference"

export const passwordInputApi: ApiReferenceRow[] = [
  {
    prop: "autoComplete",
    type: "string",
    default: "—",
    description:
      'Standard input autocomplete hint, e.g. "current-password" or "new-password".',
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Applied to the underlying InputGroup.",
  },
  {
    prop: "…props",
    type: "React.ComponentProps<typeof InputGroupInput>",
    default: "—",
    description:
      "All other props (value, defaultValue, onChange, placeholder, disabled, etc.) are forwarded to the input. type and dir are fixed and cannot be overridden.",
  },
]
