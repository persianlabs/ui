import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

const variants = ["default", "straight", "inset"] as const

export function DrawerVariantsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <Drawer key={variant}>
          <DrawerTrigger
            render={
              <Button variant="outline" className="capitalize">
                {variant}
              </Button>
            }
          />
          <DrawerPopup variant={variant} showBar>
            <DrawerHeader>
              <DrawerTitle className="capitalize">
                {variant} variant
              </DrawerTitle>
              <DrawerDescription>
                {variant === "default" &&
                  "Rounded top corners, flush with the screen edge."}
                {variant === "straight" &&
                  "No rounded corners and no scale-down stacking effect."}
                {variant === "inset" &&
                  "Floats with a margin from the screen edge on larger screens."}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerPanel>
              <p className="text-sm text-muted-foreground">
                Swipe down, drag the handle, or tap outside to dismiss.
              </p>
            </DrawerPanel>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline">Close</Button>} />
            </DrawerFooter>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  )
}
