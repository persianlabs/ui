import { CopyButton } from "@workspace/ui/components/copy-button"

export function CopyCommand({ command }: { command: string }) {
  return (
    <div className="group flex w-full min-w-0 items-center justify-between gap-3 rounded-lg border border-border bg-card/60 px-4 py-3 font-mono text-sm">
      <code className="scrollbar-hide min-w-0 overflow-x-auto whitespace-nowrap text-foreground">
        <span className="text-muted-foreground select-none">$ </span>
        {command}
      </code>
      <CopyButton
        text={command}
        label="Copy command"
        variant="ghost"
        size="icon"
        className="size-7 shrink-0"
      />
    </div>
  )
}
