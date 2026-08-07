import { Progress } from "@workspace/ui/components/progress"

export function ProgressRtlExample() {
  return (
    <div className="flex w-64 flex-col gap-2 text-sm">
      <span className="text-muted-foreground">۶۶٪ آپلود شده</span>
      <Progress value={66} />
    </div>
  )
}
