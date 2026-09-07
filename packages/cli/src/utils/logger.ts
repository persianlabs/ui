// Minimal logger — mirrors shadcn CLI's output style.
const prefix = ""

export const logger = {
  log: (...args: unknown[]) => console.log(prefix, ...args),
  warn: (...args: unknown[]) => console.warn(prefix, ...args),
  error: (...args: unknown[]) => console.error(prefix, ...args),
  break: () => console.log(""),
  success: (msg: string) => console.log(`${prefix} ✔ ${msg}`),
}
