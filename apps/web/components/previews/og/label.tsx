export function LabelPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          height: "56px",
          borderRadius: "12px",
          border: "3px solid rgba(242,240,238,0.4)",
          backgroundColor: "rgba(242,240,238,0.08)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="rgba(242,240,238,0.45)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 6L9 17l-5-5"
          />
        </svg>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "42px",
          fontWeight: 600,
          letterSpacing: "-1px",
          color: "#f2f0ee",
        }}
      >
        Accept terms
      </div>
    </div>
  )
}
