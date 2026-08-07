import { MapPinOffIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"

export function EmptyCityExample() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MapPinOffIcon />
        </EmptyMedia>
        <EmptyTitle>شهری یافت نشد</EmptyTitle>
        <EmptyDescription>
          ابتدا یک استان انتخاب کنید تا فهرست شهرهای آن نمایش داده شود.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
