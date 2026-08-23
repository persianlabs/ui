export function UseCopyToClipboardPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "210px",
        padding: "12px 14px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          fontSize: "13px",
          color: "rgba(242,240,238,0.55)",
        }}
      >
        Copy text
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "7px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21.5303 5.46967C21.8232 5.76256 21.8232 6.23744 21.5303 6.53033L9.53033 18.5303C9.23744 18.8232 8.76256 18.8232 8.46967 18.5303L2.46967 12.5303C2.17678 12.2374 2.17678 11.7626 2.46967 11.4697C2.76256 11.1768 3.23744 11.1768 3.53033 11.4697L9 16.9393L20.4697 5.46967C20.7626 5.17678 21.2374 5.17678 21.5303 5.46967Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}
