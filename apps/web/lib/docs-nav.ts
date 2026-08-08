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
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
      { title: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Bubble", href: "/docs/components/bubble" },
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
      { title: "Command", href: "/docs/components/command" },
      { title: "Context Menu", href: "/docs/components/context-menu" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Direction", href: "/docs/components/direction" },
      { title: "Drawer", href: "/docs/components/drawer" },
      {
        title: "Elastic Range Slider",
        href: "/docs/components/elastic-range-slider",
        badge: "New",
      },
      { title: "Elastic Slider", href: "/docs/components/elastic-slider" },
      { title: "Empty", href: "/docs/components/empty" },
      { title: "Hover Card", href: "/docs/components/hover-card" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Input Group", href: "/docs/components/input-group" },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      { title: "Item", href: "/docs/components/item" },
      { title: "Marker", href: "/docs/components/marker" },
      { title: "Menubar", href: "/docs/components/menubar" },
      { title: "Message", href: "/docs/components/message" },
      {
        title: "Message Scroller",
        href: "/docs/components/message-scroller",
      },
      { title: "Native Select", href: "/docs/components/native-select" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Resizable", href: "/docs/components/resizable" },
      {
        title: "Responsive Alert Dialog",
        href: "/docs/components/responsive-alert-dialog",
        badge: "New",
      },
      {
        title: "Responsive Dialog",
        href: "/docs/components/responsive-dialog",
        badge: "New",
      },
      {
        title: "Responsive Menu",
        href: "/docs/components/responsive-menu",
        badge: "New",
      },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Toggle Group", href: "/docs/components/toggle-group" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Typography", href: "/docs/components/typography" },
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
