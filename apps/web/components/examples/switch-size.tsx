import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

export function SwitchSizeExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="switch-size-sm" size="sm" defaultChecked />
        <Label htmlFor="switch-size-sm">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-size-default" defaultChecked />
        <Label htmlFor="switch-size-default">Default</Label>
      </div>
    </div>
  )
}
