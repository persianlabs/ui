import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  // Doc pages read their .mdx sources at request time (getText("raw") for
  // the markdown endpoint and the copy-page button) - without tracing them
  // into the build output, deployments miss the files and throw ENOENT.
  outputFileTracingIncludes: {
    // Keys are picomatch globs against the route path - bracket segments
    // must be escaped (see Next docs example).
    "/docs": ["./content/docs/**/*"],
    "/docs/\\[...slug\\]": ["./content/docs/**/*"],
    "/markdown/\\[\\[...slug\\]\\]": ["./content/docs/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/shadcn.png",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/docs.md", destination: "/markdown" },
      { source: "/docs/:path*.md", destination: "/markdown/:path*" },
    ]
  },
}

export default createMDX()(nextConfig)
