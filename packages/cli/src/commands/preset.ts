import { spawn } from "node:child_process"

import { decodePreset, isPresetCode } from "../preset/preset.js"
import { createUrl } from "../registry/constants.js"
import { logger } from "../utils/logger.js"

// preset: inspect preset codes.
//   persianlabsui preset decode b1x2y3   → print the decoded config
//   persianlabsui preset url b1x2y3      → print the create URL
//   persianlabsui preset open b1x2y3     → open the create page in a browser
export async function runPreset(
  action: string,
  code: string | undefined,
  options: { json?: boolean }
) {
  if (!code) {
    throw new Error(`Missing preset code. Usage: persianlabsui preset ${action} <code>`)
  }

  if (!isPresetCode(code)) {
    throw new Error(`Invalid preset code: ${code}`)
  }

  const config = decodePreset(code)
  if (!config) {
    throw new Error(`Invalid preset code: ${code}`)
  }

  const url = createUrl(code)

  switch (action) {
    case "decode": {
      if (options.json) {
        console.log(JSON.stringify({ code, url, values: config }, null, 2))
        return
      }
      logger.log(`Preset: ${code}`)
      logger.log(`URL: ${url}`)
      for (const [key, value] of Object.entries(config)) {
        logger.log(`  ${key}: ${value}`)
      }
      return
    }

    case "url": {
      console.log(url)
      return
    }

    case "open": {
      spawn("open", [url], { shell: true, stdio: "ignore" }).on("error", () => {
        logger.log(`Open this URL in your browser: ${url}`)
      })
      return
    }

    default:
      throw new Error(
        `Unknown preset action: ${action}. Use decode, url or open.`
      )
  }
}
