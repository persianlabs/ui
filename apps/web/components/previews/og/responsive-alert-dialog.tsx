import { AlertDialogPreview } from "./alert-dialog"
export function ResponsiveAlertDialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transform: "scale(1.5)",
      }}
    >
      <AlertDialogPreview />
    </div>
  )
}
