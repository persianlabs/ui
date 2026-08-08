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

export function MessageDemoExample() {
  return (
    <MessageGroup className="w-full max-w-sm">
      <Message align="start">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant · 09:41</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>How can I help you today?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>I need help with my order.</BubbleContent>
          </Bubble>
          <MessageFooter>Seen · 09:42</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
