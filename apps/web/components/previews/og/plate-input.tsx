import { reshapePersian } from "@workspace/ui/lib/persian-reshape"

export function PlateInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: "8px",
        padding: "8px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.24)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "4px",
          width: "42px",
          padding: "5px 7px",
          borderRadius: "8px",
          backgroundColor: "#1d4ed8",
        }}
      >
        {/* Stripes stand in for the flag — Satori chokes on the twemoji svg. */}
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

      {/* Plate order: band, two digits, letter (wheelchair), three digits,
          divider, Iran serial. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "42px",
          padding: "7px 4px",
          borderRadius: "8px",
          backgroundColor: "rgba(242,240,238,0.08)",
          color: "#f2f0ee",
          fontSize: "17px",
          fontWeight: 500,
          letterSpacing: "0.1em",
        }}
      >
        57
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          borderRadius: "8px",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#38bdf8"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="16" cy="4" r="1" />
          <path d="m18 19 1-7-6 1" />
          <path d="m5 8 3-3 5.5 3-2.36 3.5" />
          <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
          <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "54px",
          padding: "7px 4px",
          borderRadius: "8px",
          backgroundColor: "rgba(242,240,238,0.08)",
          color: "#f2f0ee",
          fontSize: "17px",
          fontWeight: 500,
          letterSpacing: "0.1em",
        }}
      >
        555
      </div>

      <div
        style={{
          display: "flex",
          width: "1px",
          alignSelf: "stretch",
          backgroundColor: "rgba(242,240,238,0.24)",
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
          backgroundColor: "rgba(242,240,238,0.08)",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            lineHeight: 1,
            color: "#f2f0ee",
          }}
        >
          {reshapePersian("ایران")}
        </span>
        <span
          style={{
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "#f2f0ee",
          }}
        >
          11
        </span>
      </div>
    </div>
  )
}
