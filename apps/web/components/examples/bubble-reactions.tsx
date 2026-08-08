import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@workspace/ui/components/bubble"

export function BubbleReactionsExample() {
  return (
    <Bubble align="end" className="mb-3">
      <BubbleContent>Nice work on this release!</BubbleContent>
      <BubbleReactions>🎉</BubbleReactions>
    </Bubble>
  )
}
