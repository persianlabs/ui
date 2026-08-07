import { CopyButton } from "@/components/copy-button"
import { highlightCode } from "@/lib/highlight"

export async function CodeBlock({
  code,
  lang = "tsx",
  className,
  copyText,
  title,
}: {
  code: string
  lang?: string
  className?: string
  copyText?: string
  /** Filename shown in a header bar above the code, e.g. "components/ui/button.tsx". */
  title?: string
}) {
  const html = await highlightCode(code, lang)

  return (
    <div
      className={
        "group/code relative overflow-hidden rounded-2xl border border-border bg-card " +
        (className ?? "")
      }
    >
      {title && (
        <div className="border-b border-border/50 px-4 py-2.5 font-mono text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <div
        className={
          "absolute right-2 z-10 opacity-0 transition-opacity group-hover/code:opacity-100 " +
          (title ? "top-1.5" : "top-2")
        }
      >
        <CopyButton
          text={copyText ?? code}
          label="Copy code"
          className="rounded-md border border-border bg-background/80 p-1.5 backdrop-blur-sm"
        />
      </div>
      <div
        className="code-block-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
