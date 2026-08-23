export function PasswordInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        width: "440px",
        padding: "22px 28px",
        borderRadius: "16px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          fontSize: "32px",
          letterSpacing: "0.12em",
          color: "#f2f0ee",
        }}
      >
        ••••••••
      </div>
      <svg
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(242,240,238,0.5)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "flex", flexShrink: 0 }}
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  )
}
