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

const positions = ["top", "right", "bottom", "left"] as const

export function DrawerPositionsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      {positions.map((position) => (
        <Drawer key={position} position={position}>
          <DrawerTrigger
            render={
              <Button variant="outline" className="capitalize">
                {position}
              </Button>
            }
          />
          <DrawerPopup showBar>
            <DrawerHeader>
              <DrawerTitle className="capitalize">
                {position} drawer
              </DrawerTitle>
              <DrawerDescription>
                Slides in from the {position} edge of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerPanel>
              <p className="text-sm text-muted-foreground">
                Swipe, drag the handle, or tap outside to dismiss.
              </p>
            </DrawerPanel>
            <DrawerFooter>
              <Button type="submit">Save changes</Button>
              <DrawerClose render={<Button variant="outline">Cancel</Button>} />
            </DrawerFooter>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  )
}
