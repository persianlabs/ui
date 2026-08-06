import { ImageResponse } from "next/og"
import type * as React from "react"

export const ogImageSize = { width: 1200, height: 630 }

export function buildOgImage(
  title: string,
  description: string,
  preview?: React.ReactNode
) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#191817",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "620px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0px",
            }}
          >
            <svg viewBox="0 0 1024 1024" width="44" height="44" fill="none">
              <path
                d="M210 842V330C210 286 226 251 258 219L382 95V842H210Z"
                fill="#f2f0ee"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M382 95H608C754 95 848 187 848 326C848 465 754 557 608 557H382V405H594C661 405 696 375 696 326C696 277 661 247 594 247H382V95Z"
                fill="#f2f0ee"
              />
            </svg>
            <div
              style={{
                display: "flex",
                fontSize: "30px",
                fontWeight: 600,
                color: "rgba(242,240,238,0.7)",
              }}
            >
              ersianLabs UI
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "48px",
              fontSize: "64px",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#f2f0ee",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "28px",
              lineHeight: 1.4,
              color: "rgba(242,240,238,0.6)",
            }}
          >
            {description}
          </div>
        </div>

        {preview && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "420px",
              height: "300px",
              borderRadius: "24px",
              backgroundColor: "rgba(242,240,238,0.06)",
              border: "1px solid rgba(242,240,238,0.12)",
            }}
          >
            {preview}
          </div>
        )}
      </div>
    ),
    { ...ogImageSize }
  )
}
