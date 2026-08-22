import { useCountdownMarkdown } from "../page"

export async function GET() {
  return new Response(useCountdownMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
