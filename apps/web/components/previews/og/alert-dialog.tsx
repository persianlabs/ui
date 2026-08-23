export function AlertDialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: "200px",
        borderRadius: "14px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "rgba(242,240,238,0.04)",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
        Are you absolutely sure?
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        This action cannot be undone.
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
        <div
          style={{
            display: "flex",
            borderRadius: "6px",
            border: "1px solid rgba(242,240,238,0.2)",
            padding: "6px 14px",
            fontSize: "12px",
            color: "#f2f0ee",
          }}
        >
          Cancel
        </div>
        <div
          style={{
            display: "flex",
            borderRadius: "6px",
            backgroundColor: "#ef4444",
            padding: "6px 14px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          Confirm
        </div>
      </div>
    </div>
  )
}
