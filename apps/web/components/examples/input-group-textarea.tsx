import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

export function InputGroupTextareaExample() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupTextarea placeholder="Write a message..." />
      <InputGroupAddon align="block-end">
        <InputGroupButton>Send</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
