"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  ToastPosition,
  ToastPrimitive,
  ToastProvider,
} from "@workspace/ui/components/toast"
import { cn } from "@workspace/ui/lib/utils"

const POSITIONS: { value: ToastPosition; label: string }[] = [
  { value: "top-start", label: "Top Start" },
  { value: "top-center", label: "Top Center" },
  { value: "top-end", label: "Top End" },
  { value: "bottom-start", label: "Bottom Start" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-end", label: "Bottom End" },
]

export function ToastStatusesExample() {
  const manager = React.useMemo(() => ToastPrimitive.createToastManager(), [])
  const [position, setPosition] = React.useState<ToastPosition>("bottom-end")

  return (
    <ToastProvider toastManager={manager} position={position}>
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <div className="grid w-full max-w-xs grid-cols-3 gap-2">
          {POSITIONS.map((item) => (
            <Button
              key={item.value}
              variant={position === item.value ? "secondary" : "outline"}
              size="sm"
              className={cn(
                "text-xs",
                position === item.value && "pointer-events-none"
              )}
              onClick={() => setPosition(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              manager.add({
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
              manager.add({
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
              manager.add({
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
              manager.add({
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
              const id = manager.add({
                type: "loading",
                title: "Uploading file…",
                timeout: 0,
              })
              setTimeout(() => {
                manager.update(id, {
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
      </div>
    </ToastProvider>
  )
}
