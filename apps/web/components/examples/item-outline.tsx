import { UserIcon } from "lucide-react"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"

export function ItemOutlineExample() {
  return (
    <Item variant="outline" className="w-full max-w-sm">
      <ItemMedia variant="icon">
        <UserIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Taymaz</ItemTitle>
        <ItemDescription>taymazak14@gmail.com</ItemDescription>
      </ItemContent>
    </Item>
  )
}
