import { Badge } from "@workspace/ui/components/badge"
import { TomanIcon } from "@workspace/ui/components/toman-icon"

export function TomanIconBadgeExample() {
  return (
    <Badge variant="secondary" className="gap-1">
      <TomanIcon className="size-3" />
      <span dir="ltr">25,000</span>
    </Badge>
  )
}
