import { preview } from "./shared"
export function KbdPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {["⌘", "K"].map((key) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "22px",
            height: "22px",
            borderRadius: "5px",
            backgroundColor: preview.muted,
            color: preview.mutedForeground,
            fontSize: "12px",
            padding: "0 5px",
          }}
        >
          {key}
        </div>
      ))}
    </div>
  )
}
