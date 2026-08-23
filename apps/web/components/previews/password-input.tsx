import { preview } from "./shared"
export function PasswordInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "220px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          fontSize: "18px",
          letterSpacing: "0.1em",
          color: preview.foreground,
        }}
      >
        ••••••••
      </div>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={preview.mutedForeground}
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
