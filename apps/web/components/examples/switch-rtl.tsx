import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

export function SwitchRtlExample() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="switch-rtl-notifications" defaultChecked />
      <Label htmlFor="switch-rtl-notifications">اعلان‌ها</Label>
    </div>
  )
}
