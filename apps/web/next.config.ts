import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  async rewrites() {
    return [
      { source: "/docs.md", destination: "/docs/markdown" },
      { source: "/docs/theming.md", destination: "/docs/theming/markdown" },
      {
        source: "/docs/components.md",
        destination: "/docs/components/markdown",
      },
      {
        source: "/docs/components/:slug.md",
        destination: "/docs/components/:slug/markdown",
      },
    ]
  },
}

export default nextConfig
