"use client"

import { HeartIcon } from "lucide-react"
import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
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

export function ToastXExample() {
  const manager = React.useMemo(() => ToastPrimitive.createToastManager(), [])
  const [position, setPosition] = React.useState<ToastPosition>("top-center")

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
                title: "Ali liked your post",
                description: "just now",
                data: {
                  variant: "x",
                  avatar: (
                    <Avatar className="size-full">
                      <AvatarImage src="https://i.pravatar.cc/64?img=12" />
                      <AvatarFallback>
                        <HeartIcon className="size-3.5 fill-current text-red-500" />
                      </AvatarFallback>
                    </Avatar>
                  ),
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
