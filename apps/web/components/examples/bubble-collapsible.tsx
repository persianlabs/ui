"use client"

import { ChevronDownIcon } from "lucide-react"
import * as React from "react"

import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"

const previewText =
  "The accessibility review found two focus states that were visually too subtle in dark mode."

const restText =
  " I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface. The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved."

export function BubbleCollapsibleExample() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-4">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>

      <Bubble variant="muted" align="end">
        <BubbleContent>
          <Collapsible open={open} onOpenChange={setOpen}>
            <p>{previewText}</p>
            <CollapsibleContent className="mt-2">
              <p>{restText}</p>
            </CollapsibleContent>
            <CollapsibleTrigger
              render={
                <Button
                  variant="link"
                  className="mt-1 gap-1 p-0 text-muted-foreground"
                />
              }
            >
              {open ? "Show less" : "Show more"}
              <ChevronDownIcon />
            </CollapsibleTrigger>
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </div>
  )
}
