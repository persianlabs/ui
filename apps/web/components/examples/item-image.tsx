import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"

export function ItemImageExample() {
  return (
    <Item variant="muted" className="w-full max-w-sm">
      <ItemMedia variant="image">
        <Image
          src="https://github.com/shadcn.png"
          alt="shadcn"
          width={460}
          height={460}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>shadcn</ItemTitle>
        <ItemDescription>Building beautiful UI, in the open.</ItemDescription>
      </ItemContent>
    </Item>
  )
}
import Image from "next/image"
