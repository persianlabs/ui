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

/**
 * rehype-pretty-code wraps fences carrying `title="..."` meta in a
 * <figure> whose figcaption holds the title. Without this mapper the
 * title leaks in as bare text above an untitled card, and stacked
 * titled fences run together with no separation. Mapping figure here
 * routes the fence through CodeBlock's own title header instead.
 */
function findTitle(node: ReactNode): string | null {
  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findTitle(child)
      if (found !== null) return found
    }
    return null
  }
  if (
    isValidElement<Record<string, unknown>>(node) &&
    "data-rehype-pretty-code-title" in node.props
  ) {
    return extractText(node)
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return findTitle(node.props.children)
  }
  return null
}

/** Strips the title-carrying figcaption, leaving the raw pre behind. */
function withoutTitle(node: ReactNode): ReactNode {
  if (Array.isArray(node)) {
    return node.map((child) => withoutTitle(child))
  }
  if (
    isValidElement<Record<string, unknown>>(node) &&
    "data-rehype-pretty-code-title" in node.props
  ) {
    return null
  }
  return node
}

export function PreFigure({ children }: { children?: ReactNode }) {
  const title = findTitle(children)

  // No pretty-code title: not a titled code fence — render as-is.
  if (title === null) {
    return <figure>{children}</figure>
  }

  const rest = extractText(withoutTitle(children))
    .replace(/^\n/, "")
    .replace(/\n$/, "")
  const lang = extractLanguage(children) ?? "tsx"

  return (
    <div className="mt-4">
      <CodeBlock code={rest} lang={lang} title={title} />
    </div>
  )
}
