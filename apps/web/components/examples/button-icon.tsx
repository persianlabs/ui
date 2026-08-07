import { PlusIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export function ButtonIconExample() {
  return (
    <Button size="icon" aria-label="Add">
      <PlusIcon />
    </Button>
  )
}
