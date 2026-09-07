import { defineConfig } from "tsup"

export default defineConfig((options) => ({
  // Wipe dist for production builds, but preserve it during `--watch` so
  // the preset import the web app relies on never vanishes mid-reload.
  clean: !options.watch,
  entry: ["src/index.ts", "src/preset/preset.ts"],
  format: ["esm"],
  sourcemap: false,
  minify: true,
  target: "esnext",
  outDir: "dist",
  dts: true,
  treeshake: true,
}))
