import { accordionMarkdown as markdown_accordion } from "../../accordion/page"
import { alertDialogMarkdown as markdown_alert_dialog } from "../../alert-dialog/page"
import { breadcrumbMarkdown as markdown_breadcrumb } from "../../breadcrumb/page"
import { buttonMarkdown as markdown_button } from "../../button/page"
import { buttonGroupMarkdown as markdown_button_group } from "../../button-group/page"
import { cardMarkdown as markdown_card } from "../../card/page"
import { checkboxMarkdown as markdown_checkbox } from "../../checkbox/page"
import { citySelectorMarkdown as markdown_city_selector } from "../../city-selector/page"
import { collapsibleMarkdown as markdown_collapsible } from "../../collapsible/page"
import { comboboxMarkdown as markdown_combobox } from "../../combobox/page"
import { contextMenuMarkdown as markdown_context_menu } from "../../context-menu/page"
import { dialogMarkdown as markdown_dialog } from "../../dialog/page"
import { drawerMarkdown as markdown_drawer } from "../../drawer/page"
import { elasticRangeSliderMarkdown as markdown_elastic_range_slider } from "../../elastic-range-slider/page"
import { elasticSliderMarkdown as markdown_elastic_slider } from "../../elastic-slider/page"
import { emptyMarkdown as markdown_empty } from "../../empty/page"
import { inputMarkdown as markdown_input } from "../../input/page"
import { inputGroupMarkdown as markdown_input_group } from "../../input-group/page"
import { inputOTPMarkdown as markdown_input_otp } from "../../input-otp/page"
import { menubarMarkdown as markdown_menubar } from "../../menubar/page"
import { nativeSelectMarkdown as markdown_native_select } from "../../native-select/page"
import { progressMarkdown as markdown_progress } from "../../progress/page"
import { radioGroupMarkdown as markdown_radio_group } from "../../radio-group/page"
import { responsiveAlertDialogMarkdown as markdown_responsive_alert_dialog } from "../../responsive-alert-dialog/page"
import { responsiveDialogMarkdown as markdown_responsive_dialog } from "../../responsive-dialog/page"
import { responsiveMenuMarkdown as markdown_responsive_menu } from "../../responsive-menu/page"
import { selectMarkdown as markdown_select } from "../../select/page"
import { separatorMarkdown as markdown_separator } from "../../separator/page"
import { sheetMarkdown as markdown_sheet } from "../../sheet/page"
import { switchMarkdown as markdown_switch } from "../../switch/page"
import { tabsMarkdown as markdown_tabs } from "../../tabs/page"
import { textareaMarkdown as markdown_textarea } from "../../textarea/page"
import { toggleMarkdown as markdown_toggle } from "../../toggle/page"
import { toggleGroupMarkdown as markdown_toggle_group } from "../../toggle-group/page"
import { tooltipMarkdown as markdown_tooltip } from "../../tooltip/page"

const markdownBySlug: Record<string, string> = {
  "accordion": markdown_accordion,
  "alert-dialog": markdown_alert_dialog,
  "breadcrumb": markdown_breadcrumb,
  "button": markdown_button,
  "button-group": markdown_button_group,
  "card": markdown_card,
  "checkbox": markdown_checkbox,
  "city-selector": markdown_city_selector,
  "collapsible": markdown_collapsible,
  "combobox": markdown_combobox,
  "context-menu": markdown_context_menu,
  "dialog": markdown_dialog,
  "drawer": markdown_drawer,
  "elastic-range-slider": markdown_elastic_range_slider,
  "elastic-slider": markdown_elastic_slider,
  "empty": markdown_empty,
  "input": markdown_input,
  "input-group": markdown_input_group,
  "input-otp": markdown_input_otp,
  "menubar": markdown_menubar,
  "native-select": markdown_native_select,
  "progress": markdown_progress,
  "radio-group": markdown_radio_group,
  "responsive-alert-dialog": markdown_responsive_alert_dialog,
  "responsive-dialog": markdown_responsive_dialog,
  "responsive-menu": markdown_responsive_menu,
  "select": markdown_select,
  "separator": markdown_separator,
  "sheet": markdown_sheet,
  "switch": markdown_switch,
  "tabs": markdown_tabs,
  "textarea": markdown_textarea,
  "toggle": markdown_toggle,
  "toggle-group": markdown_toggle_group,
  "tooltip": markdown_tooltip,
}

function getCompleteMarkdown(slug: string, markdown: string) {
  const pagePath = path.join(process.cwd(), "app", "docs", "components", slug, "page.tsx")
  const pageSource = fs.readFileSync(pagePath, "utf8")
  const examples = [...pageSource.matchAll(/getExampleSource\("([^"]+)"\)/g)].map(
    (match) => match[1]!
  )

  const sections = [markdown]
  if (examples.length > 0 && !markdown.includes("## Examples")) {
    sections.push("", "## Examples")
    for (const name of [...new Set(examples)]) {
      sections.push("", `### ${name}`, "", "```tsx", getExampleSource(name), "```")
    }
  }

  if (!markdown.includes("## Component source")) {
    sections.push("", "## Component source", "", `### ${slug}.tsx`, "", "```tsx", getComponentSource(slug), "```")
  }

  return sections.join("\n")
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const markdown = markdownBySlug[slug]
  if (!markdown) return new Response("Markdown is unavailable.", { status: 404 })
  return new Response(getCompleteMarkdown(slug, markdown), { headers: { "content-type": "text/markdown; charset=utf-8" } })
}
import fs from "node:fs"
import path from "node:path"

import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"
