export function UseCountdownPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "30px 38px",
        borderRadius: "22px",
        border: "1px solid rgba(242,240,238,0.18)",
        backgroundColor: "rgba(242,240,238,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "17px",
          color: "rgba(242,240,238,0.55)",
        }}
      >
        Launches in
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "54px",
          fontWeight: 700,
          letterSpacing: "-1px",
          color: "#f2f0ee",
        }}
      >
        02:24:18
      </div>
      <div style={{ display: "flex", gap: "27px" }}>
        {["HOURS", "MINUTES", "SECONDS"].map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              fontSize: "11px",
              letterSpacing: "1px",
              color: "rgba(242,240,238,0.42)",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
