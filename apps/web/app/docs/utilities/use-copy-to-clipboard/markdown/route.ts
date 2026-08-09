import { useCopyToClipboardMarkdown } from "../page"

export async function GET() {
  return new Response(useCopyToClipboardMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
