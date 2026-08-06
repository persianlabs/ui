import { Label } from "@workspace/ui/components/label"
import {
  CitySelector,
  CitySelectorCity,
  CitySelectorProvince,
} from "@workspace/ui/components/city-selector"

export function CitySelectorCustomExample() {
  return (
    <CitySelector locale="en" className="flex-col gap-4 sm:flex-col">
      <div className="flex flex-col gap-1.5">
        <Label>Province</Label>
        <CitySelectorProvince placeholder="Choose a province…" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>City</Label>
        <CitySelectorCity placeholder="Choose a city…" />
      </div>
    </CitySelector>
  )
}
