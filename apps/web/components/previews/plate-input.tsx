import { preview } from "./shared"

export function PlateInputPreview() {
  return (
    <div
      dir="ltr"
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: "6px",
        padding: "7px",
        borderRadius: "12px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          width: "40px",
          padding: "5px 7px",
          borderRadius: "8px",
          backgroundColor: "#1d4ed8",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "18px" }}
        >
          <div
            style={{
              display: "flex",
              height: "3px",
              backgroundColor: "#239f40",
            }}
          />
          <div
            style={{
              display: "flex",
              height: "3px",
              backgroundColor: "#ffffff",
            }}
          />
          <div
            style={{
              display: "flex",
              height: "3px",
              backgroundColor: "#da0001",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "12px",
            lineHeight: 1,
            color: "#eff6ff",
            fontWeight: 700,
          }}
        >
          IR
        </span>
        <span
          style={{
            fontSize: "10px",
            lineHeight: 1,
            color: "#eff6ff",
            letterSpacing: "0.15em",
          }}
        >
          IRAN
        </span>
      </div>

      {[
        { key: "two", text: "57", minWidth: "42px" },
        { key: "letter", text: "الف", minWidth: "44px", muted: false },
        { key: "three", text: "555", minWidth: "54px", muted: true },
      ].map(({ key, text, minWidth, muted }) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth,
            padding: "7px 4px",
            borderRadius: "8px",
            backgroundColor: muted ? preview.muted : "transparent",
            color: preview.foreground,
            fontSize: "17px",
            fontWeight: 500,
            letterSpacing: "0.1em",
          }}
        >
          {text}
        </div>
      ))}

      <div
        style={{
          display: "flex",
          width: "1px",
          alignSelf: "stretch",
          backgroundColor: preview.border,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          minWidth: "46px",
          padding: "3px 5px",
          borderRadius: "8px",
          backgroundColor: preview.muted,
        }}
      >
        <span
          style={{
            fontSize: "11px",
            lineHeight: 1,
            color: preview.mutedForeground,
          }}
        >
          ایران
        </span>
        <span
          style={{
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: preview.foreground,
          }}
        >
          11
        </span>
      </div>
    </div>
  )
}
