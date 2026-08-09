import { CheckCircle2Icon } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"

export function BadgeIconExample() {
  return (
    <Badge className="gap-1">
      <CheckCircle2Icon />
      Verified
    </Badge>
  )
}
