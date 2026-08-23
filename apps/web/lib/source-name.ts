/**
 * Registry/doc asset names are kebab-case slugs by convention. Validating
 * here keeps filesystem reads anchored to their intended directories and
 * turns typos into explicit errors instead of ENOENT from odd paths.
 */
const SAFE_NAME_PATTERN = /^[a-z0-9][a-z0-9-]*$/

export function assertSafeName(name: string, kind: string): string {
  if (!SAFE_NAME_PATTERN.test(name)) {
    throw new Error(`Invalid ${kind} name: ${JSON.stringify(name)}`)
  }
  return name
}
