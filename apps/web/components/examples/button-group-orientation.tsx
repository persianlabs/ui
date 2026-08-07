import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"

export function ButtonGroupOrientationExample() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Button 1</Button>
      <Button variant="outline">Button 2</Button>
      <Button variant="outline">Button 3</Button>
    </ButtonGroup>
  )
}
