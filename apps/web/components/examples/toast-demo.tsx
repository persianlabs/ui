"use client"

import { Button } from "@workspace/ui/components/button"
import { toastManager } from "@workspace/ui/components/toast"

export function ToastDemoExample() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toastManager.add({
          title: "Event created",
          description: "Sunday, December 3 at 9:00 AM",
          actionProps: {
            children: "Undo",
            onClick: () => toastManager.add({ title: "Undone" }),
          },
        })
      }
    >
      Show toast
    </Button>
  )
}
