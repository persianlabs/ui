import { useControllableStateMarkdown } from "../page"

export async function GET() {
  return new Response(useControllableStateMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
