"use client"

import { useState } from "react"

import { ElasticSlider } from "@workspace/ui/components/elastic-slider"

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
        formatValue={(v) => `${v} هزار تومان`}
      />
    </div>
  )
}
