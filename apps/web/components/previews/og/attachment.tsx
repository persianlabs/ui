export function AttachmentPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        width: "340px",
        padding: "16px",
        borderRadius: "24px",
        border: "1px solid rgba(242,240,238,0.18)",
        backgroundColor: "rgba(242,240,238,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "52px",
          height: "52px",
          flexShrink: 0,
          borderRadius: "13px",
          backgroundColor: "rgba(242,240,238,0.14)",
          color: "#f2f0ee",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          aria-hidden="true"
          width="22"
          height="22"
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
            fontSize: "19px",
            fontWeight: 600,
            color: "#f2f0ee",
            whiteSpace: "nowrap",
          }}
        >
          sales-dashboard.pdf
        </div>
        <div
          style={{
            marginTop: "3px",
            fontSize: "17px",
            color: "rgba(242,240,238,0.55)",
            whiteSpace: "nowrap",
          }}
        >
          PDF · 2.4 MB
        </div>
      </div>
    </div>
  )
}
