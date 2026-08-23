import { preview } from "./shared"
export function AlertDialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: "200px",
        borderRadius: "14px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.muted,
        padding: "16px",
        textAlign: "center",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Are you absolutely sure?
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: preview.mutedForeground,
        }}
      >
        This action cannot be undone.
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
        <div
          style={{
            display: "flex",
            borderRadius: "6px",
            border: `1px solid ${preview.border}`,
            padding: "6px 14px",
            fontSize: "12px",
            color: preview.foreground,
          }}
        >
          Cancel
        </div>
        <div
          style={{
            display: "flex",
            borderRadius: "6px",
            backgroundColor: "#ef4444",
            padding: "6px 14px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          Confirm
        </div>
      </div>
    </div>
  )
}
