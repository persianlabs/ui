import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"

export function AlertDialogRtlExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">حذف حساب</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>کاملاً مطمئن هستید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عمل قابل بازگشت نیست. حساب شما برای همیشه حذف و اطلاعات آن از
            سرورهای ما پاک خواهد شد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>انصراف</AlertDialogCancel>
          <AlertDialogAction>ادامه</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
