"use client"

import TextareaAutosize from "react-textarea-autosize"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@workspace/ui/components/input-group"

export function InputGroupCustomExample() {
  return (
    <InputGroup className="max-w-xs">
      <TextareaAutosize
        data-slot="input-group-control"
        placeholder="Write a message..."
        minRows={2}
        maxRows={6}
        className="flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton>Send</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
