import { Slider } from "@workspace/ui/components/slider"

export function SliderRangeExample() {
  return <Slider defaultValue={[25, 75]} max={100} step={1} className="w-64" />
}
