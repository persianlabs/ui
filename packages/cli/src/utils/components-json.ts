import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { REGISTRY_URL } from "../registry/constants.js"

// The project's components.json is the single source of truth for the
// stock shadcn CLI. We ensure our namespace is registered so
// `npx shadcn add @persianlabs/button` works without our CLI present,
// and we always pin rtl: true.
export async function readComponentsJson(cwd: string) {
  const file = path.resolve(cwd, "components.json")
  try {
    return JSON.parse(await readFile(file, "utf8"))
  } catch {
    return null
  }
}

export async function writeComponentsJson(cwd: string, force = false) {
  const file = path.resolve(cwd, "components.json")
  const existing = await readComponentsJson(cwd)

  if (existing && !force) {
    // Merge: add/repair our namespace and rtl flag, keep everything else.
    const next = {
      ...existing,
      rtl: true,
      registries: {
        "@persianlabs": `${REGISTRY_URL}/r/{name}.json`,
        ...(existing.registries ?? {}),
      },
    }
    await writeFile(file, JSON.stringify(next, null, 2) + "\n")
    return file
  }

  const next = {
    $schema: `${REGISTRY_URL}/schema.json`,
    style: "base",
    rtl: true,
    tailwind: {
      css: "app/globals.css",
      baseColor: "neutral",
    },
    iconLibrary: "lucide",
    registries: {
      "@persianlabs": `${REGISTRY_URL}/r/{name}.json`,
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
  }
  await writeFile(file, JSON.stringify(next, null, 2) + "\n")
  return file
}
