import { Label } from "@workspace/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"

export function RadioGroupDisabledExample() {
  return (
    <RadioGroup defaultValue="default">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="radio-disabled-default" />
        <Label htmlFor="radio-disabled-default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="radio-disabled-compact" disabled />
        <Label htmlFor="radio-disabled-compact">Compact</Label>
      </div>
    </RadioGroup>
  )
}
