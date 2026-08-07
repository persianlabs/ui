import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export function ButtonRenderExample() {
  return (
    <a href="#" className={cn(buttonVariants({ variant: "outline" }))}>
      Link
    </a>
  )
}
