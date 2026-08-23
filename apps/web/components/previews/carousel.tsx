import { preview } from "./shared"
export function CarouselPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          borderRadius: "9999px",
          border: `1px solid ${preview.border}`,
          backgroundColor: preview.background,
          color: preview.mutedForeground,
          fontSize: "11px",
        }}
      >
        ‹
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            style={{
              display: "flex",
              width: index === 1 ? "44px" : "36px",
              height: index === 1 ? "44px" : "36px",
              borderRadius: "10px",
              border: `1px solid ${preview.border}`,
              backgroundColor: index === 1 ? preview.muted : preview.background,
              color: preview.foreground,
              fontSize: index === 1 ? "14px" : "12px",
              fontWeight: 600,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {index + 2}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          borderRadius: "9999px",
          border: `1px solid ${preview.border}`,
          backgroundColor: preview.background,
          color: preview.foreground,
          fontSize: "11px",
        }}
      >
        ›
      </div>
    </div>
  )
}
