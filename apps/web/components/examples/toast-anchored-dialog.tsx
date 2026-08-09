"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { CopyButton } from "@workspace/ui/components/copy-button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { anchoredToastManager } from "@workspace/ui/components/toast"

export function ToastAnchoredDialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm">
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              https://persian-labs.ir/u/ali
            </span>
            <CopyButton
              text="https://persian-labs.ir/u/ali"
              variant="ghost"
              size="icon-sm"
            />
          </div>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <SaveButton />
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}

function SaveButton() {
  const ref = React.useRef<HTMLButtonElement>(null)

  return (
    <Button
      ref={ref}
      type="submit"
      onClick={() =>
        anchoredToastManager.add({
          type: "success",
          title: "Profile saved",
          positionerProps: {
            anchor: ref.current,
            side: "top",
          },
        })
      }
    >
      Save changes
    </Button>
  )
}
