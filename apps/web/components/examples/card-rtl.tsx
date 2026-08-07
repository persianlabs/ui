import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export function CardRtlExample() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>ورود به حساب کاربری</CardTitle>
        <CardDescription>برای ادامه، ایمیل خود را وارد کنید.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        با ورود، شرایط و قوانین پرشین‌لبز را می‌پذیرید.
      </CardContent>
      <CardFooter>
        <Button className="w-full">ادامه</Button>
      </CardFooter>
    </Card>
  )
}
