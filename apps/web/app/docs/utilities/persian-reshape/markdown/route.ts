import { persianReshapeMarkdown } from "../page"

export async function GET() {
  return new Response(persianReshapeMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
