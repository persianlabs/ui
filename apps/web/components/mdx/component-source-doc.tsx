import { CodeBlock } from "@/components/code-block"
import {
  getComponentSource,
  getHookSource,
  getLibSource,
} from "@/lib/component-source"

/**
 * Name-based source block for MDX pages — the "copy the component source"
 * step of manual installation. Reads the consumer-ready file straight from
 * registry/base/, like the old pages did via getComponentSource et al.
 */
export function ComponentSourceDoc({
  name,
  kind = "component",
  title,
}: {
  /** File base name under registry/base/{ui,hooks,lib}. */
  name: string
  kind?: "component" | "hook" | "lib"
  /** Filename shown in the header bar, e.g. "components/ui/alert.tsx". */
  title: string
}) {
  const code =
    kind === "hook"
      ? getHookSource(name)
      : kind === "lib"
        ? getLibSource(name)
        : getComponentSource(name)

  return (
    <CodeBlock
      code={code}
      lang={kind === "component" ? "tsx" : "ts"}
      title={title}
    />
  )
}
