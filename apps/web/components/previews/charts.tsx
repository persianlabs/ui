import { preview } from "./shared"
export function ChartsPreview() {
  const bars = [42, 66, 50, 88, 62]
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        height: "140px",
        alignItems: "flex-end",
        gap: "10px",
        padding: "16px",
        border: `1px solid ${preview.border}`,
        borderRadius: "10px",
        backgroundColor: preview.background,
      }}
    >
      {bars.map((height, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            height: `${height}%`,
            borderRadius: "4px 4px 0 0",
            backgroundColor:
              index === 3 ? preview.primary : preview.mutedForeground,
            opacity: index === 3 ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  )
}
