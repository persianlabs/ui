import { Kbd } from "@workspace/ui/components/kbd"

export function KbdInlineExample() {
  return (
    <p className="text-sm text-muted-foreground">
      Press{" "}
      <span dir="ltr" className="inline-flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>Enter</Kbd>
      </span>{" "}
      to submit.
    </p>
  )
}
