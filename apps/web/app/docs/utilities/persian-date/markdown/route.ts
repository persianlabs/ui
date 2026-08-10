import { persianDateMarkdown } from "../page"

export async function GET() {
  return new Response(persianDateMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
