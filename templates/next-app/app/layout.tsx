import { DirectionProvider } from "@base-ui/react/direction-provider"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { fontVariables } from "@/lib/fonts"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fa-IR"
      dir="rtl"
      suppressHydrationWarning
      className={`${fontVariables} antialiased font-sans`}
    >
      <body>
        <DirectionProvider direction="rtl">
          <ThemeProvider>{children}</ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  )
}
