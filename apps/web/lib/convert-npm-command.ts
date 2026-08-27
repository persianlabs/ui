/** Package managers — plus the AI "prompt" tab — a command block switches between. */
export type PackageManager = "prompt" | "pnpm" | "yarn" | "npm" | "bun"

/**
 * Result of converting an npm command to every package manager.
 */
export interface ConvertNpmCommandResult {
  /** Command for pnpm. */
  pnpm: string
  /** Command for yarn. */
  yarn: string
  /** Command for npm. */
  npm: string
  /** Command for bun. */
  bun: string
}

/**
 * Converts a standard npm command into equivalent commands for pnpm, yarn,
 * npm, and bun — the result spreads directly into `CodeBlockCommand`.
 *
 * Supported patterns: `npm install …`, `npx create-…`, `npm create …`,
 * `npx …`, `npm run …`. Anything else passes through unchanged.
 *
 * Lives outside the client component so Server Components (InstallTabs,
 * components-catalog) can call it during render without an RSC violation.
 */
export function convertNpmCommand(npmCommand: string): ConvertNpmCommandResult {
  if (npmCommand.startsWith("npm install")) {
    return {
      pnpm: npmCommand.replaceAll("npm install", "pnpm add"),
      yarn: npmCommand.replaceAll("npm install", "yarn add"),
      npm: npmCommand,
      bun: npmCommand.replaceAll("npm install", "bun add"),
    }
  }

  // npx create- must be checked before the generic npx branch.
  if (npmCommand.startsWith("npx create-")) {
    return {
      pnpm: npmCommand.replace("npx create-", "pnpm create "),
      yarn: npmCommand.replace("npx create-", "yarn create "),
      npm: npmCommand,
      bun: npmCommand.replace("npx", "bunx --bun"),
    }
  }

  if (npmCommand.startsWith("npm create")) {
    return {
      pnpm: npmCommand.replace("npm create", "pnpm create"),
      yarn: npmCommand.replace("npm create", "yarn create"),
      npm: npmCommand,
      bun: npmCommand.replace("npm create", "bun create"),
    }
  }

  if (npmCommand.startsWith("npx")) {
    return {
      pnpm: npmCommand.replace("npx", "pnpm dlx"),
      yarn: npmCommand.replace("npx", "yarn dlx"),
      npm: npmCommand,
      bun: npmCommand.replace("npx", "bunx --bun"),
    }
  }

  if (npmCommand.startsWith("npm run")) {
    return {
      pnpm: npmCommand.replace("npm run", "pnpm"),
      yarn: npmCommand.replace("npm run", "yarn"),
      npm: npmCommand,
      bun: npmCommand.replace("npm run", "bun"),
    }
  }

  return {
    pnpm: npmCommand,
    yarn: npmCommand,
    npm: npmCommand,
    bun: npmCommand,
  }
}
