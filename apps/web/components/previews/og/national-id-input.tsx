export function NationalIDInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "220px",
        alignItems: "center",
        gap: "7px",
        padding: "11px 14px",
        border: "1px solid rgba(242,240,238,0.16)",
        borderRadius: "8px",
        color: "#f2f0ee",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "14px",
        letterSpacing: "0.04em",
      }}
    >
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
        0499370899
      </div>
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#10b981"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "flex", flexShrink: 0 }}
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  )
}
