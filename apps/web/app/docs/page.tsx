import type { Metadata } from "next"

import DocsDocPage, {
  docsGenerateMetadata,
} from "@/components/mdx/docs-doc-page"

export const instant = false

export function generateStaticParams() {
  return [{}]
}

export function generateMetadata(): Promise<Metadata> {
  return docsGenerateMetadata({ params: Promise.resolve({ slug: [] }) })
}

export default function DocsIntroductionPage() {
  return <DocsDocPage slug={[]} />
}
