"use client"

import { useState } from "react"

import { ElasticRangeSlider } from "@workspace/ui/components/elastic-range-slider"

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]

function toPersianDigits(value: number) {
  return value
    .toLocaleString("en-US")
    .replaceAll(",", "٬")
    .replace(/\d/g, (d) => persianDigits[Number(d)] ?? d)
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
        formatValue={(v) => toPersianDigits(v)}
        minThumbLabel="حداقل قیمت"
        maxThumbLabel="حداکثر قیمت"
      />
      <div className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
        <span>از {toPersianDigits(min)} تومان</span>
        <span>تا {toPersianDigits(max)} تومان</span>
      </div>
    </div>
  )
}
