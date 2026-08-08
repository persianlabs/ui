import { FileTextIcon, ImageIcon, MusicIcon } from "lucide-react"

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

export function ItemDemoExample() {
  return (
    <ItemGroup className="w-full max-w-sm">
      <Item>
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Report.pdf</ItemTitle>
          <ItemDescription>2.4 MB</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Download
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <ImageIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Cover.png</ItemTitle>
          <ItemDescription>860 KB</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Download
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <MusicIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Theme.mp3</ItemTitle>
          <ItemDescription>4.1 MB</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Download
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}
