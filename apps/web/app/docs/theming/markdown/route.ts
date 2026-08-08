import { getThemingMarkdown } from "../page"

export async function GET() {
  return new Response(getThemingMarkdown(), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
