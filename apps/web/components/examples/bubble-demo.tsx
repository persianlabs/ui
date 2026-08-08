import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@workspace/ui/components/bubble"

export function BubbleDemoExample() {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble align="start" variant="muted">
        <BubbleContent>Hey, do you have a minute?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Sure, what&apos;s up?</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}
