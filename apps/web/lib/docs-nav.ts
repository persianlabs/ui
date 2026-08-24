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
      { title: "Attachment", href: "/docs/components/attachment" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Bank Input", href: "/docs/components/bank-input" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Bubble", href: "/docs/components/bubble" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Button Group", href: "/docs/components/button-group" },
      { title: "Calendar", href: "/docs/components/calendar" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Carousel", href: "/docs/components/carousel" },
      { title: "Charts", href: "/docs/components/charts" },
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
      { title: "Copy Button", href: "/docs/components/copy-button" },
      { title: "Data Table", href: "/docs/components/data-table" },
      { title: "Date Picker", href: "/docs/components/date-picker" },
      {
        title: "Date Wheel Picker",
        href: "/docs/components/date-wheel-picker",
      },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Direction", href: "/docs/components/direction" },
      { title: "Drawer", href: "/docs/components/drawer" },
      {
        title: "Dropdown Menu",
        href: "/docs/components/dropdown-menu",
      },
      {
        title: "Elastic Range Slider",
        href: "/docs/components/elastic-range-slider",
      },
      { title: "Elastic Slider", href: "/docs/components/elastic-slider" },
      { title: "Empty", href: "/docs/components/empty" },
      { title: "Field", href: "/docs/components/field" },
      { title: "Hover Card", href: "/docs/components/hover-card" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Input Group", href: "/docs/components/input-group" },
      { title: "Input OTP", href: "/docs/components/input-otp" },
      { title: "Item", href: "/docs/components/item" },
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Marker", href: "/docs/components/marker" },
      { title: "Menubar", href: "/docs/components/menubar" },
      { title: "Message", href: "/docs/components/message" },
      {
        title: "Message Scroller",
        href: "/docs/components/message-scroller",
      },
      {
        title: "Mobile Number Input",
        href: "/docs/components/mobile-number-input",
        badge: "New",
      },
      { title: "Native Select", href: "/docs/components/native-select" },
      { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
      { title: "Pagination", href: "/docs/components/pagination" },
      {
        title: "Password Input",
        href: "/docs/components/password-input",
      },
      {
        title: "Plate Input",
        href: "/docs/components/plate-input",
        badge: "New",
      },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Price Input", href: "/docs/components/price-input" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "QR Code", href: "/docs/components/qr-code" },
      {
        title: "Questionnaire",
        href: "/docs/components/questionnaire",
        badge: "New",
      },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      {
        title: "Receipt Printer",
        href: "/docs/components/receipt-printer",
      },
      { title: "Resizable", href: "/docs/components/resizable" },
      {
        title: "Responsive Alert Dialog",
        href: "/docs/components/responsive-alert-dialog",
      },
      {
        title: "Responsive Dialog",
        href: "/docs/components/responsive-dialog",
      },
      {
        title: "Responsive Menu",
        href: "/docs/components/responsive-menu",
      },
      { title: "Scroll Area", href: "/docs/components/scroll-area" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Spinner", href: "/docs/components/spinner" },
      {
        title: "Status Button",
        href: "/docs/components/status-button",
        badge: "New",
      },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Time Picker", href: "/docs/components/time-picker" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Toggle", href: "/docs/components/toggle" },
      { title: "Toggle Group", href: "/docs/components/toggle-group" },
      { title: "Toman Icon", href: "/docs/components/toman-icon" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Typography", href: "/docs/components/typography" },
      { title: "Wheel Picker", href: "/docs/components/wheel-picker" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { title: "Iranian Bank", href: "/docs/utilities/iranian-bank" },
      { title: "Hitbox", href: "/docs/utilities/hitbox" },
      {
        title: "National ID",
        href: "/docs/utilities/national-id",
        badge: "New",
      },
      {
        title: "Normalize Persian Digits",
        href: "/docs/utilities/normalize-persian-digits",
      },
      { title: "Persian Date", href: "/docs/utilities/persian-date" },
      {
        title: "Persian Date (Zod)",
        href: "/docs/utilities/persian-date-zod",
      },
      {
        title: "Persian Holidays",
        href: "/docs/utilities/persian-holidays",
      },
      {
        title: "Persian Reshape",
        href: "/docs/utilities/persian-reshape",
        badge: "New",
      },
      {
        title: "Persian Slug",
        href: "/docs/utilities/persian-slug",
        badge: "New",
      },
      {
        title: "Postal Code",
        href: "/docs/utilities/postal-code",
        badge: "New",
      },
      { title: "Scroll Fade", href: "/docs/utilities/scroll-fade" },
      { title: "Shimmer", href: "/docs/utilities/shimmer" },
      {
        title: "useControllableState",
        href: "/docs/utilities/use-controllable-state",
      },
      {
        title: "useCopyToClipboard",
        href: "/docs/utilities/use-copy-to-clipboard",
      },
      { title: "useCountdown", href: "/docs/utilities/use-countdown" },
      { title: "useDate", href: "/docs/utilities/use-date" },
      { title: "useMediaQuery", href: "/docs/utilities/use-media-query" },
      { title: "useTimeAgo", href: "/docs/utilities/use-time-ago" },
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
