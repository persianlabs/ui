import { InfoIcon } from "lucide-react"

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@workspace/ui/components/marker"

export function MarkerDemoExample() {
  return (
    <Marker>
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>Requires a Pro plan</MarkerContent>
    </Marker>
  )
}
