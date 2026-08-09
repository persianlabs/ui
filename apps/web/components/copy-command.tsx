import { CopyButton } from "@workspace/ui/components/copy-button"

export function CopyCommand({ command }: { command: string }) {
  return (
    <div className="border-border bg-card/60 group flex w-full min-w-0 items-center justify-between gap-3 rounded-lg border px-4 py-3 font-mono text-sm">
      <code className="text-foreground scrollbar-hide min-w-0 overflow-x-auto whitespace-nowrap">
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
