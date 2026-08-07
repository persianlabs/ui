import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

export function InputGroupBlockStartExample() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupAddon align="block-start">
        <InputGroupText>Feedback</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Tell us what you think..." />
    </InputGroup>
  )
}
