import { Suspense } from "react"
import type { Metadata } from "next"
import { connection } from "next/server"

import { CreateApp } from "@/components/create/create-app"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Create",
  description:
    "Customize your base color, theme, fonts and radius, then copy one command to set up your project — RTL-first, Persian-typography components built on Base UI.",
}

// Mirrors the shadcn create layout: the site header on top, the designer
// frame filling the rest of the viewport at full width. No page title.
export default function CreatePage() {
  return (
    <div className="flex h-svh flex-col">
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col">
        <Suspense fallback={null}>
          <CreateDynamic />
        </Suspense>
      </main>
    </div>
  )
}

// The designer syncs URL params (baseColor, theme, …) into a preset code on
// first render — that needs REAL searchParams at hydration, not the empty
// values a static prerender provides. connection() opts this subtree into
// dynamic rendering (inside the Suspense boundary).
async function CreateDynamic() {
  await connection()
  return <CreateApp />
}
