// Keyboard-forward message types shared between the customizer (parent
// page) and the preview iframe. Ported from the shadcn create app.

export const RANDOMIZE_FORWARD_TYPE = "randomize-forward"
export const RESET_FORWARD_TYPE = "reset-forward"
export const DARK_MODE_FORWARD_TYPE = "dark-mode-forward"
export const UNDO_FORWARD_TYPE = "undo-forward"
export const REDO_FORWARD_TYPE = "redo-forward"

export const PREVIEW_ITEMS = [
  { name: "fa-dashboard", title: "داشبورد — فارسی" },
  { name: "en-dashboard", title: "Dashboard — English" },
] as const

export type PreviewItemName = (typeof PREVIEW_ITEMS)[number]["name"]
