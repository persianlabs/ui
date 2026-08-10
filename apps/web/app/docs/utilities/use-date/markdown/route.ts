import { useDateMarkdown } from "../page"

export async function GET() {
  return new Response(useDateMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
