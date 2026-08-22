import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
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
      {
        source: "/docs/utilities/:slug.md",
        destination: "/docs/utilities/:slug/markdown",
      },
    ]
  },
}

export default nextConfig
