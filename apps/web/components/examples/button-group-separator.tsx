import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group"

export function ButtonGroupSeparatorExample() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button 1</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Button 2</Button>
    </ButtonGroup>
  )
}
