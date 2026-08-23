import { preview } from "./shared"
export function ButtonGroupPreview() {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "10px",
        overflow: "hidden",
        border: `1px solid ${preview.border}`,
      }}
    >
      {["Button 1", "Button 2"].map((label, index) => (
        <div
          key={label}
          style={{
            display: "flex",
            padding: "12px 20px",
            fontSize: "17px",
            color: preview.foreground,
            borderLeft: index > 0 ? `1px solid ${preview.border}` : undefined,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
