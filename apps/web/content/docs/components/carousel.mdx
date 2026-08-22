---
title: "Carousel"
description: "A carousel with motion and swipe built using Embla."
---

import { carouselApi, carouselButtonApi, carouselContentApi, carouselItemApi } from "@/lib/api-data/carousel"

A carousel with motion and swipe built using the [Embla Carousel](https://www.embla-carousel.com/) library.

<LastEdited path="apps/web/content/docs/components/carousel.mdx" />

<Credits
          sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
          changed={true}
          changes={[
            "Replaced the multi-icon-library IconPlaceholder abstraction with plain lucide-react chevron icons",
            "Replaced cn-rtl-flip with rtl:-scale-x-100 on the horizontal navigation icons, and the physical -left-12/-right-12 button offsets with logical -start-12/-end-12 so horizontal navigation mirrors in RTL; vertical centering stays physical so the buttons hold their position in RTL",
            "The carousel now inherits the ambient writing direction automatically instead of defaulting to LTR; opts.direction still overrides it",
          ]}
        />

## Overview

<ComponentPreview name="carousel-demo" />

## Installation

<InstallTabs command="npx shadcn@latest add @persianlabsui/carousel" packages="embla-carousel-react" sourceName="carousel" sourceTitle="components/ui/carousel.tsx" />

## Usage

```tsx
import {

  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Sizes

To set the size of the items, use the `basis` utility class on the `<CarouselItem />`.

<ComponentPreview name="carousel-size" />

## Spacing

Set the spacing between items with a `pl-[VALUE]` utility on `<CarouselItem />` and a negative `-ml-[VALUE]` on `<CarouselContent />`.

<ComponentPreview name="carousel-spacing" />

## Orientation

Use the `orientation` prop to set the orientation of the carousel.

<ComponentPreview name="carousel-orientation" />

## Options

Pass Embla options through the `opts` prop — see [Embla's option list](https://www.embla-carousel.com/api/options/).

```tsx
<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

## API & Events

Use a state and the `setApi` prop to get an instance of the carousel API, then listen to Embla events like `select` on it.

<ComponentPreview name="carousel-api" />

```tsx
import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>{/* items */}</CarouselContent>
    </Carousel>
  )
}
```

## Plugins

Use the `plugins` prop to add Embla plugins such as Autoplay.

<ComponentPreview name="carousel-plugin" />

## RTL

The carousel inherits the surrounding writing direction automatically, so it scrolls the right way under `dir="rtl"` with no extra props — and the navigation buttons mirror via logical `start/end` offsets plus `rtl:-scale-x-100` on their chevrons. To pin a direction explicitly regardless of the document, pass it through `opts`.

<ComponentPreview name="carousel-rtl" direction="rtl" />

```tsx
// Inherits dir from the document automatically.
<Carousel>
  <CarouselContent>{/* items */}</CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

// Or pin a direction explicitly:
<Carousel opts={{ direction: "rtl" }}>
  <CarouselContent>{/* items */}</CarouselContent>
  <CarouselPrevious className="rtl:-scale-x-100" />
  <CarouselNext className="rtl:-scale-x-100" />
</Carousel>
```

## API Reference

<ApiReference title="Carousel" rows={carouselApi} />

<ApiReference title="CarouselContent" rows={carouselContentApi} />

<ApiReference title="CarouselItem" rows={carouselItemApi} />

<ApiReference title="CarouselPrevious / CarouselNext" rows={carouselButtonApi} />
