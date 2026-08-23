import { preview } from "./shared"
export function BankInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "250px",
        alignItems: "center",
        gap: "8px",
        padding: "10px 16px 10px 12px",
        border: `1px solid ${preview.border}`,
        borderRadius: "9px",
        color: preview.foreground,
        fontFamily: "monospace",
        fontSize: "12px",
        letterSpacing: "0.06em",
      }}
    >
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
        6219-8619-1894-9297
      </div>
      <svg
        aria-label="Blubank"
        role="img"
        viewBox="0 0 48 48"
        style={{
          display: "flex",
          width: "22px",
          height: "22px",
          flexShrink: 0,
        }}
      >
        <path
          fill="#000"
          d="M11.411 12.804a1.902 1.902 0 1 0 0-3.804 1.902 1.902 0 0 0 0 3.804"
        />
        <path
          fill="#4e91e6"
          d="M36.135 21.267V30.3c0 1.996 1.48 3.518 3.423 3.518 1.924 0 3.423-1.522 3.423-3.46v-9.092a2.38 2.38 0 0 1 2.378-2.377h2.377v11.22a8.178 8.178 0 0 1-16.356 0V18.89h2.377a2.377 2.377 0 0 1 2.378 2.377"
        />
        <path
          fill="#4e91e6"
          fillRule="evenodd"
          d="M25.2 11.663h2.377V35.91a2.377 2.377 0 0 1-2.378 2.377h-2.377V14.04a2.377 2.377 0 0 1 2.377-2.377"
          clipRule="evenodd"
        />
        <path
          fill="#4e91e6"
          d="M4.755 11.663v9.027c1.504-1.364 3.424-2.18 5.515-2.18 4.832 0 8.748 4.363 8.748 9.746v.238c0 5.562-4.257 9.794-9.509 9.794-5.159 0-9.358-4.232-9.505-9.509H0v-14.74a2.38 2.38 0 0 1 2.377-2.376zm4.659 11.22c-2.73 0-4.945 2.448-4.945 5.468s2.214 5.468 4.945 5.468 4.945-2.448 4.945-5.468-2.214-5.468-4.945-5.468"
        />
      </svg>
    </div>
  )
}
