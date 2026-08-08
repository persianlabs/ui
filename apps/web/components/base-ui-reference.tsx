import { ExternalLinkIcon } from "lucide-react"

export function BaseUiReference({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <p className="mt-4 text-sm text-muted-foreground">
      See the inherited API in{" "}
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-foreground underline underline-offset-4"
      >
        Base UI {label} <ExternalLinkIcon className="size-3" />
      </a>
      .
    </p>
  )
}
