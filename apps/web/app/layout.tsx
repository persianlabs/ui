import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_URL } from "@/lib/site"
import { cn } from "@workspace/ui/lib/utils"
import {
  AnchoredToastProvider,
  ToastProvider,
} from "@workspace/ui/components/toast"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  adjustFontFallback: false,
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  display: "swap",
})

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  adjustFontFallback: false,
  display: "swap",
})

const siteUrl = SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PersianLabs/ui — Copy-paste components for Persian interfaces",
    template: "%s — PersianLabs/ui",
  },
  description:
    "An open-source, RTL-first component library you copy, paste, and own. Ships with a shadcn registry — install any component straight into your codebase.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "PersianLabs/ui — Copy-paste components for Persian interfaces",
    description:
      "An open-source, RTL-first component library you copy, paste, and own. Ships with a shadcn registry — install any component straight into your codebase.",
    siteName: "PersianLabs/ui",
  },
  twitter: {
    card: "summary_large_image",
    title: "PersianLabs/ui — Copy-paste components for Persian interfaces",
    description:
      "An open-source, RTL-first component library you copy, paste, and own.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        vazirmatn.variable,
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <ToastProvider>
            <AnchoredToastProvider>{children}</AnchoredToastProvider>
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
