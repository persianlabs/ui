import { MegaphoneIcon } from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"

export function AlertActionExample() {
  return (
    <Alert className="w-full max-w-sm">
      <MegaphoneIcon />
      <AlertTitle>New version available</AlertTitle>
      <AlertDescription>
        A new version of the registry is ready to install.
      </AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </AlertAction>
    </Alert>
  )
}
