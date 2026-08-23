export function TypographyPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "280px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "44px",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#f2f0ee",
        }}
      >
        Heading
      </div>
      <div
        style={{
          display: "flex",
          width: "220px",
          height: "12px",
          borderRadius: "999px",
          backgroundColor: "rgba(242,240,238,0.38)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "180px",
          height: "12px",
          borderRadius: "999px",
          backgroundColor: "rgba(242,240,238,0.2)",
        }}
      />
    </div>
  )
}
