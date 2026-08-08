"use client"

import * as React from "react"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@workspace/ui/components/bubble"

export function BubbleLinkButtonExample() {
  const [clicked, setClicked] = React.useState<string | null>(null)

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 py-4">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={<button onClick={() => setClicked("forgot password")} />}
          >
            I forgot my password
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={
              <button onClick={() => setClicked("help with subscription")} />
            }
          >
            I need help with my subscription
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={<button onClick={() => setClicked("talk to a human")} />}
          >
            Something else. Talk to a human.
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
      {clicked && (
        <p className="text-sm text-muted-foreground">
          You clicked &quot;{clicked}&quot;
        </p>
      )}
    </div>
  )
}
