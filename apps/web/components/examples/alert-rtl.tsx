import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"

export function AlertRtlExample() {
  return (
    <Alert className="w-full max-w-sm">
      <CheckCircle2Icon />
      <AlertTitle>تغییرات ذخیره شد</AlertTitle>
      <AlertDescription>تغییرات شما با موفقیت ذخیره شدند.</AlertDescription>
    </Alert>
  )
}
