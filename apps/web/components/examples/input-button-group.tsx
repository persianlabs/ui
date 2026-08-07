import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Input } from "@workspace/ui/components/input"

export function InputButtonGroupExample() {
  return (
    <ButtonGroup className="max-w-xs">
      <Input placeholder="Search components" />
      <Button variant="outline">Search</Button>
    </ButtonGroup>
  )
}
