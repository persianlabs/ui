import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"

export function ResizableDemoExample() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-40 w-full max-w-sm rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
