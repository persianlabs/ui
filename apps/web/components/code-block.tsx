import { CopyButton } from "@/components/copy-button"
import { highlightCode } from "@/lib/highlight"

export async function CodeBlock({
  code,
  lang = "tsx",
  className,
  copyText,
}: {
  code: string
  lang?: string
  className?: string
  copyText?: string
}) {
  const html = await highlightCode(code, lang)

  return (
    <div
      className={
        "border-border bg-card group/code relative overflow-hidden rounded-lg border " +
        (className ?? "")
      }
    >
      <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover/code:opacity-100">
        <CopyButton
          text={copyText ?? code}
          label="Copy code"
          className="bg-background/80 border-border rounded-md border p-1.5 backdrop-blur-sm"
        />
      </div>
      <div
        className="code-block-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
