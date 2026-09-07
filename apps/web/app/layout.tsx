import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import {
  DM_Sans,
  EB_Garamond,
  Figtree,
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Lora,
  Manrope,
  Merriweather,
  Montserrat,
  Noto_Sans,
  Noto_Serif,
  Nunito_Sans,
  Outfit,
  Oxanium,
  Playfair_Display,
  Public_Sans,
  Raleway,
  Roboto,
  Roboto_Slab,
  Source_Sans_3,
  Space_Grotesk,
  Vazirmatn,
} from "next/font/google"

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

// Estedad preview for the /create FA picker. Not on Google Fonts — loads
// our Latin-free subset cut (same file the template bases ship), so the
// preview renders exactly what generated projects render: Persian glyphs
// from Estedad, Latin falling through to the EN font.
const estedad = localFont({
  src: "./_assets/fonts/Estedad.woff2",
  weight: "100 900",
  variable: "--font-estedad",
  adjustFontFallback: false,
  display: "swap",
})

// Latin preview fonts for the /create font pickers (same catalog as
// lib/create/fonts.ts). next/font emits real CSS variables, so hover and
// select in the picker visibly change the preview iframe.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  adjustFontFallback: false,
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  adjustFontFallback: false,
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  adjustFontFallback: false,
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  adjustFontFallback: false,
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  adjustFontFallback: false,
  display: "swap",
})

// The rest of the shadcn font catalog for the /create pickers (variable
// fonts omit `weight` to serve the full range; static-only fonts list
// their available weights). next/font emits real CSS variables, so hover
// and select in the picker visibly change the preview iframe.
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  adjustFontFallback: false,
  display: "swap",
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  adjustFontFallback: false,
  display: "swap",
})

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  adjustFontFallback: false,
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  adjustFontFallback: false,
  display: "swap",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  adjustFontFallback: false,
  display: "swap",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  adjustFontFallback: false,
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  adjustFontFallback: false,
  display: "swap",
})

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
  adjustFontFallback: false,
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  adjustFontFallback: false,
  display: "swap",
})

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  adjustFontFallback: false,
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  adjustFontFallback: false,
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  adjustFontFallback: false,
  display: "swap",
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  adjustFontFallback: false,
  display: "swap",
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  adjustFontFallback: false,
  display: "swap",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  adjustFontFallback: false,
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  adjustFontFallback: false,
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  adjustFontFallback: false,
  display: "swap",
})

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  adjustFontFallback: false,
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
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
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "PersianLabs UI - Copy-paste components for Persian interfaces",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PersianLabs/ui — Copy-paste components for Persian interfaces",
    description:
      "An open-source, RTL-first component library you copy, paste, and own.",
    images: ["/api/og"],
  },
}

// Matches the `--background` token in packages/ui/src/styles/globals.css
// for light and dark (`.dark`) themes.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(1 0 0)" },
    {
      media: "(prefers-color-scheme: dark)",
      color: "oklch(0.191 0 89.9)",
    },
  ],
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
        estedad.variable,
        geist.variable,
        inter.variable,
        ibmPlexSans.variable,
        manrope.variable,
        spaceGrotesk.variable,
        dmSans.variable,
        notoSans.variable,
        nunitoSans.variable,
        figtree.variable,
        roboto.variable,
        raleway.variable,
        publicSans.variable,
        outfit.variable,
        oxanium.variable,
        montserrat.variable,
        sourceSans3.variable,
        instrumentSans.variable,
        jetbrainsMono.variable,
        notoSerif.variable,
        robotoSlab.variable,
        merriweather.variable,
        lora.variable,
        playfairDisplay.variable,
        ebGaramond.variable,
        instrumentSerif.variable
      )}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if(new URLSearchParams(location.search).get("embed")==="1")document.documentElement.classList.add("preview-loading")',
          }}
        />
        <NuqsAdapter>
          <ThemeProvider>
            <ToastProvider>
              <AnchoredToastProvider>{children}</AnchoredToastProvider>
            </ToastProvider>
          </ThemeProvider>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  )
}
