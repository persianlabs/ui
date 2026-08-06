import fs from "node:fs"
import path from "node:path"

function readGlobalsCss() {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "packages",
    "ui",
    "src",
    "styles",
    "globals.css"
  )
  return fs.readFileSync(filePath, "utf8")
}

export function getThemeVariables() {
  const css = readGlobalsCss()

  const light = css.match(/:root,\s*\n\.light\s*\{[\s\S]*?\n\}/)?.[0] ?? ""
  const dark = css.match(/\n\.dark\s*\{[\s\S]*?\n\}/)?.[0]?.trim() ?? ""

  return { light, dark }
}
