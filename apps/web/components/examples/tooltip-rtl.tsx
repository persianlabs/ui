"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

export function TooltipRtlExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">ذخیره</Button>} />
        <TooltipContent>افزودن به علاقه‌مندی‌ها</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
