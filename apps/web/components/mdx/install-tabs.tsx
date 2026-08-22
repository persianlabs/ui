import { CopyCommand } from "@/components/copy-command"
import { InstallCommand } from "@/components/install-command"
import { ComponentSourceDoc } from "@/components/mdx/component-source-doc"
import { Step, Steps } from "@/components/steps"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

/**
 * The standard "CLI / Manual" installation section of component and utility
 * doc pages, extracted from the old page.tsx template so markdown files can
 * express it in one line. Pages with non-standard manual steps keep their
 * custom JSX instead of using this island.
 */
export function InstallTabs({
  command,
  packages,
  sourceName,
  sourceKind = "component",
  sourceTitle,
  sourceStep = "Copy the component source",
}: {
  /** e.g. "npx shadcn@latest add @persianlabsui/alert" */
  command: string
  /** Dependencies shown with the package-manager tabs, if any. */
  packages?: string
  /** File base name to show under registry/base/{ui,hooks,lib}. */
  sourceName?: string
  sourceKind?: "component" | "hook" | "lib"
  /** Filename shown above the source block. */
  sourceTitle?: string
  sourceStep?: string
}) {
  return (
    <Tabs defaultValue="cli" className="mt-4">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="mt-4">
        <CopyCommand command={command} />
      </TabsContent>

      <TabsContent value="manual" className="mt-4">
        <Steps>
          {packages ? (
            <>
              <Step>Install the dependencies</Step>
              <div className="mt-2">
                <InstallCommand packages={packages} />
              </div>
              <Step>{sourceStep}</Step>
            </>
          ) : (
            <Step>{sourceStep}</Step>
          )}
          {sourceName && (
            <div className="mt-2">
              <ComponentSourceDoc
                kind={sourceKind}
                name={sourceName}
                title={
                  sourceTitle ??
                  (sourceKind === "hook"
                    ? `hooks/${sourceName}.ts`
                    : sourceKind === "lib"
                      ? `lib/${sourceName}.ts`
                      : `components/ui/${sourceName}.tsx`)
                }
              />
            </div>
          )}
        </Steps>
      </TabsContent>
    </Tabs>
  )
}
