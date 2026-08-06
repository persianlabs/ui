import fs from "node:fs"
import path from "node:path"

export function getComponentSource(name: string) {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "packages",
    "ui",
    "src",
    "components",
    `${name}.tsx`
  )
  const source = fs.readFileSync(filePath, "utf8").trim()

  return source.replaceAll("@workspace/ui/lib/", "@/lib/")
}

export function getLibSource(name: string) {
  const filePath = path.join(
    process.cwd(),
    "..",
    "..",
    "packages",
    "ui",
    "src",
    "lib",
    `${name}.ts`
  )

  return fs.readFileSync(filePath, "utf8").trim()
}
