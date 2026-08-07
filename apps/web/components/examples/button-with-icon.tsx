import { MailIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export function ButtonWithIconExample() {
  return (
    <Button>
      <MailIcon data-icon="inline-start" />
      Send email
    </Button>
  )
}
