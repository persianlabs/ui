"use client"

import { Check, Clipboard as ClipboardMorph } from "lucide"
import {
  ChevronDownIcon,
  ClipboardIcon,
  ExternalLinkIcon,
  LinkIcon,
} from "lucide-react"
import { MorphIcon } from "morphicons/react"
import { usePathname } from "next/navigation"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

export function CopyMarkdownButton({ markdown }: { markdown: string }) {
  const [copied, setCopied] = React.useState(false)
  const pathname = usePathname()
  const markdownHref = `${pathname}.md`

  async function onCopy() {
    const response = await fetch(markdownHref)
    const content = response.ok ? await response.text() : markdown
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ButtonGroup className="shrink-0">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onCopy}
        className="h-7 gap-1.5 px-2.5 text-xs"
      >
        <MorphIcon
          icon={copied ? Check : ClipboardMorph}
          spring="snappy"
          className="size-3.5"
        />
        {copied ? "Copied" : "Copy page"}
      </Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              aria-label="More copy actions"
              className="size-7"
            >
              <ChevronDownIcon className="size-3.5" />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCopy}>
            <ClipboardIcon className="size-3.5" />
            Copy Markdown
          </DropdownMenuItem>
          <DropdownMenuItem
            render={<a href={markdownHref} target="_blank" rel="noreferrer" />}
          >
            <ExternalLinkIcon className="size-3.5" />
            View as Markdown
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(
                window.location.origin + markdownHref
              )
            }
          >
            <LinkIcon className="size-3.5" />
            Copy Markdown link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
