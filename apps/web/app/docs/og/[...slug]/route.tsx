import { OG_PREVIEWS } from "@/components/previews/og/__map__"
import { buildOgImage } from "@/lib/og-image"
import { source } from "@/lib/source"

type RouteContext = {
  params: Promise<{ slug?: string[] }>
}

/**
 * Per-doc-page OG images. Serves /docs/og/<group>/<name> so every docs page
 * can reference a unique social card without a per-page file-convention
 * route (Turbopack rejects static segments after a catch-all).
 */
export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params
  const page = source.getPage(slug ?? [])

  if (!page) {
    return new Response("Not found", { status: 404 })
  }

  const name = slug?.at(-1)
  const Preview = name ? OG_PREVIEWS[name] : undefined

  return buildOgImage(
    page.data.title,
    page.data.description ?? "",
    Preview ? <Preview /> : undefined
  )
}
