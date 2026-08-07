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
      {
        title: "Breadcrumb",
        href: "/docs/components/breadcrumb",
        badge: "New",
      },
      { title: "Button", href: "/docs/components/button", badge: "New" },
      {
        title: "Button Group",
        href: "/docs/components/button-group",
        badge: "New",
      },
      { title: "Card", href: "/docs/components/card", badge: "New" },
      {
        title: "City Selector",
        href: "/docs/components/city-selector",
        badge: "Special",
      },
      { title: "Combobox", href: "/docs/components/combobox", badge: "New" },
      { title: "Empty", href: "/docs/components/empty", badge: "New" },
      { title: "Input", href: "/docs/components/input", badge: "New" },
      {
        title: "Input Group",
        href: "/docs/components/input-group",
        badge: "New",
      },
      {
        title: "Input OTP",
        href: "/docs/components/input-otp",
        badge: "New",
      },
      { title: "Select", href: "/docs/components/select", badge: "New" },
      {
        title: "Separator",
        href: "/docs/components/separator",
        badge: "New",
      },
      { title: "Tabs", href: "/docs/components/tabs", badge: "New" },
      { title: "Textarea", href: "/docs/components/textarea", badge: "New" },
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
