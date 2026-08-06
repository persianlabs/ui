import { nextJsConfig } from "@workspace/eslint-config/next-js"

/** @type {import("eslint").Linter.Config} */
export default [
  // Registry source files use consumer-project import conventions
  // (@/components/ui/*, @/lib/utils) that don't resolve inside this
  // monorepo — they're templates for `shadcn build`, not app code.
  { ignores: ["registry/**"] },
  ...nextJsConfig,
]
