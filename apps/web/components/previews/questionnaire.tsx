import { preview } from "./shared"
export function QuestionnairePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        width: "160px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "5px",
          width: "100%",
          borderRadius: "999px",
          backgroundColor: preview.muted,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            borderRadius: "999px",
            backgroundColor: preview.primary,
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {["Developer", "Designer"].map((label, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "10px",
              border: `1px solid ${i === 0 ? preview.primary : preview.border}`,
              padding: "7px 10px",
              fontSize: "12px",
              color: preview.foreground,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "13px",
                height: "13px",
                borderRadius: "999px",
                border: `1px solid ${i === 0 ? preview.primary : preview.border}`,
                backgroundColor: i === 0 ? preview.primary : "transparent",
              }}
            >
              {i === 0 && (
                <div
                  style={{
                    display: "flex",
                    width: "5px",
                    height: "5px",
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
    </div>
  )
}
