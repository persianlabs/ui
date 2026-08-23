import { preview } from "./shared"
export function RadioGroupPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {["Default", "Comfortable"].map((label, i) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "16px",
            color: preview.foreground,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              border: `1px solid ${preview.border}`,
              backgroundColor: i === 1 ? preview.primary : "transparent",
            }}
          >
            {i === 1 && (
              <div
                style={{
                  display: "flex",
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  backgroundColor: preview.background,
                }}
              />
            )}
          </div>
          {label}
        </div>
      ))}
    </div>
  )
}
