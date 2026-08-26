import fs from "node:fs"
import path from "node:path"

/**
 * Generates packages/ui/src/components/iran-map-data.ts from OpenStreetMap
 * province polygons (fetched from shahrzadpeyman/metabase-iran-geojson-map).
 *
 * Pipeline per province: outer rings -> tiny-island culling -> Douglas-
 * Peucker simplification -> equirectangular projection -> rounded SVG path.
 * Regenerate with: bun scripts/generate-iran-map.mts [path-to-geojson]
 */

const SOURCE_URL =
  "https://raw.githubusercontent.com/shahrzadpeyman/metabase-iran-geojson-map/main/31Provinces_Iran_Map.json"

const TOLERANCE = 0.02 // degrees, Douglas-Peucker
const MIN_RING_AREA = 0.008 // square degrees, island culling
const SCALE = 50 // projected units per degree

const NAME_FIXES: Record<string, string> = {
  "خراسانشمالی": "خراسان شمالی",
  "خراسانجنوبی": "خراسان جنوبی",
  "خراسانرضوی": "خراسان رضوی",
  "چهارمحالوبختیاری": "چهارمحال و بختیاری",
  "کهگیلویهوبویراحمد": "کهگیلویه و بویراحمد",
  "کهگیلویه و بویر احمد": "کهگیلویه و بویراحمد",
  "سیستانوبلوچستان": "سیستان و بلوچستان",
  "آذربایجانشرقی": "آذربایجان شرقی",
  "آذربایجانغربی": "آذربایجان غربی",
}

type Ring = [number, number][]

function perpDistance(
  p: [number, number],
  a: [number, number],
  b: [number, number]
): number {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const length = Math.hypot(dx, dy)
  if (length === 0) return Math.hypot(p[0] - a[0], p[1] - a[1])
  return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / length
}

/** Iterative Douglas-Peucker to avoid recursion blowups on long coastlines. */
function simplify(ring: Ring, tolerance: number): Ring {
  if (ring.length <= 4) return ring
  const keep = new Array<boolean>(ring.length).fill(false)
  keep[0] = true
  keep[ring.length - 1] = true

  const stack: [number, number][] = [[0, ring.length - 1]]
  while (stack.length > 0) {
    const [start, end] = stack.pop()!
    let maxDistance = 0
    let index = -1
    for (let i = start + 1; i < end; i += 1) {
      const distance = perpDistance(ring[i]!, ring[start]!, ring[end]!)
      if (distance > maxDistance) {
        maxDistance = distance
        index = i
      }
    }
    if (maxDistance > tolerance && index > 0) {
      keep[index] = true
      stack.push([start, index], [index, end])
    }
  }
  return ring.filter((_, i) => keep[i])
}

function signedArea(ring: Ring): number {
  let sum = 0
  for (let i = 0; i < ring.length - 1; i += 1) {
    sum += ring[i]![0] * ring[i + 1]![1] - ring[i + 1]![0] * ring[i]![1]
  }
  return Math.abs(sum / 2)
}

function closeRing(points: Ring): Ring {
  const first = points[0]!
  const last = points[points.length - 1]!
  return first[0] === last[0] && first[1] === last[1]
    ? points
    : [...points, first]
}

const COS_LAT = Math.cos((32.5 * Math.PI) / 180)

async function main() {
  const input = process.argv[2]
  const json =
    input && fs.existsSync(input)
      ? JSON.parse(fs.readFileSync(input, "utf8"))
      : await (await fetch(SOURCE_URL)).json()

  const provinces: {
    id: string
    fa: string
    en: string
    d: string
  }[] = []
  const bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }

  for (const feature of json.features) {
    const tags = feature.properties?.tags ?? {}
    const rawFa: string = feature.properties?.name_fa ?? ""
    const fa = NAME_FIXES[rawFa] ?? rawFa.replace(/^استان\s*/, "")
    const en: string = (
      feature.properties?.name_en ?? ""
    ).replace(/\s+Province$/i, "")
    const id: string =
      tags["ISO3166-2"] ?? `IR-${feature.properties?.id ?? provinces.length + 1}`

    const geometry = feature.geometry
    const polygons: Ring[][] =
      geometry.type === "Polygon"
        ? [geometry.coordinates]
        : geometry.coordinates

    const projectedRings: string[] = []
    for (const polygon of polygons) {
      const outer = polygon[0] as Ring
      if (!outer || signedArea(outer) < MIN_RING_AREA) continue

      const simplified = simplify(closeRing(outer), TOLERANCE)
      if (simplified.length < 4) continue

      const projected: [number, number][] = simplified.map(
        ([lon, lat]): [number, number] => [
          Math.round(lon * COS_LAT * SCALE * 100) / 100,
          Math.round(-lat * SCALE * 100) / 100,
        ]
      )

      for (const [x, y] of projected) {
        bounds.minX = Math.min(bounds.minX, x)
        bounds.minY = Math.min(bounds.minY, y)
        bounds.maxX = Math.max(bounds.maxX, x)
        bounds.maxY = Math.max(bounds.maxY, y)
      }

      projectedRings.push(
        projected.map(([x, y]) => `${x},${y}`).join("L")
      )
    }

    if (projectedRings.length === 0) continue

    provinces.push({
      id,
      fa,
      en,
      d: projectedRings.map((ring) => `M${ring}Z`).join(""),
    })
  }

  // Shift everything so the map starts at 0,0.
  const shifted = provinces.map((province) => ({
    ...province,
    d: province.d.replace(
      /(\d+\.?\d*),(-?\d+\.?\d*)/g,
      (_, x, y) =>
        `${Math.round((Number(x) - bounds.minX) * 100) / 100},${Math.round((Number(y) - bounds.minY) * 100) / 100}`
    ),
  }))

  const width = Math.ceil(bounds.maxX - bounds.minX)
  const height = Math.ceil(bounds.maxY - bounds.minY)

  const totalPoints = shifted.reduce(
    (sum, province) => sum + (province.d.match(/,/g)?.length ?? 0),
    0
  )

  const out = `/**
 * GENERATED by scripts/generate-iran-map.mts - do not edit.
 *
 * Simplified boundary polygons for Iran's 31 provinces, sourced from
 * OpenStreetMap (ODbL) via shahrzadpeyman/metabase-iran-geojson-map.
 * Coordinates are projected (lon scaled by cos 32.5deg) into a
 * ${width}x${height} viewBox.
 */
export interface IranProvinceShape {
  /** ISO 3166-2 code, e.g. "IR-28". */
  id: string
  /** Persian display name without the «استان» prefix. */
  fa: string
  /** English display name. */
  en: string
  /** Simplified SVG path in the IRAN_MAP_VIEWBOX coordinate space. */
  d: string
}

export const IRAN_PROVINCE_SHAPES: IranProvinceShape[] = ${JSON.stringify(shifted, null, 2)}

export const IRAN_MAP_VIEWBOX = { width: ${width}, height: ${height} }
`

  const target = path.join(
    process.cwd(),
    "..",
    "..",
    "packages",
    "ui",
    "src",
    "components",
    "iran-map-data.ts"
  )
  fs.writeFileSync(target, out)
  console.log(
    `[iran-map] ${shifted.length} provinces, ${totalPoints} points, viewBox ${width}x${height}, ${(Buffer.byteLength(out) / 1024).toFixed(1)} KB`
  )
}

main()
