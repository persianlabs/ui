import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"

export function HoverCardRtlExample() {
  return (
    <HoverCard>
      <HoverCardTrigger
        href="#"
        className="text-sm font-medium text-primary underline underline-offset-4"
      >
        @taymaz
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-foreground">تیماز</span>
          <span className="text-sm text-muted-foreground">
            توسعه‌دهنده کتابخانه رابط کاربری فارسی.
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
