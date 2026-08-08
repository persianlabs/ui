import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"

export function HoverCardDemoExample() {
  return (
    <HoverCard>
      <HoverCardTrigger
        href="#"
        className="text-sm font-medium text-primary underline underline-offset-4"
      >
        @shadcn
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-foreground">shadcn</span>
          <span className="text-sm text-muted-foreground">
            The React Framework for design engineers.
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
