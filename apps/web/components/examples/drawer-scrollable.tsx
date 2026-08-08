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

const terms = Array.from({ length: 40 }, (_, i) => `Section ${i + 1}`)

export function DrawerScrollableExample() {
  return (
    <Drawer position="right">
      <DrawerTrigger render={<Button variant="outline">View terms</Button>} />
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Terms of Service</DrawerTitle>
          <DrawerDescription>
            The header and footer stay fixed — only this panel scrolls.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <div className="flex flex-col gap-3">
            {terms.map((term) => (
              <div key={term} className="text-sm">
                <p className="font-medium text-foreground">{term}</p>
                <p className="text-muted-foreground">
                  Placeholder body text to give this section some height, so the
                  panel actually needs to scroll.
                </p>
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <Button type="submit">Accept</Button>
          <DrawerClose render={<Button variant="outline">Decline</Button>} />
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
