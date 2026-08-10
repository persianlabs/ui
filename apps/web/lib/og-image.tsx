import { ImageResponse } from "next/og"
import type * as React from "react"

export const ogImageSize = { width: 1200, height: 630 }

const compactDescriptions: Record<string, string> = {
  Accordion: "Expandable content sections.",
  Alert: "Contextual status messages.",
  "Alert Dialog": "A confirmation dialog.",
  "Aspect Ratio": "Keeps content at a set ratio.",
  Avatar: "User or entity imagery.",
  Badge: "Small status labels.",
  Breadcrumb: "Navigation hierarchy.",
  Bubble: "Chat message bubbles.",
  Button: "A flexible action button.",
  "Button Group": "Related actions in one group.",
  Card: "Structured content containers.",
  Checkbox: "Select one or more options.",
  "City Selector": "Iran province and city picker.",
  Collapsible: "Expandable content panels.",
  Combobox: "Searchable value selection.",
  Command: "A command palette.",
  "Context Menu": "Actions on right click.",
  "Copy Button": "Copies content to the clipboard.",
  Dialog: "A focused modal window.",
  Direction: "LTR and RTL layout support.",
  Drawer: "A swipeable edge panel.",
  "Dropdown Menu": "Actions from a trigger.",
  "Elastic Range Slider": "A dual-thumb range slider.",
  "Elastic Slider": "A slider with elastic feedback.",
  Empty: "A no-content state.",
  Field: "Label, control, and description.",
  Hitbox: "Larger interactive targets.",
  "Hover Card": "Content preview on hover.",
  Input: "A styled text input.",
  "Input Group": "Input addons and controls.",
  "Input OTP": "One-time password entry.",
  Item: "A flexible list item.",
  Kbd: "Keyboard keys and shortcuts.",
  Label: "An accessible form label.",
  Marker: "Inline content markers.",
  Menubar: "Persistent app commands.",
  Message: "A composable chat message.",
  "Message Scroller": "Auto-scrolling chat messages.",
  "Native Select": "A styled native select.",
  "Normalize Persian Digits": "Converts Persian digits to 0–9.",
  Pagination: "Page navigation controls.",
  Popover: "Rich content from a trigger.",
  "Price Input": "Formatted price entry.",
  Progress: "Task completion progress.",
  "Radio Group": "Choose one option.",
  Resizable: "Resizable panel layouts.",
  "Responsive Alert Dialog": "Dialog on desktop, drawer on mobile.",
  "Responsive Dialog": "Dialog on desktop, drawer on mobile.",
  "Responsive Menu": "Menu on desktop, drawer on mobile.",
  "Scroll Area": "Custom scrolling areas.",
  Select: "Choose a single value.",
  Separator: "Separates related content.",
  Sheet: "A complementary side panel.",
  Skeleton: "Loading placeholders.",
  Spinner: "A loading indicator.",
  Switch: "A checked or unchecked control.",
  Table: "Responsive tabular data.",
  Tabs: "Layered content panels.",
  Textarea: "A multi-line text input.",
  Toast: "Temporary notifications.",
  "Toggle Group": "A group of toggle buttons.",
  Toggle: "A two-state button.",
  "Toman Icon": "The Toman currency symbol.",
  Tooltip: "Helpful contextual information.",
  useControllableState: "Controlled and uncontrolled state.",
  useCopyToClipboard: "Copy text with a React hook.",
  useMediaQuery: "Reactive media query state.",
  "Wheel Picker": "An iOS-style wheel picker.",
}

export function buildOgImage(
  title: string,
  description: string,
  preview?: React.ReactNode,
  options?: { titleFontSize?: number }
) {
  const compactDescription = compactDescriptions[title] ?? description

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#191817",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0px",
          position: "absolute",
          top: "80px",
          left: "80px",
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
          flexDirection: "column",
          maxWidth: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: `${options?.titleFontSize ?? 64}px`,
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
            marginTop: "24px",
            maxHeight: "68px",
            overflow: "hidden",
            fontSize: "24px",
            lineHeight: 1.4,
            color: "rgba(242,240,238,0.6)",
          }}
        >
          {compactDescription}
        </div>
      </div>

      {preview && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "500px",
            height: "360px",
            transform: "scale(1.6)",
          }}
        >
          {preview}
        </div>
      )}
    </div>,
    { ...ogImageSize }
  )
}
