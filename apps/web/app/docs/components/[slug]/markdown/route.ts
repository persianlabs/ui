import fs from "node:fs"
import path from "node:path"

import { getComponentSource } from "@/lib/component-source"
import { getExampleSource } from "@/lib/example-source"

import { accordionMarkdown as markdown_accordion } from "../../accordion/page"
import { alertDialogMarkdown as markdown_alert_dialog } from "../../alert-dialog/page"
import { alertMarkdown as markdown_alert } from "../../alert/page"
import { aspectRatioMarkdown as markdown_aspect_ratio } from "../../aspect-ratio/page"
import { attachmentMarkdown as markdown_attachment } from "../../attachment/page"
import { avatarMarkdown as markdown_avatar } from "../../avatar/page"
import { bankInputMarkdown as markdown_bank_input } from "../../bank-input/page"
import { badgeMarkdown as markdown_badge } from "../../badge/page"
import { breadcrumbMarkdown as markdown_breadcrumb } from "../../breadcrumb/page"
import { bubbleMarkdown as markdown_bubble } from "../../bubble/page"
import { buttonGroupMarkdown as markdown_button_group } from "../../button-group/page"
import { buttonMarkdown as markdown_button } from "../../button/page"
import { calendarMarkdown as markdown_calendar } from "../../calendar/page"
import { cardMarkdown as markdown_card } from "../../card/page"
import { carouselMarkdown as markdown_carousel } from "../../carousel/page"
import { checkboxMarkdown as markdown_checkbox } from "../../checkbox/page"
import { citySelectorMarkdown as markdown_city_selector } from "../../city-selector/page"
import { collapsibleMarkdown as markdown_collapsible } from "../../collapsible/page"
import { comboboxMarkdown as markdown_combobox } from "../../combobox/page"
import { commandMarkdown as markdown_command } from "../../command/page"
import { contextMenuMarkdown as markdown_context_menu } from "../../context-menu/page"
import { copyButtonMarkdown as markdown_copy_button } from "../../copy-button/page"
import { dataTableMarkdown as markdown_data_table } from "../../data-table/page"
import { datePickerMarkdown as markdown_date_picker } from "../../date-picker/page"
import { dateWheelPickerMarkdown as markdown_date_wheel_picker } from "../../date-wheel-picker/page"
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
import { mobileNumberInputMarkdown as markdown_mobile_number_input } from "../../mobile-number-input/page"
import { nativeSelectMarkdown as markdown_native_select } from "../../native-select/page"
import { navigationMenuMarkdown as markdown_navigation_menu } from "../../navigation-menu/page"
import { paginationMarkdown as markdown_pagination } from "../../pagination/page"
import { passwordInputMarkdown as markdown_password_input } from "../../password-input/page"
import { popoverMarkdown as markdown_popover } from "../../popover/page"
import { priceInputMarkdown as markdown_price_input } from "../../price-input/page"
import { progressMarkdown as markdown_progress } from "../../progress/page"
import { qrCodeMarkdown as markdown_qr_code } from "../../qr-code/page"
import { questionnaireMarkdown as markdown_questionnaire } from "../../questionnaire/page"
import { radioGroupMarkdown as markdown_radio_group } from "../../radio-group/page"
import { receiptPrinterMarkdown as markdown_receipt_printer } from "../../receipt-printer/page"
import { resizableMarkdown as markdown_resizable } from "../../resizable/page"
import { responsiveAlertDialogMarkdown as markdown_responsive_alert_dialog } from "../../responsive-alert-dialog/page"
import { responsiveDialogMarkdown as markdown_responsive_dialog } from "../../responsive-dialog/page"
import { responsiveMenuMarkdown as markdown_responsive_menu } from "../../responsive-menu/page"
import { scrollAreaMarkdown as markdown_scroll_area } from "../../scroll-area/page"
import { selectMarkdown as markdown_select } from "../../select/page"
import { separatorMarkdown as markdown_separator } from "../../separator/page"
import { sheetMarkdown as markdown_sheet } from "../../sheet/page"
import { skeletonMarkdown as markdown_skeleton } from "../../skeleton/page"
import { sliderMarkdown as markdown_slider } from "../../slider/page"
import { spinnerMarkdown as markdown_spinner } from "../../spinner/page"
import { switchMarkdown as markdown_switch } from "../../switch/page"
import { tableMarkdown as markdown_table } from "../../table/page"
import { tabsMarkdown as markdown_tabs } from "../../tabs/page"
import { textareaMarkdown as markdown_textarea } from "../../textarea/page"
import { timePickerMarkdown as markdown_time_picker } from "../../time-picker/page"
import { toastMarkdown as markdown_toast } from "../../toast/page"
import { toggleGroupMarkdown as markdown_toggle_group } from "../../toggle-group/page"
import { toggleMarkdown as markdown_toggle } from "../../toggle/page"
import { tomanIconMarkdown as markdown_toman_icon } from "../../toman-icon/page"
import { tooltipMarkdown as markdown_tooltip } from "../../tooltip/page"
import { typographyMarkdown as markdown_typography } from "../../typography/page"
import { wheelPickerMarkdown as markdown_wheel_picker } from "../../wheel-picker/page"

