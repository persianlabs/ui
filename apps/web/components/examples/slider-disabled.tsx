import { Slider } from "@workspace/ui/components/slider"

export function SliderDisabledExample() {
  return (
    <Slider defaultValue={[33]} max={100} step={1} disabled className="w-64" />
  )
}
