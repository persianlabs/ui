export function CarouselPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "27px",
          height: "27px",
          borderRadius: "9999px",
          border: "1px solid rgba(242,240,238,0.18)",
          backgroundColor: "rgba(242,240,238,0.07)",
          color: "rgba(242,240,238,0.55)",
          fontSize: "12px",
        }}
      >
        ‹
      </div>
      <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            style={{
              display: "flex",
              width: index === 1 ? "56px" : "45px",
              height: index === 1 ? "56px" : "45px",
              borderRadius: "11px",
              border: "1px solid rgba(242,240,238,0.18)",
              backgroundColor:
                index === 1 ? "rgba(242,240,238,0.14)" : "transparent",
              color: "#f2f0ee",
              fontSize: index === 1 ? "17px" : "14px",
              fontWeight: 600,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {index + 2}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "27px",
          height: "27px",
          borderRadius: "9999px",
          border: "1px solid rgba(242,240,238,0.18)",
          backgroundColor: "#f2f0ee",
          color: "#18181b",
          fontSize: "12px",
        }}
      >
        ›
      </div>
    </div>
  )
}
