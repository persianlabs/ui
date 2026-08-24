import { preview } from "./shared"

export function StatusButtonPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "22px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "200px",
          height: "48px",
          padding: "0 20px",
          borderRadius: "12px",
          border: `1px solid ${preview.border}`,
          color: preview.foreground,
          fontSize: "19px",
          fontWeight: 500,
        }}
      >
        Submit
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "200px",
          height: "48px",
          padding: "0 20px",
          borderRadius: "12px",
          border: `1px solid ${preview.border}`,
          color: preview.mutedForeground,
          fontSize: "19px",
          fontWeight: 500,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke={preview.mutedForeground}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="42 56"
          />
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          minWidth: "200px",
          height: "48px",
          padding: "0 20px",
          borderRadius: "12px",
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
          fontSize: "19px",
          fontWeight: 500,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={preview.primaryForeground}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        Submitted
      </div>
    </div>
  )
}
