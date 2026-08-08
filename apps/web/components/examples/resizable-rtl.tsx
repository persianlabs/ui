import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"

export function ResizableRtlExample() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-40 w-full max-w-sm rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          نوار کناری
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          محتوا
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
