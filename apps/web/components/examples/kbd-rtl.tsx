import { Kbd } from "@workspace/ui/components/kbd"

export function KbdRtlExample() {
  return (
    <p className="text-sm text-muted-foreground">
      برای جست‌وجو{" "}
      <span dir="ltr" className="inline-flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>{" "}
      را فشار دهید.
    </p>
  )
}
