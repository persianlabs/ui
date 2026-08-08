"use client"

import dynamic from "next/dynamic"

/**
 * @tanstack/react-table's internal memoizer reads Date.now() during render,
 * which Next.js's Cache Components flags as a blocking, non-deterministic
 * value if it's touched during prerendering. Deferring this example to a
 * client-only render sidesteps that entirely. `next/dynamic`'s `ssr: false`
 * option is only allowed inside a Client Component, hence this wrapper.
 */
export const TableTanstackExample = dynamic(
  () => import("./table-tanstack").then((mod) => mod.TableTanstackExample),
  { ssr: false }
)
