import { InfoIcon } from "lucide-react"

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@workspace/ui/components/bubble"
import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

export function BubblePopoverExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 py-4">
      <Bubble align="end">
        <BubbleContent>Run the build script.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Failed to run the command.</BubbleContent>
        <BubbleReactions>
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Show error details"
                  className="aria-expanded:text-destructive"
                >
                  <InfoIcon />
                </Button>
              }
            />
            <PopoverContent>
              <p className="text-sm font-medium">
                Command failed with exit code 1
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                ENOENT: no such file or directory, open pnpm-lock.yaml
              </p>
            </PopoverContent>
          </Popover>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
