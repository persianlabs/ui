import { Badge } from "@workspace/ui/components/badge"

export function BadgeRtlExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>پیش‌فرض</Badge>
      <Badge variant="secondary">ثانویه</Badge>
      <Badge variant="outline">خط دور</Badge>
      <Badge variant="destructive">حذف</Badge>
    </div>
  )
}
