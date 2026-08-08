import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@workspace/ui/components/bubble"

export function BubbleRtlExample() {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble align="start" variant="muted">
        <BubbleContent>سلام، یک دقیقه وقت داری؟</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>البته، چی شده؟</BubbleContent>
        <BubbleReactions role="img" aria-label="واکنش: پسندیدن">
          <span>👍</span>
        </BubbleReactions>
      </Bubble>
    </BubbleGroup>
  )
}
