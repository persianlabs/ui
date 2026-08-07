import { CheckCircle2Icon, GitBranchIcon } from "lucide-react"

import { Badge } from "@/components/badge"

export interface CreditsSource {
  label: string
  href: string
}

export function Credits({
  sources,
  changed,
  changes,
  published = true,
}: {
  /** Where the component's source/data was copied from. */
  sources: CreditsSource[]
  /** Whether anything was changed relative to the source(s). */
  changed: boolean
  /** What was changed, when `changed` is true. */
  changes?: string[]
  /** Whether this component is published/shipped in the registry. */
  published?: boolean
}) {
  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/30 px-4 py-3.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-foreground">Credits</span>
        <Badge variant={changed ? "default" : "muted"}>
          {changed ? "Modified" : "Unchanged"}
        </Badge>
        {published && (
          <Badge
            variant="muted"
            className="inline-flex items-center gap-1 pl-1"
          >
            <CheckCircle2Icon className="size-2.5" />
            Published
          </Badge>
        )}
      </div>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        <GitBranchIcon className="mr-1 inline size-3.5 -translate-y-px" />
        Copied from{" "}
        {sources.map((source, index) => (
          <span key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              {source.label}
            </a>
            {index < sources.length - 2 && ", "}
            {index === sources.length - 2 && " and "}
          </span>
        ))}
        .
      </p>

      {changed && changes && changes.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
          {changes.map((change) => (
            <li key={change} className="leading-relaxed text-muted-foreground">
              {change}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
