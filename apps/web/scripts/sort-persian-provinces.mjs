#!/usr/bin/env node
/**
 * Sorts registry/base/lib/persian-provinces.ts alphabetically (Persian
 * collation) — provinces by name, and cities within each province by name —
 * then mirrors the result to packages/ui/src/lib/persian-provinces.ts.
 *
 * Sorting is done here, once, at the data level rather than at render time
 * in city-selector.tsx: the data is static (imported once at build time),
 * every consumer of the registry item benefits without needing their own
 * sort logic, and CitySelector's Combobox never has to re-sort ~1,150 items
 * on every mount or keystroke.
 *
 * Re-run after regenerating the source dataset:
 *   node apps/web/scripts/sort-persian-provinces.mjs
 */

import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_PATH = path.join(
  __dirname,
  "..",
  "registry",
  "base",
  "lib",
  "persian-provinces.ts"
)
const MIRROR_PATH = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "packages",
  "ui",
  "src",
  "lib",
  "persian-provinces.ts"
)

const collator = new Intl.Collator("fa")

const source = readFileSync(SOURCE_PATH, "utf8")

const startMarker = "persianProvinces: PersianProvince[] = "
const endMarker = "export function getProvinceById"

const markerIndex = source.indexOf(startMarker)
const arrayStart = markerIndex === -1 ? -1 : markerIndex + startMarker.length
const endMarkerIndex = source.indexOf(endMarker)
if (arrayStart === -1 || endMarkerIndex === -1) {
  throw new Error("Could not locate the persianProvinces array literal")
}
// Trim back over the blank line(s) between the array's closing "]" and the
// following export, regardless of \n vs \r\n line endings.
const arrayEnd = source.slice(0, endMarkerIndex).replace(/\s+$/, "").length

const before = source.slice(0, arrayStart)
const arrayLiteral = source.slice(arrayStart, arrayEnd)
const after = source.slice(arrayEnd)

/** @type {{id: number, name: string, nameEn: string, cities: {id: number, name: string, nameEn: string}[]}[]} */
const provinces = JSON.parse(arrayLiteral)

provinces.sort((a, b) => collator.compare(a.name, b.name))
for (const province of provinces) {
  province.cities.sort((a, b) => collator.compare(a.name, b.name))
}

const sortedLiteral = JSON.stringify(provinces, null, 2)
const output = `${before}${sortedLiteral}\n\n${after}`

writeFileSync(SOURCE_PATH, output)
writeFileSync(MIRROR_PATH, output)

console.log(
  `Sorted ${provinces.length} provinces and ${provinces.reduce((sum, p) => sum + p.cities.length, 0)} cities.`
)
