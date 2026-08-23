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
  // Baseline hardening for the public site. CSP ships report-only first:
  // shiki emits inline styles and Next injects inline bootstrap scripts, so
  // 'unsafe-inline' is required today; enforce (and tighten with nonces)
  // after the report-only phase collects violations without noise.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Preview frames iframe same-origin pages (components/preview-frame.tsx).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://images.unsplash.com https://github.com",
              "font-src 'self' data:",
              "connect-src 'self' https://va.vercel-scripts.com",
              "frame-ancestors 'self'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ]
  },
}

export default createMDX()(nextConfig)
