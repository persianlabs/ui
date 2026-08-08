import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"

export function AlertDestructiveExample() {
  return (
    <Alert variant="destructive" className="w-full max-w-sm">
      <AlertCircleIcon />
      <AlertTitle>Unable to process payment</AlertTitle>
      <AlertDescription>
        Please verify your billing information and try again.
      </AlertDescription>
    </Alert>
  )
}
