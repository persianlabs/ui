import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Input } from "@workspace/ui/components/input"

export function ButtonGroupInputExample() {
  return (
    <ButtonGroup>
      <Input placeholder="Search components" className="w-56" />
      <Button variant="outline">Search</Button>
    </ButtonGroup>
  )
}
