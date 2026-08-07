import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"

export function ButtonGroupNestedExample() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Button 1</Button>
        <Button variant="outline">Button 2</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Button 3</Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
