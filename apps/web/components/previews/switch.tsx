import { preview } from "./shared"
export function SwitchPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "16px",
        color: preview.foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "32px",
          height: "18px",
          borderRadius: "999px",
          backgroundColor: preview.primary,
          padding: "2px",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "14px",
            height: "14px",
            borderRadius: "999px",
            backgroundColor: preview.background,
          }}
        />
      </div>
      Airplane Mode
    </div>
  )
}
