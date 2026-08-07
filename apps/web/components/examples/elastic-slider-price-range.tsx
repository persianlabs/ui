"use client"

import { useState } from "react"

import { ElasticRangeSlider } from "@workspace/ui/components/elastic-range-slider"

export function ElasticSliderPriceRangeExample() {
  const [range, setRange] = useState<[number, number]>([200, 700])

  return (
    <div className="w-64">
      <ElasticRangeSlider
        label="Price"
        min={0}
        max={1000}
        step={10}
        value={range}
        onValueChange={setRange}
        formatValue={(v) => `$${v}`}
        minThumbLabel="Min price"
        maxThumbLabel="Max price"
      />
    </div>
  )
}
