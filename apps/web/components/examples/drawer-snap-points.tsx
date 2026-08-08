"use client"

import * as React from "react"

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

const snapPoints = [0.3, 0.6, 1]
const cards = Array.from({ length: 20 }, (_, i) => i + 1)

export function DrawerSnapPointsExample() {
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(
    snapPoints[0] ?? null
  )

  return (
    <Drawer
      snapPoints={snapPoints}
      snapPoint={snapPoint}
      onSnapPointChange={setSnapPoint}
    >
      <DrawerTrigger
        render={<Button variant="outline">Open snap drawer</Button>}
      />
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Snap points</DrawerTitle>
          <DrawerDescription>
            Drag the handle — it snaps to 30%, 60%, or full height instead of
            following your finger freely. Current snap point:{" "}
            {String(snapPoint)}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <div className="grid gap-3">
            {cards.map((card) => (
              <div
                key={card}
                className="flex h-12 items-center rounded-md bg-muted px-4 text-sm text-muted-foreground"
              >
                Card {card}
              </div>
            ))}
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
