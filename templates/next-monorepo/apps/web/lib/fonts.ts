import localFont from "next/font/local"

// Persian: our custom Vazirmatn cut (built by scripts/build-vazirmatn-subset.py
// from the upstream variable font). Variable weights 100–900, digits 0-9
// kept, Arabic/Persian kept, Latin LETTERS removed — so English falls
// through to Geist and body ss01 turns typed digits into Farsi. This font
// is LOCAL ONLY: the file is ours, nothing on Google Fonts matches it.
const fontVazir = localFont({
  src: "../app/_assets/fonts/VazirmatnVariable.woff2",
  weight: "100 900",
  variable: "--font-fa",
  display: "swap",
  fallback: [],
  adjustFontFallback: false,
})

const fontSans = localFont({
  src: "../app/_assets/fonts/GeistVariable.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
  fallback: [],
  adjustFontFallback: false,
})

const fontMono = localFont({
  src: "../app/_assets/fonts/GeistMonoVariable.woff2",
  weight: "100 900",
  variable: "--font-mono-geist",
  display: "swap",
  fallback: [],
  adjustFontFallback: false,
})

export const fontVariables = [fontVazir.variable, fontSans.variable, fontMono.variable].join(" ")
