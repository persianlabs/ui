import fs from "node:fs"
import path from "node:path"

import { assertSafeName } from "./source-name"

export function getComponentSource(name: string) {
  assertSafeName(name, "component")
  const base = path.join(process.cwd(), "registry", "base", "ui")
  const tsx = path.join(base, `${name}.tsx`)
  if (fs.existsSync(tsx)) return fs.readFileSync(tsx, "utf8").trim()
  const ts = path.join(base, `${name}.ts`)
  return fs.readFileSync(ts, "utf8").trim()
}

export function getLibSource(name: string) {
  assertSafeName(name, "lib")
  const filePath = path.join(
    process.cwd(),
    "registry",
    "base",
    "lib",
    `${name}.ts`
  )

  return fs.readFileSync(filePath, "utf8").trim()
}

export function getHookSource(name: string) {
  assertSafeName(name, "hook")
  const filePath = path.join(
    process.cwd(),
    "registry",
    "base",
    "hooks",
    `${name}.ts`
  )

  return fs.readFileSync(filePath, "utf8").trim()
}
