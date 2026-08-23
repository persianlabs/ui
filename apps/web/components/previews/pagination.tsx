import { preview } from "./shared"
export function PaginationPreview() {
  const pages = ["1", "2", "3"]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          color: preview.mutedForeground,
          fontSize: "16px",
        }}
      >
        ‹
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {pages.map((page) => {
          const active = page === "2"

          return (
            <div
              key={page}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: active
                  ? `1px solid ${preview.border}`
                  : "1px solid transparent",
                backgroundColor: "transparent",
                color: active ? preview.foreground : preview.mutedForeground,
                fontSize: "12px",
                fontWeight: active ? 600 : 500,
              }}
            >
              {page}
            </div>
          )
        })}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            color: preview.mutedForeground,
            fontSize: "12px",
          }}
        >
          •••
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          color: preview.mutedForeground,
          fontSize: "16px",
        }}
      >
        ›
      </div>
    </div>
  )
}
