export function CopyButtonPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "140px",
        height: "140px",
        borderRadius: "28px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <svg
        width={56}
        height={56}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f2f0ee"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </div>
  )
}
