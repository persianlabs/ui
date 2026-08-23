export function ReceiptPrinterPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "190px",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "190px",
          height: "78px",
          flexDirection: "column",
          padding: "12px",
          borderRadius: "20px",
          backgroundColor: "#292825",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.14), 0 14px 28px rgba(0,0,0,.22)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            color: "#d6d3d1",
            fontSize: "9px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "12px",
              height: "12px",
              borderRadius: "99px",
              backgroundColor: "#86efac",
              color: "#14532d",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "9px",
              fontWeight: 900,
            }}
          >
            ✓
          </div>{" "}
          ORDER COMPLETE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            padding: "8px",
            borderRadius: "7px",
            backgroundColor: "#151514",
            color: "#c7e6ad",
            fontSize: "8px",
            letterSpacing: "1px",
          }}
        >
          READY · 12:48
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            zIndex: 2,
            right: "18px",
            bottom: "10px",
            left: "18px",
            height: "5px",
            borderRadius: "3px",
            backgroundColor: "#11110f",
            border: "1px solid #050504",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          zIndex: 1,
          width: "150px",
          marginTop: "-12px",
          minHeight: "124px",
          flexDirection: "column",
          padding: "16px",
          backgroundColor: "#fffdf7",
          color: "#282722",
          fontFamily: "monospace",
          boxShadow:
            "inset 0 13px 14px -15px rgba(0,0,0,.85), 0 10px 16px rgba(0,0,0,.16)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: "1px",
          }}
        >
          MORNING GOODS
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "18px",
            paddingBottom: "8px",
            borderBottom: "1px dashed #a8a29e",
            fontSize: "8px",
          }}
        >
          <span>Everyday watch</span>
          <span>$128</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "9px",
            fontSize: "10px",
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
