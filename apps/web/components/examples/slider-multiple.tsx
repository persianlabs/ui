import { Slider } from "@workspace/ui/components/slider"

export function SliderMultipleExample() {
  return (
    <Slider
      defaultValue={[10, 40, 60, 90]}
      max={100}
      step={1}
      className="w-64"
    />
  )
}
