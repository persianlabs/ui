import { getFlatDocsNav } from "@/lib/docs-nav"
import { GITHUB_URL } from "@/lib/github"
import { SITE_URL } from "@/lib/site"
import { source } from "@/lib/source"

/**
 * llms.txt in the shadcn/ui style: an index of every doc page grouped by
 * topic, generated from the live page tree so it can never go stale.
 * Consumers can append `.md` to any listed URL for the markdown version.
 */

interface Entry {
  title: string
  href: string
  description: string
}

const navByHref = new Map(
  getFlatDocsNav().map((item) => [item.href, item.title])
)

function section(title: string, entries: string[]): string {
  if (entries.length === 0) return ""

  return [`## ${title}`, ...entries].join("\n\n")
}

// --- Overview ---------------------------------------------------------------
const overview: Entry[] = [
  {
    title: "Introduction",
    href: "/docs",
    description:
      "What PersianLabs UI is, and why there's no separate installation flow - it's built entirely on top of shadcn/ui.",
  },
  {
    title: "Theming",
    href: "/docs/theming",
    description:
      "The CSS color variables the library ships with, light and dark, ready to copy.",
  },
  {
    title: "Charts",
    href: "/docs/charts",
    description: "Chart components - pointers to dedicated collections.",
  },
]

// --- Component categories (shadcn-style grouping) ---------------------------

const COMPONENT_GROUPS: { group: string; slugs: string[] }[] = [
  {
    group: "Form & Input",
    slugs: [
      "bank-input",
      "button",
      "checkbox",
      "city-selector",
      "combobox",
      "date-picker",
      "date-wheel-picker",
      "elastic-range-slider",
      "elastic-slider",
      "field",
      "input",
      "input-group",
      "input-otp",
      "iran-map-picker",
      "label",
      "mobile-number-input",
      "national-id-input",
      "native-select",
      "password-input",
      "plate-input",
      "price-input",
      "questionnaire",
      "radio-group",
      "select",
      "slider",
      "switch",
      "textarea",
      "time-picker",
      "wheel-picker",
    ],
  },
  {
    group: "Layout & Navigation",
    slugs: [
      "accordion",
      "breadcrumb",
      "item",
      "navigation-menu",
      "resizable",
      "scroll-area",
      "separator",
      "sidebar",
      "tabs",
    ],
  },
  {
    group: "Overlays & Dialogs",
    slugs: [
      "alert-dialog",
      "command",
      "context-menu",
      "dialog",
      "drawer",
      "dropdown-menu",
      "hover-card",
      "menubar",
      "popover",
      "responsive-alert-dialog",
      "responsive-dialog",
      "responsive-menu",
      "sheet",
      "tooltip",
    ],
  },
  {
    group: "Feedback & Status",
    slugs: [
      "alert",
      "badge",
      "copy-button",
      "empty",
      "progress",
      "skeleton",
      "spinner",
      "status-button",
      "toast",
    ],
  },
  {
    group: "Display & Media",
    slugs: [
      "aspect-ratio",
      "attachment",
      "avatar",
      "card",
      "carousel",
      "data-table",
      "kbd",
      "marker",
      "qr-code",
      "receipt-printer",
      "table",
      "toman-icon",
      "typography",
    ],
  },
  {
    group: "Chat",
    slugs: ["bubble", "message", "message-scroller"],
  },
  {
    group: "Misc",
    slugs: [
      "button-group",
      "collapsible",
      "direction",
      "pagination",
      "toggle",
      "toggle-group",
    ],
  },
]

const UTILITY_GROUPS: { group: string; slugs: string[] }[] = [
  {
    group: "Libraries",
    slugs: [
      "hitbox",
      "iranian-bank",
      "national-id",
      "normalize-persian-digits",
      "normalize-persian-text",
      "number-to-persian-words",
      "persian-date",
      "persian-date-zod",
      "persian-holidays",
      "persian-reshape",
      "persian-slug",
      "postal-code",
    ],
  },
  {
    group: "Hooks",
    slugs: [
      "use-controllable-state",
      "use-copy-to-clipboard",
      "use-countdown",
      "use-date",
      "use-media-query",
      "use-time-ago",
    ],
  },
]

function groupEntries(section: string, slugs: string[]): string[] {
  const lines: string[] = []

  for (const slug of slugs) {
    const href = `/docs/${section}/${slug}`
    const page = source.getPage([section, slug])

    if (!page) continue

    const title = navByHref.get(href) ?? page.data.title

    lines.push(`- [${title}](${SITE_URL}${href}): ${page.data.description}`)
  }

  return lines
}

export function GET() {
  const parts: string[] = [
    `# PersianLabs UI`,
    "",
    `> An open-source, RTL-first component library for Persian interfaces. Beautifully-designed components built on Base UI primitives, TypeScript, and Tailwind CSS - distributed as source through a shadcn-compatible registry, so there's no package to install and no version to chase. Every doc page is available as markdown by appending .md to its URL.`,
    "",
  ]

  parts.push(
    section(
      "Overview",
      overview.map(
        (entry) =>
          `- [${entry.title}](${SITE_URL}${entry.href}): ${entry.description}`
      )
    ),
    ""
  )

  parts.push("## Components", "")

  for (const { group, slugs } of COMPONENT_GROUPS) {
    const entries = groupEntries("components", slugs)

    if (entries.length === 0) continue

    parts.push(`### ${group}`, "", ...entries, "")
  }

  parts.push("## Utilities", "")

  for (const { group, slugs } of UTILITY_GROUPS) {
    const entries = groupEntries("utilities", slugs)

    if (entries.length === 0) continue

    parts.push(`### ${group}`, "", ...entries, "")
  }

  parts.push(
    "## Registry",
    "",
    `- Install a component: \`npx shadcn@latest add @persianlabsui/<name>\``,
    `- Direct URL form: \`npx shadcn@latest add ${SITE_URL}/r/<name>.json\``,
    `- Registry item JSON: ${SITE_URL}/r/<name>.json`,
    `- Agent guide: ${GITHUB_URL}/tree/main/docs/agents`,
    `- Contributing guide: ${GITHUB_URL}/tree/main/docs/contributing`,
    `- Source: ${GITHUB_URL}`,
    ""
  )

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
