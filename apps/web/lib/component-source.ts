import fs from "node:fs"
import path from "node:path"

export function getComponentSource(name: string) {
  const filePath = path.join(process.cwd(), "registry", "base", "ui", `${name}.tsx`)

  return fs.readFileSync(filePath, "utf8").trim()
}

export function getLibSource(name: string) {
  const filePath = path.join(process.cwd(), "registry", "base", "lib", `${name}.ts`)

  return fs.readFileSync(filePath, "utf8").trim()
}
