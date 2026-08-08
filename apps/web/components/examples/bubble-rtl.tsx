import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@workspace/ui/components/bubble"

export function BubbleRtlExample() {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble align="start" variant="muted">
        <BubbleContent>سلام، یک دقیقه وقت داری؟</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>البته، چی شده؟</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}
