"use client"

import { useState } from "react"

import { ElasticSlider } from "@workspace/ui/components/elastic-slider"

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (d) => persianDigits[Number(d)] ?? d)
}

export function ElasticSliderRtlExample() {
  const [price, setPrice] = useState(50)

  return (
    <div className="w-50">
      <ElasticSlider
        label="قیمت"
        min={0}
        max={100}
        step={1}
        value={price}
        onValueChange={setPrice}
        formatValue={(v) => `${toPersianDigits(v)} هزار تومان`}
      />
    </div>
  )
}
