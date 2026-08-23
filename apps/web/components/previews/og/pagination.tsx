export function PaginationPreview() {
  const pages = ["1", "2", "3"]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "45px",
          height: "45px",
          borderRadius: "11px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
          <path
            d="m15 18-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        {pages.map((page) => {
          const active = page === "2"

          return (
            <div
              key={page}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "45px",
                height: "45px",
                borderRadius: "11px",
                border: active
                  ? "1px solid rgba(242,240,238,0.16)"
                  : "1px solid transparent",
                backgroundColor: "transparent",
                color: active ? "#f2f0ee" : "rgba(242,240,238,0.5)",
                fontSize: "17px",
                fontWeight: active ? 600 : 500,
              }}
            >
              {page}
            </div>
          )
        })}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "45px",
            color: "rgba(242,240,238,0.5)",
            fontSize: "17px",
          }}
        >
          •••
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "45px",
          height: "45px",
          borderRadius: "11px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
          <path
            d="m9 18 6-6-6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
