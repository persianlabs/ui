import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

export function DropdownMenuRtlExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">باز کردن منو</Button>}
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>حساب من</DropdownMenuGroupLabel>
          <DropdownMenuItem>پروفایل</DropdownMenuItem>
          <DropdownMenuItem>صورتحساب</DropdownMenuItem>
          <DropdownMenuItem>تنظیمات</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">خروج</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
