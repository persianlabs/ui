import type { ApiReferenceRow } from "@/components/api-reference"

export const statusButtonApi: ApiReferenceRow[] = [
  {
    prop: "onClick",
    type: "(event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>",
    default: "—",
    description:
      "Uncontrolled mode: loading while the returned promise is pending, then success. Omit it when the form owns the submission.",
  },
  {
    prop: "status",
    type: '"idle" | "loading" | "success"',
    default: "—",
    description:
      "Controlled mode, e.g. derived from useActionState. The button still returns to idle on its own after successDuration.",
  },
  {
    prop: "onStatusChange",
    type: "(status: ButtonStatus) => void",
    default: "—",
    description:
      "Called on every status change, including the automatic return to idle after successDuration.",
  },
  {
    prop: "successLabel",
    type: "React.ReactNode",
    default: "—",
    description:
      'Shown next to the check icon in the success state, e.g. "Submitted" for a "Submit" button. Falls back to a screen-reader-only "Success" announcement.',
  },
  {
    prop: "successDuration",
    type: "number",
    default: "1500",
    description:
      "How long (in ms) the success state stays visible before returning to idle.",
  },
  {
    prop: "...props",
    type: "ComponentProps<typeof Button>",
    default: "—",
    description:
      "Any other Button prop — variant, size, type, className, disabled, etc.",
  },
]
