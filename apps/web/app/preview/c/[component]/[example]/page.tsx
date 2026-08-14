import { PreviewFrame } from "@/components/preview-frame"

export const instant = false

export default async function ComponentPreviewPage(
  props: PageProps<"/preview/c/[component]/[example]">
) {
  const { component, example } = await props.params

  return (
    <PreviewFrame category="components" slug={component} example={example} />
  )
}
