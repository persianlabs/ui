import type { ApiReferenceRow } from "@/components/api-reference"

export const copyButtonApi: ApiReferenceRow[] = [
  {
    prop: "text",
    type: "string | (() => string)",
    default: "—",
    description:
      "The text copied to the clipboard on click. Pass a function to compute it lazily at click time.",
  },
  {
    prop: "label",
    type: "string",
    default: '"کپی"',
    description:
      "Accessible label and tooltip content. Also used as the button's aria-label.",
  },
  {
    prop: "toastManager",
    type: "ReturnType<typeof Toast.createToastManager>",
    default: "undefined",
    description:
      "By default CopyButton creates its own manager and wraps itself in an AnchoredToastProvider — no setup required. Pass your app's own manager (with a matching ancestor AnchoredToastProvider) only if this button's confirmation should share state with other anchored toasts on the page.",
  },
  {
    prop: "side",
    type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
    default: '"top"',
    description: "Which side of the button the confirmation toast anchors to.",
  },
  {
    prop: "onCopySuccess",
    type: "(text: string) => void",
    default: "undefined",
    description: "Called after a successful copy, in addition to the toast.",
  },
  {
    prop: "idleIcon",
    type: "ReactNode",
    default: "<CopyIcon />",
    description: "Icon shown before copying.",
  },
  {
    prop: "doneIcon",
    type: "ReactNode",
    default: "<CheckIcon />",
    description: "Icon shown briefly after a successful copy.",
  },
  {
    prop: "...props",
    type: "ComponentProps<typeof Button>",
    default: "—",
    description:
      "Any other Button prop — variant, size, className, children, etc.",
  },
]
