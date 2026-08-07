import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export function ButtonRtlExample() {
  return (
    <Button>
      <ArrowLeftIcon data-icon="inline-start" />
      بازگشت
    </Button>
  )
}
