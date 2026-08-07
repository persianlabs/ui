import { SettingsIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

export function ButtonGroupPopoverExample() {
  return (
    <ButtonGroup>
      <Button variant="outline">Save</Button>
      <ButtonGroupSeparator />
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon" aria-label="More settings">
              <SettingsIcon />
            </Button>
          }
        />
        <PopoverContent align="end" className="w-64">
          <p className="text-sm font-medium">Save options</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Choose whether to save a draft or publish immediately.
          </p>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
