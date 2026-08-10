import { zPersianDateMarkdown } from "../page"

export async function GET() {
  return new Response(zPersianDateMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
