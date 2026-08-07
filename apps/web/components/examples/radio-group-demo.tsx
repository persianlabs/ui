import { Label } from "@workspace/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"

const plans = [
  { value: "default", label: "Default" },
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
]

export function RadioGroupDemoExample() {
  return (
    <RadioGroup defaultValue="comfortable">
      {plans.map((plan) => (
        <div key={plan.value} className="flex items-center gap-2">
          <RadioGroupItem value={plan.value} id={`radio-demo-${plan.value}`} />
          <Label htmlFor={`radio-demo-${plan.value}`}>{plan.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
