"use client"

import { HeartIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { toastManager } from "@workspace/ui/components/toast"

export function ToastXExample() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toastManager.add({
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
      }
    >
      Show X toast
    </Button>
  )
}
