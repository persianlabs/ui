export function MobileNumberInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "440px",
        alignItems: "center",
        gap: "14px",
        padding: "22px 28px",
        border: "1px solid rgba(242,240,238,0.16)",
        borderRadius: "16px",
        color: "#f2f0ee",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "28px",
        letterSpacing: "0.04em",
      }}
    >
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
        0912 123 4567
      </div>
      <svg
        aria-hidden="true"
        width="28"
        height="28"
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
