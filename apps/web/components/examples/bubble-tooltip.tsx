import { CheckIcon } from "lucide-react"

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@workspace/ui/components/bubble"
import { Button } from "@workspace/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

export function BubbleTooltipExample() {
  return (
    <TooltipProvider>
      <div className="flex w-full max-w-sm flex-col gap-4 py-4">
        <Bubble variant="secondary">
          <BubbleContent>Did you remove the stale route?</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>Yes, removed it from the registry.</BubbleContent>
          <BubbleReactions>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="ghost" size="icon-xs" />}
              >
                <CheckIcon />
              </TooltipTrigger>
              <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
            </Tooltip>
          </BubbleReactions>
        </Bubble>
      </div>
    </TooltipProvider>
  )
}
