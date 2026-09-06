"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog"

const STORAGE_KEY = "persianlabsui-create-welcome-dialog"

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setIsOpen(true)
    }
  }, [])

  // Stable callback — avoids re-creation on every render. (rerender-functional-setstate)
  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      localStorage.setItem(STORAGE_KEY, "true")
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPopup
        showCloseButton={false}
        className="max-w-92 min-w-0 gap-0 overflow-hidden rounded-xl p-0 sm:max-w-sm"
      >
        <div className="flex aspect-[2/1.2] w-full items-center justify-center rounded-t-xl bg-neutral-950 text-center text-neutral-100 sm:aspect-2/1">
          <div className="font-mono text-2xl font-bold">
            PersianLabs<span className="text-primary">/ui</span>
          </div>
        </div>
        <DialogHeader className="gap-1 p-4">
          <DialogTitle className="text-start text-base">
            به PersianLabs/ui خوش آمدید
          </DialogTitle>
          <DialogDescription className="text-start leading-relaxed text-foreground">
            رنگ پایه، تم، گردی گوشه‌ها و فونت‌های فارسی و انگلیسی را انتخاب کنید
            و نتیجه را همان لحظه در پیش‌نمایش زنده ببینید.
          </DialogDescription>
          <DialogDescription className="mt-2 text-start leading-relaxed font-medium text-foreground">
            در پایان، یک دستور کپی کنید تا پروژه‌تان با همین ظاهر ساخته شود.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="m-0">
          <DialogClose render={<Button className="w-full" />}>
            شروع کنید
          </DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
