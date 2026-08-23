import fs from "node:fs"
import path from "node:path"

import { assertSafeName } from "./source-name"

export function getComponentSource(name: string) {
  assertSafeName(name, "component")
  const filePath = path.join(
    process.cwd(),
    "registry",
    "base",
    "ui",
    `${name}.tsx`
  )

  return fs.readFileSync(filePath, "utf8").trim()
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
