import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"

export function ResizableVerticalExample() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="h-52 w-full max-w-sm rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={35}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Header
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
