import { InboxIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"

export function EmptyRtlExample() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>پیامی وجود ندارد</EmptyTitle>
        <EmptyDescription>
          هر زمان پیام جدیدی دریافت کنید، اینجا نمایش داده می‌شود.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">بازخوانی</Button>
      </EmptyContent>
    </Empty>
  )
}
