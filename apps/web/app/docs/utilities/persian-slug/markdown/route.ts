import { persianSlugMarkdown } from "../page"

export async function GET() {
  return new Response(persianSlugMarkdown, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
