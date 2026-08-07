import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

export function CheckboxDisabledExample() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-disabled" disabled />
      <Label htmlFor="checkbox-disabled">Accept terms and conditions</Label>
    </div>
  )
}
