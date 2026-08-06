import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"

const routes = [
  "",
  "/docs",
  "/docs/theming",
  "/docs/components",
  "/docs/components/tabs",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }))
}
