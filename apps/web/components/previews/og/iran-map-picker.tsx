import {
  IRAN_MAP_VIEWBOX,
  IRAN_PROVINCE_SHAPES,
} from "@workspace/ui/lib/iran-map-data"
import { reshapePersian } from "@workspace/ui/lib/persian-reshape"

export function IranMapPickerPreview() {
  // Satori cannot render nested <svg>, so the map is embedded as an image.
  const shapes = IRAN_PROVINCE_SHAPES.map(
    (province) =>
      `<path d="${province.d}" fill="${
        province.id === "IR-23" ? "#f2f0ee" : "#383634"
      }" stroke="#191817" stroke-width="2"/>`
  ).join("")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
    IRAN_MAP_VIEWBOX.width
  } ${IRAN_MAP_VIEWBOX.height}">${shapes}</svg>`
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`

  const width = 300
  const height = Math.round(
    (width * IRAN_MAP_VIEWBOX.height) / IRAN_MAP_VIEWBOX.width
  )

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        width: "100%",
      }}
    >
      {/* Satori renders data URIs but next/image makes no sense inside an OG image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        width={width}
        height={height}
        style={{ display: "flex" }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "22px",
          fontWeight: 600,
          color: "#f2f0ee",
        }}
      >
        {reshapePersian("انتخاب استان روی نقشه تعاملی ایران")}
      </div>
    </div>
  )
}
