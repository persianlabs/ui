export function SkeletonPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "66px",
          height: "66px",
          borderRadius: "9999px",
          backgroundColor: "rgba(242,240,238,0.1)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "210px",
          height: "15px",
          borderRadius: "9px",
          backgroundColor: "rgba(242,240,238,0.1)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "150px",
          height: "15px",
          borderRadius: "9px",
          backgroundColor: "rgba(242,240,238,0.1)",
        }}
      />
    </div>
  )
}
