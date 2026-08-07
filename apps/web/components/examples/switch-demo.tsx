import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

export function SwitchDemoExample() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="switch-demo-airplane" />
      <Label htmlFor="switch-demo-airplane">Airplane Mode</Label>
    </div>
  )
}
