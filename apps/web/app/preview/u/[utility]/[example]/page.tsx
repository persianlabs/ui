import { PreviewFrame } from "@/components/preview-frame"

export const instant = false

export default async function UtilityPreviewPage(
  props: PageProps<"/preview/u/[utility]/[example]">
) {
  const { utility, example } = await props.params

  return <PreviewFrame category="utilities" slug={utility} example={example} />
}
