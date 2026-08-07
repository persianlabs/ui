import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

export function CheckboxDemoExample() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-demo-terms" />
      <Label htmlFor="checkbox-demo-terms">Accept terms and conditions</Label>
    </div>
  )
}
