import type { MetadataRoute } from "next"

import { getFlatDocsNav } from "@/lib/docs-nav"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...getFlatDocsNav().map((item) => item.href)]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }))
}
