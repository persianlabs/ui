import { LastUpdated } from "@/components/last-updated"
import { getLastEditedDate } from "@/lib/last-edited"

/**
 * Async server island for MDX pages: renders <LastUpdated> for a given
 * repo-relative file, so the date keeps tracking the doc's own content
 * (now the .mdx file instead of the old page.tsx).
 */
export async function DocLastEdited({ path }: { path: string }) {
  const date = getLastEditedDate(path)

  return <LastUpdated date={date} />
}
