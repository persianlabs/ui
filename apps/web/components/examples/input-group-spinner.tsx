import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Spinner } from "@workspace/ui/components/spinner"

export function InputGroupSpinnerExample() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Searching..." readOnly />
      <InputGroupAddon align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup>
  )
}
