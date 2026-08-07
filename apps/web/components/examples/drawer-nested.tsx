import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

export function DrawerNestedExample() {
  return (
    <Drawer>
      <DrawerTrigger
        render={<Button variant="outline">Delete account</Button>}
      />
      <DrawerPopup showBar variant="inset" className="max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Delete account</DrawerTitle>
          <DrawerDescription>
            This will permanently delete your account and all of its data.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {/* Nested inside an already-open modal drawer, so it only traps
              focus instead of re-applying a page-level scroll lock on top
              of the outer one. */}
          <Drawer modal="trap-focus">
            <DrawerTrigger
              render={<Button variant="destructive">Delete</Button>}
            />
            <DrawerPopup showBar variant="inset" className="max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button variant="destructive">Yes, delete it</Button>
                <DrawerClose
                  render={<Button variant="outline">Cancel</Button>}
                />
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
