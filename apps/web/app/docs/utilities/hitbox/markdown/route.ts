import { hitboxMarkdown } from "../page"

export async function GET() {
  return new Response(hitboxMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
