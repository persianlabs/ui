import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@workspace/ui/components/message"

export function MessageRtlExample() {
  return (
    <MessageGroup className="w-full max-w-sm">
      <Message align="start">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>هو</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>هوش مصنوعی · ۰۹:۴۱</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>چطور می‌تونم کمکتون کنم؟</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>در مورد سفارشم سوال دارم.</BubbleContent>
          </Bubble>
          <MessageFooter>مشاهده شد · ۰۹:۴۲</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
