export function SwitchPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        fontSize: "32px",
        color: "#f2f0ee",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "64px",
          height: "36px",
          borderRadius: "999px",
          backgroundColor: "#f2f0ee",
          padding: "4px",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "28px",
            height: "28px",
            borderRadius: "999px",
            backgroundColor: "#191817",
          }}
        />
      </div>
      Airplane Mode
    </div>
  )
}
