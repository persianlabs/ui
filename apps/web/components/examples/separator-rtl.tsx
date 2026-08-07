import { Separator } from "@workspace/ui/components/separator"

export function SeparatorRtlExample() {
  return (
    <div className="flex max-w-sm flex-col gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">پرشین‌لبز</div>
        <div className="text-muted-foreground">
          پایه‌ای برای سیستم طراحی شما
        </div>
      </div>
      <Separator />
      <div>
        مجموعه‌ای از کامپوننت‌های طراحی‌شده که می‌توانید سفارشی‌سازی، توسعه و
        روی آن‌ها بسازید.
      </div>
    </div>
  )
}
