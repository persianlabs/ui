import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

const faq = [
  {
    value: "item-1",
    question: "آیا این کتابخانه رایگان است؟",
    answer: "بله، برای استفاده شخصی و تجاری کاملاً رایگان است.",
  },
  {
    value: "item-2",
    question: "آیا از راست‌به‌چپ پشتیبانی می‌کند؟",
    answer: "بله، تمام کامپوننت‌ها به‌صورت پیش‌فرض راست‌به‌چپ هستند.",
  },
  {
    value: "item-3",
    question: "آیا می‌توانم چند مورد را هم‌زمان باز کنم؟",
    answer:
      "بله، با استفاده از ویژگی multiple می‌توانید چند مورد را باز نگه دارید.",
  },
]

export function AccordionRtlExample() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-sm">
      {faq.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
