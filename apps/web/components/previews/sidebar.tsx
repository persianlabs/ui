import { preview } from "./shared"
export function SidebarPreview() {
  const rows = [
    { width: "70%", active: true },
    { width: "55%", active: false },
    { width: "62%", active: false },
  ]
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        height: "140px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "38%",
          padding: "12px 8px",
          backgroundColor: preview.muted,
          borderInlineEnd: `1px solid ${preview.border}`,
        }}
      >
        {rows.map((row) => (
          <div
            key={row.width}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: row.width,
              height: "16px",
              borderRadius: "6px",
              backgroundColor: row.active ? preview.primary : preview.muted,
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "999px",
                marginInlineStart: "5px",
                backgroundColor: row.active
                  ? preview.primaryForeground
                  : preview.mutedForeground,
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: "14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "2px",
              backgroundColor: preview.foreground,
            }}
          />
          <div
            style={{
              width: "30%",
              height: "5px",
              borderRadius: "999px",
              backgroundColor: preview.muted,
            }}
          />
        </div>
        <div
          style={{
            width: "80%",
            height: "6px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
            marginBottom: "6px",
          }}
        />
        <div
          style={{
            width: "55%",
            height: "6px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
          }}
        />
      </div>
    </div>
  )
}
