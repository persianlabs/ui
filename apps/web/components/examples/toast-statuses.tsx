"use client"

import { Button } from "@workspace/ui/components/button"
import { toastManager } from "@workspace/ui/components/toast"

export function ToastStatusesExample() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            type: "success",
            title: "Payment successful",
            description: "Your invoice has been paid.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            type: "error",
            title: "Payment failed",
            description: "Your card was declined.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            type: "warning",
            title: "Storage almost full",
            description: "You're using 92% of your quota.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toastManager.add({
            type: "info",
            title: "New version available",
            description: "Refresh the page to update.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const id = toastManager.add({
            type: "loading",
            title: "Uploading file…",
            timeout: 0,
          })
          setTimeout(() => {
            toastManager.update(id, {
              type: "success",
              title: "File uploaded",
              timeout: 4000,
            })
          }, 1800)
        }}
      >
        Loading
      </Button>
    </div>
  )
}
