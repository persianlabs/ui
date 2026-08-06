"use client"

import { Dialog } from "@base-ui/react/dialog"
import { MenuIcon, XIcon } from "lucide-react"
import * as React from "react"

import { DocsSidebar } from "@/components/docs-sidebar"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Toggle navigation menu"
        className="border-border hover:bg-muted flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors md:hidden"
      >
        <MenuIcon className="size-4" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="bg-background border-border fixed inset-y-0 start-0 z-50 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-e p-6 shadow-lg transition-transform duration-200 data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full">
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="text-sm font-semibold">Menu</Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="border-border hover:bg-muted flex size-7 items-center justify-center rounded-md border transition-colors"
            >
              <XIcon className="size-4" />
            </Dialog.Close>
          </div>
          <DocsSidebar onNavigate={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
