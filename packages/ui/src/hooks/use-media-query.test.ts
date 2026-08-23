import { describe, expect, it } from "vitest"

import { parseQuery } from "./use-media-query.js"

// Real values from the module's BREAKPOINTS table:
// sm=640, md=800, lg=1024, xl=1280, 2xl=1536, 3xl=1600, 4xl=2000
describe("parseQuery", () => {
  describe("object form", () => {
    it("resolves a named min breakpoint", () => {
      expect(parseQuery({ min: "md" })).toBe("(min-width: 800px)")
    })

    it("resolves a named max breakpoint one pixel below", () => {
      expect(parseQuery({ max: "lg" })).toBe("(max-width: 1023px)")
    })

    it("joins min and max with `and`", () => {
      expect(parseQuery({ min: "sm", max: "md" })).toBe(
        "(min-width: 640px) and (max-width: 799px)"
      )
    })

    it("resolves pointer coarse", () => {
      expect(parseQuery({ pointer: "coarse" })).toBe("(pointer: coarse)")
    })

    it("uses numeric px values as-is for min", () => {
      expect(parseQuery({ min: 500 })).toBe("(min-width: 500px)")
    })

    it("subtracts one pixel from a numeric max", () => {
      expect(parseQuery({ max: 500 })).toBe("(max-width: 499px)")
    })

    it("falls back to a trivially-true query for an empty object", () => {
      expect(parseQuery({})).toBe("(min-width: 0px)")
    })
  })

  describe("string form starting with (", () => {
    it("passes raw media queries through verbatim", () => {
      expect(parseQuery("(prefers-reduced-motion: reduce)")).toBe(
        "(prefers-reduced-motion: reduce)"
      )
    })
  })

  describe("breakpoint name form", () => {
    it("resolves a single bare breakpoint as a min-width", () => {
      expect(parseQuery("md")).toBe("(min-width: 800px)")
    })

    it("resolves max-<bp> one pixel below the breakpoint", () => {
      expect(parseQuery("max-lg")).toBe("(max-width: 1023px)")
    })

    it("joins compound segments with `and` (each bare segment is a min)", () => {
      expect(parseQuery("sm:md")).toBe(
        "(min-width: 640px) and (min-width: 800px)"
      )
    })

    it("drops unknown segments but keeps known ones", () => {
      expect(parseQuery("bogus:md")).toBe("(min-width: 800px)")
    })

    it("returns the original string when every segment is unknown", () => {
      expect(parseQuery("bogus:alsobogus")).toBe("bogus:alsobogus")
    })
  })
})
