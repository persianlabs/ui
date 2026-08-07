import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export function CardProductExample() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>هدفون بی‌سیم پرشین‌لبز</CardTitle>
        <CardDescription>حذف نویز فعال، ۳۰ ساعت پخش موسیقی</CardDescription>
        <CardAction>
          <Badge variant="destructive">۲۰٪ تخفیف</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold">۳٬۲۰۰٬۰۰۰</span>
        <span className="text-sm text-muted-foreground">تومان</span>
        <span className="text-sm text-muted-foreground line-through">
          ۴٬۰۰۰٬۰۰۰
        </span>
      </CardContent>
      <CardFooter>
        <Button className="w-full">افزودن به سبد خرید</Button>
      </CardFooter>
    </Card>
  )
}
