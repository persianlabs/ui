import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "پرداخت‌شده",
    totalAmount: "۲۵۰,۰۰۰ تومان",
    paymentMethod: "کارت بانکی",
  },
  {
    invoice: "INV002",
    paymentStatus: "در انتظار",
    totalAmount: "۱۵۰,۰۰۰ تومان",
    paymentMethod: "کیف پول",
  },
  {
    invoice: "INV003",
    paymentStatus: "پرداخت‌نشده",
    totalAmount: "۳۵۰,۰۰۰ تومان",
    paymentMethod: "حواله بانکی",
  },
]

export function TableRtlExample() {
  return (
    <Table>
      <TableCaption>لیست فاکتورهای اخیر شما.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">فاکتور</TableHead>
          <TableHead>وضعیت</TableHead>
          <TableHead>روش پرداخت</TableHead>
          <TableHead className="text-end">مبلغ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-end">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>مجموع</TableCell>
          <TableCell className="text-end">۷۵۰,۰۰۰ تومان</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
