import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

export function CheckboxRtlExample() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-rtl-terms" defaultChecked />
      <Label htmlFor="checkbox-rtl-terms">قوانین و مقررات را می‌پذیرم</Label>
    </div>
  )
}
