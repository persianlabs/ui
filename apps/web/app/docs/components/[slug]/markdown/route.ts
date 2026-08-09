import fs from "node:fs"
import path from "node:path"

import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"

import { accordionMarkdown as markdown_accordion } from "../../accordion/page"
import { alertDialogMarkdown as markdown_alert_dialog } from "../../alert-dialog/page"
import { alertMarkdown as markdown_alert } from "../../alert/page"
import { aspectRatioMarkdown as markdown_aspect_ratio } from "../../aspect-ratio/page"
import { avatarMarkdown as markdown_avatar } from "../../avatar/page"
import { badgeMarkdown as markdown_badge } from "../../badge/page"
import { breadcrumbMarkdown as markdown_breadcrumb } from "../../breadcrumb/page"
import { bubbleMarkdown as markdown_bubble } from "../../bubble/page"
import { buttonGroupMarkdown as markdown_button_group } from "../../button-group/page"
import { buttonMarkdown as markdown_button } from "../../button/page"
import { cardMarkdown as markdown_card } from "../../card/page"
import { checkboxMarkdown as markdown_checkbox } from "../../checkbox/page"
import { citySelectorMarkdown as markdown_city_selector } from "../../city-selector/page"
import { collapsibleMarkdown as markdown_collapsible } from "../../collapsible/page"
import { comboboxMarkdown as markdown_combobox } from "../../combobox/page"
import { commandMarkdown as markdown_command } from "../../command/page"
import { contextMenuMarkdown as markdown_context_menu } from "../../context-menu/page"
import { copyButtonMarkdown as markdown_copy_button } from "../../copy-button/page"
import { dialogMarkdown as markdown_dialog } from "../../dialog/page"
import { directionMarkdown as markdown_direction } from "../../direction/page"
import { drawerMarkdown as markdown_drawer } from "../../drawer/page"
import { dropdownMenuMarkdown as markdown_dropdown_menu } from "../../dropdown-menu/page"
import { elasticRangeSliderMarkdown as markdown_elastic_range_slider } from "../../elastic-range-slider/page"
import { elasticSliderMarkdown as markdown_elastic_slider } from "../../elastic-slider/page"
import { emptyMarkdown as markdown_empty } from "../../empty/page"
import { fieldMarkdown as markdown_field } from "../../field/page"
import { hoverCardMarkdown as markdown_hover_card } from "../../hover-card/page"
import { inputGroupMarkdown as markdown_input_group } from "../../input-group/page"
import { inputMarkdown as markdown_input } from "../../input/page"
import { inputOTPMarkdown as markdown_input_otp } from "../../input-otp/page"
import { itemMarkdown as markdown_item } from "../../item/page"
import { kbdMarkdown as markdown_kbd } from "../../kbd/page"
import { labelMarkdown as markdown_label } from "../../label/page"
import { markerMarkdown as markdown_marker } from "../../marker/page"
import { menubarMarkdown as markdown_menubar } from "../../menubar/page"
import { messageMarkdown as markdown_message } from "../../message/page"
import { messageScrollerMarkdown as markdown_message_scroller } from "../../message-scroller/page"
import { nativeSelectMarkdown as markdown_native_select } from "../../native-select/page"
import { paginationMarkdown as markdown_pagination } from "../../pagination/page"
import { popoverMarkdown as markdown_popover } from "../../popover/page"
import { priceInputMarkdown as markdown_price_input } from "../../price-input/page"
import { progressMarkdown as markdown_progress } from "../../progress/page"
import { radioGroupMarkdown as markdown_radio_group } from "../../radio-group/page"
import { resizableMarkdown as markdown_resizable } from "../../resizable/page"
import { responsiveAlertDialogMarkdown as markdown_responsive_alert_dialog } from "../../responsive-alert-dialog/page"
import { responsiveDialogMarkdown as markdown_responsive_dialog } from "../../responsive-dialog/page"
import { responsiveMenuMarkdown as markdown_responsive_menu } from "../../responsive-menu/page"
import { scrollAreaMarkdown as markdown_scroll_area } from "../../scroll-area/page"
import { selectMarkdown as markdown_select } from "../../select/page"
import { separatorMarkdown as markdown_separator } from "../../separator/page"
import { sheetMarkdown as markdown_sheet } from "../../sheet/page"
import { skeletonMarkdown as markdown_skeleton } from "../../skeleton/page"
import { spinnerMarkdown as markdown_spinner } from "../../spinner/page"
import { switchMarkdown as markdown_switch } from "../../switch/page"
import { tableMarkdown as markdown_table } from "../../table/page"
import { tabsMarkdown as markdown_tabs } from "../../tabs/page"
import { textareaMarkdown as markdown_textarea } from "../../textarea/page"
import { toastMarkdown as markdown_toast } from "../../toast/page"
import { toggleGroupMarkdown as markdown_toggle_group } from "../../toggle-group/page"
import { toggleMarkdown as markdown_toggle } from "../../toggle/page"
import { tomanIconMarkdown as markdown_toman_icon } from "../../toman-icon/page"
import { tooltipMarkdown as markdown_tooltip } from "../../tooltip/page"
import { typographyMarkdown as markdown_typography } from "../../typography/page"

