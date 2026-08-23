export function DrawerPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        width: "330px",
        height: "230px",
        borderRadius: "18px",
        backgroundColor: "rgba(242,240,238,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          position: "absolute",
          left: "16px",
          right: "16px",
          bottom: 0,
          height: "66%",
          backgroundColor: "#1a1a1a",
          borderTop: "1px solid rgba(242,240,238,0.16)",
          borderTopLeftRadius: "18px",
          borderTopRightRadius: "18px",
          padding: "18px 22px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "54px",
            height: "6px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.3)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "68%",
            height: "12px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.5)",
          }}
        />
      </div>
    </div>
  )
}
