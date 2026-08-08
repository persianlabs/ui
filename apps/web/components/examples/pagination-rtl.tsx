import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination"

export function PaginationRtlExample() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text="قبلی" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">۱</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            ۲
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">۳</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" text="بعدی" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
