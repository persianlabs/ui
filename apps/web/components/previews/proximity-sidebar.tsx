import { preview } from "./shared"

const dashes = [
  { width: 44, strong: true },
  { width: 38, strong: true },
  { width: 30, strong: false },
  { width: 24, strong: false },
  { width: 30, strong: false },
  { width: 38, strong: true },
]

export function ProximitySidebarPreview() {
  return (
    <div style={{ display: "flex", gap: "48px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        {dashes.map((dash, i) => (
          <div
            key={i}
            style={{
              width: `${dash.width}px`,
              height: "1px",
              backgroundColor: dash.strong
                ? preview.foreground
                : "color-mix(in srgb, var(--muted-foreground) 40%, transparent)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          justifyContent: "center",
        }}
      >
        {[52, 44, 36].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w * 2}px`,
              height: "8px",
              borderRadius: "4px",
              backgroundColor: preview.muted,
            }}
          />
        ))}
      </div>
    </div>
  )
}
