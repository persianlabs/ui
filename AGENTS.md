<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Component and utility previews

Every new component or utility must include both a gallery preview image and an Open Graph image. Follow the repository workflow in `CLAUDE.md`: add the inline-style thumbnail preview, wire it into the gallery when applicable, and add the component's `opengraph-image.tsx` route with its matching OG preview.

## Before pushing

Before every push, run `bun run lint` and `bun run format`. Resolve any errors and include Prettier's formatting changes in the same commit before pushing.
