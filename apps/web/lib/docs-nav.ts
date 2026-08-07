export interface DocsNavItem {
  title: string
  href: string
  badge?: string
  disabled?: boolean
}

export interface DocsNavGroup {
  title: string
  items: DocsNavItem[]
}

export const docsNav: DocsNavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Components", href: "/docs/components" },
      { title: "Theming", href: "/docs/theming" },
      {
        title: "Skills",
        href: "/docs/skills",
        badge: "Coming soon",
        disabled: true,
      },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Button Group", href: "/docs/components/button-group" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      {
        title: "City Selector",
        href: "/docs/components/city-selector",
        badge: "Special",
      },
      { title: "Collapsible", href: "/docs/components/collapsible" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Elastic Slider", href: "/docs/components/elastic-slider" },
      { title: "Empty", href: "/docs/components/empty" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Input Group", href: "/docs/components/input-group" },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      { title: "Native Select", href: "/docs/components/native-select" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Toggle Group", href: "/docs/components/toggle-group" },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Blocks",
        href: "/docs/blocks",
        badge: "Coming soon",
        disabled: true,
      },
      {
        title: "Templates",
        href: "/docs/templates",
        badge: "Coming soon",
        disabled: true,
      },
    ],
  },
]

/** Every enabled doc page, in sidebar order — the source of truth for prev/next navigation. */
export function getFlatDocsNav(): DocsNavItem[] {
  return docsNav
    .flatMap((group) => group.items)
    .filter((item) => !item.disabled)
}

export function getAdjacentDocsPages(href: string): {
  prev: DocsNavItem | null
  next: DocsNavItem | null
} {
  const flat = getFlatDocsNav()
  const index = flat.findIndex((item) => item.href === href)

  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: flat[index - 1] ?? null,
    next: flat[index + 1] ?? null,
  }
}
