export function ChartsPreview() {
  const bars = [42, 66, 50, 88, 62]
  return (
    <div
      style={{
        display: "flex",
        width: "440px",
        height: "240px",
        alignItems: "flex-end",
        gap: "18px",
        padding: "28px",
        border: "1px solid rgba(242,240,238,0.16)",
        borderRadius: "16px",
      }}
    >
      {bars.map((height, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            height: `${height}%`,
            borderRadius: "6px 6px 0 0",
            backgroundColor: "#f2f0ee",
            opacity: index === 3 ? 1 : 0.32,
          }}
        />
      ))}
    </div>
  )
}
