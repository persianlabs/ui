import type { Metadata } from "next"

import DocsDocPage, {
  docsGenerateMetadata,
} from "@/components/mdx/docs-doc-page"
import { source } from "@/lib/source"

export const instant = false

type PageParams = Promise<{ slug: string[] }>

export function generateStaticParams() {
  return source
    .generateParams()
    .filter((params) => (params.slug?.length ?? 0) > 0)
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  const { slug } = await params

  return docsGenerateMetadata({ params: Promise.resolve({ slug }) })
}

export default async function DocsPage({ params }: { params: PageParams }) {
  const { slug } = await params

  return <DocsDocPage slug={slug} />
}