const markdownBySlug: Record<string, string> = {
  accordion: markdown_accordion,
  alert: markdown_alert,
  "alert-dialog": markdown_alert_dialog,
  "aspect-ratio": markdown_aspect_ratio,
  attachment: markdown_attachment,
  avatar: markdown_avatar,
  "bank-input": markdown_bank_input,
  badge: markdown_badge,
  breadcrumb: markdown_breadcrumb,
  bubble: markdown_bubble,
  button: markdown_button,
  "button-group": markdown_button_group,
  calendar: markdown_calendar,
  card: markdown_card,
  carousel: markdown_carousel,
  checkbox: markdown_checkbox,
  "city-selector": markdown_city_selector,
  collapsible: markdown_collapsible,
  combobox: markdown_combobox,
  command: markdown_command,
  "context-menu": markdown_context_menu,
  "copy-button": markdown_copy_button,
  "data-table": markdown_data_table,
  "date-picker": markdown_date_picker,
  "date-wheel-picker": markdown_date_wheel_picker,
  dialog: markdown_dialog,
  direction: markdown_direction,
  drawer: markdown_drawer,
  "dropdown-menu": markdown_dropdown_menu,
  "elastic-range-slider": markdown_elastic_range_slider,
  "elastic-slider": markdown_elastic_slider,
  empty: markdown_empty,
  field: markdown_field,
  "hover-card": markdown_hover_card,
  input: markdown_input,
  "input-group": markdown_input_group,
  "input-otp": markdown_input_otp,
  item: markdown_item,
  kbd: markdown_kbd,
  label: markdown_label,
  marker: markdown_marker,
  menubar: markdown_menubar,
  message: markdown_message,
  "message-scroller": markdown_message_scroller,
  "mobile-number-input": markdown_mobile_number_input,
  "native-select": markdown_native_select,
  "navigation-menu": markdown_navigation_menu,
  pagination: markdown_pagination,
  "password-input": markdown_password_input,
  popover: markdown_popover,
  "price-input": markdown_price_input,
  progress: markdown_progress,
  "qr-code": markdown_qr_code,
  questionnaire: markdown_questionnaire,
  "radio-group": markdown_radio_group,
  "receipt-printer": markdown_receipt_printer,
  resizable: markdown_resizable,
  "responsive-alert-dialog": markdown_responsive_alert_dialog,
  "responsive-dialog": markdown_responsive_dialog,
  "responsive-menu": markdown_responsive_menu,
  "scroll-area": markdown_scroll_area,
  select: markdown_select,
  separator: markdown_separator,
  sheet: markdown_sheet,
  skeleton: markdown_skeleton,
  slider: markdown_slider,
  spinner: markdown_spinner,
  switch: markdown_switch,
  table: markdown_table,
  tabs: markdown_tabs,
  textarea: markdown_textarea,
  "time-picker": markdown_time_picker,
  toast: markdown_toast,
  toggle: markdown_toggle,
  "toggle-group": markdown_toggle_group,
  "toman-icon": markdown_toman_icon,
  tooltip: markdown_tooltip,
  typography: markdown_typography,
  "wheel-picker": markdown_wheel_picker,
}

function getCompleteMarkdown(slug: string, markdown: string) {
  const pagePath = path.join(
    process.cwd(),
    "app",
    "docs",
    "components",
    slug,
    "page.tsx"
  )
  const pageSource = fs.readFileSync(pagePath, "utf8")
  const examples = [
    ...pageSource.matchAll(/getExampleSource\("([^"]+)"\)/g),
  ].map((match) => match[1]!)

  const sections = [markdown]
  if (examples.length > 0 && !markdown.includes("## Examples")) {
    sections.push("", "## Examples")
    for (const name of [...new Set(examples)]) {
      sections.push(
        "",
        `### ${name}`,
        "",
        "```tsx",
        getExampleSource(name),
        "```"
      )
    }
  }

  const componentPath = path.join(
    process.cwd(),
    "registry",
    "base",
    "ui",
    `${slug}.tsx`
  )
  if (
    !markdown.includes("## Component source") &&
    fs.existsSync(componentPath)
  ) {
    sections.push(
      "",
      "## Component source",
      "",
      `### ${slug}.tsx`,
      "",
      "```tsx",
      getComponentSource(slug),
      "```"
    )
  }

  return sections.join("\n")
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Some Next versions let the `.md` suffix slip into the rewritten param.
  const slug = (await params).slug.replace(/\.md$/, "")
  const markdown = markdownBySlug[slug]
  if (!markdown)
    return new Response("Markdown is unavailable.", { status: 404 })
  return new Response(getCompleteMarkdown(slug, markdown), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
