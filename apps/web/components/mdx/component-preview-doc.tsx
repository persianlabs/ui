import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { exampleLoaders } from "@/components/examples/__map__"
import { getExampleSource } from "@/lib/example-source"

/**
 * Name-based <ComponentPreview> for MDX pages. Resolves the live example by
 * name from the generated examples map and pairs it with its real source,
 * exactly like the old TSX pages passed preview={<FooExample />} +
 * code={<CodeBlock code={getExampleSource("foo")} />}.
 */
export async function ComponentPreviewDoc({
  name,
  direction,
  className,
}: {
  name: string
  /** Locks the preview direction, like the old dir="rtl" prop. */
  direction?: "ltr" | "rtl"
  className?: string
}) {
  const loader = exampleLoaders[name]

  if (!loader) {
    throw new Error(
      `[ComponentPreview] Unknown example "${name}". Add it under components/examples/ and regenerate the examples map.`
    )
  }

  const Example = await loader()

  return (
    <ComponentPreview
      // Old pages wrapped every preview in a `mt-4` div; keep that gap
      // between section headings/prose and the card.
      className={className ?? "mt-4"}
      dir={direction}
      preview={<Example />}
      code={<CodeBlock code={getExampleSource(name)} lang="tsx" />}
    />
  )
}
