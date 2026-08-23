export function CheckboxPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        color: "#f2f0ee",
        fontSize: "28px",
        fontWeight: 500,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "64px",
          height: "64px",
          borderRadius: "12px",
          border: "3px solid #f2f0ee",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 6L9 17l-5-5"
          />
        </svg>
      </div>
      Accept terms
    </div>
  )
}
