export function ReceiptPrinterPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "300px",
          height: "118px",
          flexDirection: "column",
          padding: "18px",
          borderRadius: "28px",
          backgroundColor: "#292825",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#d6d3d1",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "18px",
              height: "18px",
              borderRadius: "99px",
              backgroundColor: "#86efac",
              color: "#14532d",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.5303 5.46967C21.8232 5.76256 21.8232 6.23744 21.5303 6.53033L9.53033 18.5303C9.23744 18.8232 8.76256 18.8232 8.46967 18.5303L2.46967 12.5303C2.17678 12.2374 2.17678 11.7626 2.46967 11.4697C2.76256 11.1768 3.23744 11.1768 3.53033 11.4697L9 16.9393L20.4697 5.46967C20.7626 5.17678 21.2374 5.17678 21.5303 5.46967Z"
                fill="currentColor"
              />
            </svg>
          </div>
          ORDER COMPLETE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "16px",
            padding: "12px",
            borderRadius: "9px",
            backgroundColor: "#151514",
            color: "#c7e6ad",
            fontSize: "11px",
            letterSpacing: "2px",
          }}
        >
          READY · 12:48
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "28px",
            bottom: "15px",
            left: "28px",
            height: "8px",
            borderRadius: "4px",
            backgroundColor: "#11110f",
            border: "1px solid #050504",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "238px",
          marginTop: "-20px",
          minHeight: "190px",
          flexDirection: "column",
          padding: "22px",
          backgroundColor: "#fffdf7",
          color: "#282722",
          fontFamily: "monospace",
          boxShadow: "inset 0 18px 18px -20px rgba(0,0,0,.85)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 900,
            letterSpacing: "2px",
          }}
        >
          MORNING GOODS
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "26px",
            paddingBottom: "12px",
            borderBottom: "1px dashed #a8a29e",
            fontSize: "12px",
          }}
        >
          <span>Everyday watch</span>
          <span>$128</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "14px",
            fontSize: "15px",
            fontWeight: 900,
          }}
        >
          <span>TOTAL</span>
          <span>$138.24</span>
        </div>
      </div>
    </div>
  )
}
