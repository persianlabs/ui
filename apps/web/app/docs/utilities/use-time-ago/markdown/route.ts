import { useTimeAgoMarkdown } from "../page"

export async function GET() {
  return new Response(useTimeAgoMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
