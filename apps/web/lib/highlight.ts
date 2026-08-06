import { cacheLife } from "next/cache"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

const CODE_THEME = {
  light: "vitesse-light",
  dark: "vitesse-black",
} as const

let processor: ReturnType<typeof createProcessor> | null = null

function createProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: CODE_THEME,
      keepBackground: false,
    })
    .use(rehypeStringify)
}

export async function highlightCode(code: string, lang: string) {
  "use cache"
  cacheLife("max")

  processor ??= createProcessor()

  const fence = "```"
  const markdown = `${fence}${lang} showLineNumbers\n${code}\n${fence}`
  const file = await processor.process(markdown)

  return String(file)
}
