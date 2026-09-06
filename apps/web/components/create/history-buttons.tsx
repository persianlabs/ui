"use client"

import { Redo2Icon, Undo2Icon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

import { useHistory } from "@/components/create/hooks/use-history"
import {
  REDO_FORWARD_TYPE,
  UNDO_FORWARD_TYPE,
} from "@/components/create/forward-types"

export { REDO_FORWARD_TYPE, UNDO_FORWARD_TYPE }

export function HistoryButtons() {
  const { canGoBack, canGoForward, goBack, goForward } = useHistory()

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        title="Undo"
        disabled={!canGoBack}
        onClick={goBack}
      >
        <Undo2Icon />
        <span className="sr-only">Undo</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        title="Redo"
        disabled={!canGoForward}
        onClick={goForward}
      >
        <Redo2Icon />
        <span className="sr-only">Redo</span>
      </Button>
    </div>
  )
}
