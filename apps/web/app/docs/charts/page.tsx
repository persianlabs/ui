import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Charts",
  description: "Explore chart components from bklit.com.",
}

export default function ChartsPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">Charts</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Looking for chart components? Visit{" "}
        <a
          href="https://bklit.com/"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          bklit.com
        </a>{" "}
        for a dedicated collection of chart components.
      </p>
    </article>
  )
}
