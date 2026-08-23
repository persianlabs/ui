import { preview } from "./shared"
export function MenubarPreview() {
  const items = ["File", "Edit", "View"]
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        borderRadius: "10px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.muted,
        padding: "6px",
      }}
    >
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            display: "flex",
            borderRadius: "6px",
            padding: "6px 10px",
            fontSize: "13px",
            backgroundColor: i === 0 ? preview.muted : "transparent",
            color: preview.foreground,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
