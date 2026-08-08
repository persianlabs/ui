import { introMarkdown } from "../page"

export async function GET() {
  return new Response(introMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
