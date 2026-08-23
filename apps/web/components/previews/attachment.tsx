import { preview } from "./shared"
export function AttachmentPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "220px",
        padding: "10px",
        borderRadius: "16px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "36px",
          height: "36px",
          flexShrink: 0,
          borderRadius: "9px",
          backgroundColor: preview.muted,
          color: preview.foreground,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          aria-hidden="true"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: preview.foreground,
            whiteSpace: "nowrap",
          }}
        >
          sales-dashboard.pdf
        </div>
        <div
          style={{
            marginTop: "2px",
            fontSize: "11px",
            color: preview.mutedForeground,
            whiteSpace: "nowrap",
          }}
        >
          PDF · 2.4 MB
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "22px",
          height: "22px",
          marginLeft: "auto",
          flexShrink: 0,
          borderRadius: "9999px",
          color: preview.mutedForeground,
          fontSize: "13px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </div>
    </div>
  )
}
