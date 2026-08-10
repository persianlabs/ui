import { persianHolidaysMarkdown } from "../page"

export async function GET() {
  return new Response(persianHolidaysMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
