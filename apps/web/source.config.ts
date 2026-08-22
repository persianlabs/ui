import { pageSchema } from "fumadocs-core/source/schema"
import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"
import { z } from "zod"

export default defineConfig({
  mdxOptions: {
    // Fenced blocks get highlighted here by rehype-pretty-code (same
    // themes as lib/highlight.ts), and the <pre> mapper in
    // mdx-components.tsx wraps the result in <CodeBlock> so fences share
    // the exact shell of the old TSX pages — copy button, padding, line
    // numbers. Tailwind preflight neutralizes the extra <figure> wrappers
    // pretty-code adds.
    rehypeCodeOptions: false,
    rehypePlugins: (plugins) => [
      ...plugins,
      [
        rehypePrettyCode,
        {
          theme: {
            light: "vitesse-light",
            dark: "vitesse-black",
          },
          keepBackground: false,
        },
      ],
    ],
  },
})

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      badge: z.string().optional(),
      disabled: z.boolean().optional(),
    }),
  },
})
