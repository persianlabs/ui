import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export function LabelInputExample() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="label-input-email">Email</Label>
      <Input
        id="label-input-email"
        type="email"
        placeholder="you@example.com"
      />
    </div>
  )
}
