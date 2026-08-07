"use client"

import { ChevronsUpDownIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"

export function CollapsibleRtlExample() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-xs">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">۳ مخزن ستاره‌دار شده</p>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <ChevronsUpDownIcon />
              <span className="sr-only">باز و بسته کردن</span>
            </Button>
          }
        />
      </div>
      <div className="rounded-lg border border-border px-3 py-2 font-mono text-sm">
        @base_ui/react
      </div>
      <CollapsibleContent className="flex flex-col gap-2 pt-2">
        <div className="rounded-lg border border-border px-3 py-2 font-mono text-sm">
          @shadcn/ui
        </div>
        <div className="rounded-lg border border-border px-3 py-2 font-mono text-sm">
          @tailwindlabs/tailwindcss
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
