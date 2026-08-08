import { FileTextIcon, ImageIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@workspace/ui/components/item"

export function ItemRtlExample() {
  return (
    <ItemGroup className="w-full max-w-sm">
      <Item>
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>گزارش.pdf</ItemTitle>
          <ItemDescription>۲.۴ مگابایت</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            دانلود
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <ImageIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>کاور.png</ItemTitle>
          <ItemDescription>۸۶۰ کیلوبایت</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            دانلود
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}
