import { Slider } from "@workspace/ui/components/slider"

export function SliderVerticalExample() {
  return (
    <Slider
      defaultValue={[33]}
      max={100}
      step={1}
      orientation="vertical"
      className="h-40"
    />
  )
}
