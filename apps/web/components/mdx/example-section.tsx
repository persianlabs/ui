import type { ReactNode } from "react"

import { ComponentPreviewDoc } from "@/components/mdx/component-preview-doc"

/**
 * Shared example subsection header + preview, replacing the per-page local
 * ExampleSection helpers of the old TSX pages. The example name is resolved
 * at migration time into the `name` prop.
 */
export async function DocExampleSection({
  id,
  title,
  description,
  name,
  direction,
}: {
  id: string
  title: string
  description: ReactNode
  /** Example file base under components/examples/, e.g. "calendar-jalali". */
  name: string
  direction?: "ltr" | "rtl"
}) {
  return (
    <div className="mt-8">
      <h3 id={id} className="text-sm font-medium text-muted-foreground">
        {title}
      </h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-3">
        <ComponentPreviewDoc name={name} direction={direction} />
      </div>
    </div>
  )
}
