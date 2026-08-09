"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  ToastPosition,
  ToastPrimitive,
  ToastProvider,
} from "@workspace/ui/components/toast"

const POSITIONS: { value: ToastPosition; label: string }[] = [
  { value: "top-start", label: "Top Start" },
  { value: "top-center", label: "Top Center" },
  { value: "top-end", label: "Top End" },
  { value: "bottom-start", label: "Bottom Start" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-end", label: "Bottom End" },
]

export function ToastDemoExample() {
  const manager = React.useMemo(() => ToastPrimitive.createToastManager(), [])
  const [position, setPosition] = React.useState<ToastPosition>("bottom-end")

  return (
    <ToastProvider toastManager={manager} position={position}>
      <div className="grid w-full max-w-xs grid-cols-3 gap-2">
        {POSITIONS.map((item) => (
          <Button
            key={item.value}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              setPosition(item.value)
              manager.add({
                title: "Event created",
                description: "Sunday, December 3 at 9:00 AM",
                actionProps: {
                  children: "Undo",
                  onClick: () => manager.add({ title: "Undone" }),
                },
              })
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </ToastProvider>
  )
}
