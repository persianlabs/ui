import { Label } from "@workspace/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"

const plans = [
  { value: "default", label: "پیش‌فرض" },
  { value: "comfortable", label: "راحت" },
  { value: "compact", label: "فشرده" },
]

export function RadioGroupRtlExample() {
  return (
    <RadioGroup defaultValue="comfortable">
      {plans.map((plan) => (
        <div key={plan.value} className="flex items-center gap-2">
          <RadioGroupItem value={plan.value} id={`radio-rtl-${plan.value}`} />
          <Label htmlFor={`radio-rtl-${plan.value}`}>{plan.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
