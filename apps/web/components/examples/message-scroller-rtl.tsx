"use client"

import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@workspace/ui/components/message-scroller"

const messages = [
  { id: "1", align: "start" as const, text: "سلام! هستی؟" },
  { id: "2", align: "end" as const, text: "بله، چیکار داری؟" },
  { id: "3", align: "start" as const, text: "میشه PR من رو بررسی کنی؟" },
  { id: "4", align: "end" as const, text: "حتماً، الان بازخورد می‌فرستم." },
  { id: "5", align: "start" as const, text: "ممنون، لطف کردی!" },
]

export function MessageScrollerRtlExample() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="h-56 w-full max-w-sm rounded-xl border border-border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="p-4">
            {messages.map((message) => (
              <MessageScrollerItem key={message.id}>
                <Bubble align={message.align}>
                  <BubbleContent>{message.text}</BubbleContent>
                </Bubble>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}