const markdownBySlug: Record<string, string> = {
  "accordion": markdown_accordion,
  "alert": markdown_alert,
  "alert-dialog": markdown_alert_dialog,
  "aspect-ratio": markdown_aspect_ratio,
  "avatar": markdown_avatar,
  "badge": markdown_badge,
  "breadcrumb": markdown_breadcrumb,
  "bubble": markdown_bubble,
  "button": markdown_button,
  "button-group": markdown_button_group,
  "card": markdown_card,
  "checkbox": markdown_checkbox,
  "city-selector": markdown_city_selector,
  "collapsible": markdown_collapsible,
  "combobox": markdown_combobox,
  "command": markdown_command,
  "context-menu": markdown_context_menu,
  "copy-button": markdown_copy_button,
  "dialog": markdown_dialog,
  "direction": markdown_direction,
  "drawer": markdown_drawer,
  "dropdown-menu": markdown_dropdown_menu,
  "elastic-range-slider": markdown_elastic_range_slider,
  "elastic-slider": markdown_elastic_slider,
  "empty": markdown_empty,
  "field": markdown_field,
  "hover-card": markdown_hover_card,
  "input": markdown_input,
  "input-group": markdown_input_group,
  "input-otp": markdown_input_otp,
  "item": markdown_item,
  "kbd": markdown_kbd,
  "label": markdown_label,
  "marker": markdown_marker,
  "menubar": markdown_menubar,
  "message": markdown_message,
  "message-scroller": markdown_message_scroller,
  "native-select": markdown_native_select,
  "pagination": markdown_pagination,
  "popover": markdown_popover,
  "price-input": markdown_price_input,
  "progress": markdown_progress,
  "radio-group": markdown_radio_group,
  "resizable": markdown_resizable,
  "responsive-alert-dialog": markdown_responsive_alert_dialog,
  "responsive-dialog": markdown_responsive_dialog,
  "responsive-menu": markdown_responsive_menu,
  "scroll-area": markdown_scroll_area,
  "select": markdown_select,
  "separator": markdown_separator,
  "sheet": markdown_sheet,
  "skeleton": markdown_skeleton,
  "spinner": markdown_spinner,
  "switch": markdown_switch,
  "table": markdown_table,
  "tabs": markdown_tabs,
  "textarea": markdown_textarea,
  "toast": markdown_toast,
  "toggle": markdown_toggle,
  "toggle-group": markdown_toggle_group,
  "toman-icon": markdown_toman_icon,
  "tooltip": markdown_tooltip,
  "typography": markdown_typography,
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

  const componentPath = path.join(process.cwd(), "registry", "base", "ui", `${slug}.tsx`)
  if (!markdown.includes("## Component source") && fs.existsSync(componentPath)) {
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
