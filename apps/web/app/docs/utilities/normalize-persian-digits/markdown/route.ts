import { normalizePersianDigitsMarkdown } from "../page"

export async function GET() {
  return new Response(normalizePersianDigitsMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
