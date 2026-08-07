import { Button } from "@workspace/ui/components/button"
import { Spinner } from "@workspace/ui/components/spinner"

export function ButtonSpinnerExample() {
  return (
    <Button disabled>
      <Spinner data-icon="inline-start" />
      Please wait
    </Button>
  )
}
