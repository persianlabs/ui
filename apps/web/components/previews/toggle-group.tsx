import { preview } from "./shared"
export function ToggleGroupPreview() {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "8px",
        overflow: "hidden",
        border: `1px solid ${preview.border}`,
      }}
    >
      {["B", "I", "U"].map((letter, i) => (
        <div
          key={letter}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            backgroundColor: i === 0 ? preview.muted : "transparent",
            color: preview.foreground,
            fontSize: "16px",
            fontWeight: 700,
            borderInlineStart:
              i > 0 ? `1px solid ${preview.border}` : undefined,
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}
