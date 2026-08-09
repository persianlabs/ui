import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

export function PopoverRtlExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">باز کردن</Button>} />
      <PopoverContent>
        <p className="text-sm font-medium">ابعاد</p>
        <p className="mt-1 text-sm text-muted-foreground">
          ابعاد لایه را تنظیم کنید.
        </p>
      </PopoverContent>
    </Popover>
  )
}
