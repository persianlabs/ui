import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"

export function AlertDemoExample() {
  return (
    <Alert className="w-full max-w-sm">
      <CheckCircle2Icon />
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  )
}
