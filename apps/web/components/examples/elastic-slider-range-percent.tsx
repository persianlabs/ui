"use client"

import { ElasticRangeSlider } from "@workspace/ui/components/elastic-range-slider"

export function ElasticSliderRangePercentExample() {
  return (
    <div className="w-64">
      <ElasticRangeSlider
        label="Discount"
        min={0}
        max={100}
        step={5}
        defaultValue={[20, 60]}
        formatValue={(v) => `${v}%`}
        minThumbLabel="Min discount"
        maxThumbLabel="Max discount"
      />
    </div>
  )
}
