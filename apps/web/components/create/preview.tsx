"use client"

// Ported from the shadcn create app's preview.tsx. CreateDevtools and the
// CMD_K / OPEN_PRESET forwards are dropped (no devtools / preset menu in this
// port); the RANDOMIZE / UNDO / REDO / RESET / DARK_MODE keyboard forwarding
// is kept.

import * as React from "react"

import {
  DARK_MODE_FORWARD_TYPE,
  RANDOMIZE_FORWARD_TYPE,
  REDO_FORWARD_TYPE,
  RESET_FORWARD_TYPE,
  UNDO_FORWARD_TYPE,
} from "@/components/create/forward-types"
import { PreviewSwitcher } from "@/components/create/preview-switcher"
import { usePreviewOverrideValue } from "@/components/create/preview-override"
import { sendToIframe } from "@/components/create/hooks/use-iframe-sync"
import {
  serializeDesignSystemSearchParams,
  useDesignSystemSearchParams,
} from "@/lib/create/search-params"

// Hoisted — avoids recreating on every message event. (js-hoist-regexp)
const MAC_REGEX = /Mac|iPhone|iPad|iPod/

function isSameParams(
  a: ReturnType<typeof useDesignSystemSearchParams>[0] | null,
  b: ReturnType<typeof useDesignSystemSearchParams>[0]
) {
  if (!a) {
    return false
  }

  return Object.keys(b).every(
    (key) => a[key as keyof typeof b] === b[key as keyof typeof b]
  )
}

export function Preview() {
  const [params] = useDesignSystemSearchParams()
  const override = usePreviewOverrideValue()
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const lastSentParamsRef = React.useRef<typeof params | null>(null)

  // Hover previews overlay the committed params without touching the URL —
  // clearing the override re-sends the committed params, reverting the preview.
  const mergedParams = React.useMemo(
    () => (override ? { ...params, ...override } : params),
    [params, override]
  )

  React.useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) {
      return
    }

    const sendParams = () => {
      sendToIframe(iframe, "design-system-params", mergedParams)
      lastSentParamsRef.current = mergedParams
    }

    // Skip content-identical re-sends (e.g. an override matching the committed
    // params) — each message triggers a full param sync in the iframe.
    if (
      iframe.contentWindow &&
      !isSameParams(lastSentParamsRef.current, mergedParams)
    ) {
      sendParams()
    }

    iframe.addEventListener("load", sendParams)
    return () => {
      iframe.removeEventListener("load", sendParams)
    }
  }, [mergedParams])

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const iframeWindow = iframeRef.current?.contentWindow
      if (
        !iframeWindow ||
        event.origin !== window.location.origin ||
        event.source !== iframeWindow ||
        !event.data ||
        typeof event.data !== "object"
      ) {
        return
      }

      const type = event.data.type
      if (type === RANDOMIZE_FORWARD_TYPE) {
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: event.data.key || "r",
            bubbles: true,
            cancelable: true,
          })
        )
      } else if (type === UNDO_FORWARD_TYPE) {
        const isMac = MAC_REGEX.test(navigator.userAgent)
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "z",
            metaKey: isMac,
            ctrlKey: !isMac,
            bubbles: true,
            cancelable: true,
          })
        )
      } else if (type === REDO_FORWARD_TYPE) {
        const isMac = MAC_REGEX.test(navigator.userAgent)
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "z",
            shiftKey: true,
            metaKey: isMac,
            ctrlKey: !isMac,
            bubbles: true,
            cancelable: true,
          })
        )
      } else if (type === RESET_FORWARD_TYPE) {
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "R",
            shiftKey: true,
            bubbles: true,
            cancelable: true,
          })
        )
      } else if (type === DARK_MODE_FORWARD_TYPE) {
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: event.data.key || "d",
            bubbles: true,
            cancelable: true,
          })
        )
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const iframeSrc = React.useMemo(() => {
    // The iframe src needs to include the serialized design system params
    // for the initial load, but not be reactive to them as it would cause
    // full-iframe reloads on every param change (flashes & loss of state).
    // Further updates of the search params will be sent to the iframe
    // via a postMessage channel, for it to sync its own history onto the host's.
    return serializeDesignSystemSearchParams(
      `/create/preview/${params.item}`,
      params
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.item])

  return (
    <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl ring ring-foreground/10 md:ring-muted dark:ring-foreground/10">
      <div className="relative z-0 mx-auto flex w-full flex-1 flex-col overflow-hidden">
        <div className="absolute inset-0 bg-muted dark:bg-muted/30" />
        <iframe
          key={params.item}
          ref={iframeRef}
          src={iframeSrc}
          className="z-10 size-full flex-1"
          title="Preview"
        />
      </div>
      <PreviewSwitcher />
    </div>
  )
}
