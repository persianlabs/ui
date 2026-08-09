import { useMediaQueryMarkdown } from "../page"

export async function GET() {
  return new Response(useMediaQueryMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
