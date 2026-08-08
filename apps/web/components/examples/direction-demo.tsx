import { DirectionProvider } from "@workspace/ui/components/direction"

export function DirectionDemoExample() {
  return (
    <DirectionProvider direction="rtl">
      <div className="flex w-full max-w-xs items-center justify-between rounded-lg border border-border px-4 py-3">
        <span className="text-sm text-muted-foreground">شروع</span>
        <span className="text-sm text-muted-foreground">پایان</span>
      </div>
    </DirectionProvider>
  )
}
