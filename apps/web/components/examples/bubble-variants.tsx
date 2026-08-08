import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@workspace/ui/components/bubble"

export function BubbleVariantsExample() {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble variant="tinted">
        <BubbleContent>Tinted variant</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Outline variant</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>Ghost variant</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}
