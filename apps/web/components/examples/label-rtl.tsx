import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export function LabelRtlExample() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="label-rtl-email">ایمیل</Label>
      <Input id="label-rtl-email" type="email" placeholder="you@example.com" />
    </div>
  )
}
