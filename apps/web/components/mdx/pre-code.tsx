import { isValidElement, type ReactNode } from "react"

import { CodeBlock } from "@/components/code-block"

/** Recursively pulls plain text out of a React tree. */
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children)
  }

  return ""
}

/** Finds the fence language from data-language attributes in the tree. */
function extractLanguage(node: ReactNode): string | null {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = extractLanguage(child)

      if (found) return found
    }

    return null
  }
  if (isValidElement<Record<string, unknown>>(node)) {
    const lang = node.props["data-language"]

    if (typeof lang === "string") return lang

    return extractLanguage(node.props.children as ReactNode)
  }

  return null
}

/**
 * Maps fenced code blocks (<pre>) in MDX to <CodeBlock> itself, so they get
 * the exact same shell as before the migration — rounded card, hover copy,
 * padding, line numbers, dual-theme highlighting — instead of a second,
 * subtly different highlighter pipeline. The mt-4 wrapper restores the
 * vertical rhythm the old hand-written pages had around every code card.
 */
export function PreCode({ children }: { children?: ReactNode }) {
  const raw = extractText(children).replace(/^\n/, "").replace(/\n$/, "")
  const lang = extractLanguage(children) ?? "tsx"

  return (
    <div className="mt-4">
      <CodeBlock code={raw} lang={lang} />
    </div>
  )
}
