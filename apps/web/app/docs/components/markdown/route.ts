import { componentsMarkdown } from "../page"

export async function GET() {
  return new Response(componentsMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
