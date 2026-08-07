"use client"

import { useState } from "react"

import { ElasticRangeSlider } from "@workspace/ui/components/elastic-range-slider"

function formatToman(value: number) {
  return value.toLocaleString("en-US").replaceAll(",", "٬")
}

export function ElasticSliderRangeTomanExample() {
  const [range, setRange] = useState<[number, number]>([1_000_000, 5_000_000])
  const [min, max] = range

  return (
    <div className="w-64">
      <ElasticRangeSlider
        label="قیمت"
        min={0}
        max={10_000_000}
        step={100_000}
        value={range}
        onValueChange={setRange}
        formatValue={(v) => formatToman(v)}
        minThumbLabel="حداقل قیمت"
        maxThumbLabel="حداکثر قیمت"
      />
      <div className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
        <span>از {formatToman(min)} تومان</span>
        <span>تا {formatToman(max)} تومان</span>
      </div>
    </div>
  )
}
