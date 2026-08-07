import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"

export function ButtonGroupSizeExample() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        Button 1
      </Button>
      <Button variant="outline" size="sm">
        Button 2
      </Button>
    </ButtonGroup>
  )
}
