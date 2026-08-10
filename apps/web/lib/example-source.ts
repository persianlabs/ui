import fs from "node:fs"
import path from "node:path"

export function getExampleSource(name: string) {
  const filePath = path.join(
    process.cwd(),
    "components",
    "examples",
    `${name}.tsx`
  )
  const source = fs.readFileSync(filePath, "utf8").trim()

  return source
    .replaceAll("@workspace/ui/components/", "@/components/ui/")
    .replaceAll("@workspace/ui/hooks/", "@/hooks/")
    .replaceAll("@workspace/ui/lib/", "@/lib/")
}
