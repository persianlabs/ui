import {
  IRAN_MAP_VIEWBOX,
  IRAN_PROVINCE_SHAPES,
} from "@workspace/ui/lib/iran-map-data"
import { preview } from "./shared"

export function IranMapPickerPreview() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ display: "flex" }}
    >
      <svg
        role="img"
        aria-label="نقشه ایران با انتخاب تهران"
        viewBox={`0 0 ${IRAN_MAP_VIEWBOX.width} ${IRAN_MAP_VIEWBOX.height}`}
        style={{ display: "flex", width: "230px", height: "auto" }}
      >
        {IRAN_PROVINCE_SHAPES.map((province) => (
          <path
            key={province.id}
            d={province.d}
            fill={province.id === "IR-23" ? preview.primary : preview.muted}
            stroke={preview.background}
            strokeWidth={2}
          />
        ))}
      </svg>
    </div>
  )
}
