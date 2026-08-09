"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  ToastPosition,
  ToastPrimitive,
  ToastProvider,
} from "@workspace/ui/components/toast"

const POSITIONS: { value: ToastPosition; label: string }[] = [
  { value: "top-start", label: "بالا راست" },
  { value: "top-center", label: "بالا وسط" },
  { value: "top-end", label: "بالا چپ" },
  { value: "bottom-start", label: "پایین راست" },
  { value: "bottom-center", label: "پایین وسط" },
  { value: "bottom-end", label: "پایین چپ" },
]

export function ToastRtlExample() {
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
              // Force this toast's content to render RTL, overriding the
              // ambient direction the provider would otherwise measure —
              // useful when a toast's content is Persian even though the
              // page around it is LTR.
              manager.add({
                type: "success",
                title: "رویداد ایجاد شد",
                description: "یکشنبه، ۳ آذر، ساعت ۹:۰۰ صبح",
                data: { dir: "rtl" },
                actionProps: {
                  children: "واگرد",
                  onClick: () =>
                    manager.add({ title: "واگرد شد", data: { dir: "rtl" } }),
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
