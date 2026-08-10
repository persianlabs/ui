import { SearchIcon } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { Spinner } from "@workspace/ui/components/spinner"

export function InputGroupRtlExample() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder="جستجو..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">۱۲ نتیجه</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="در حال ذخیره تغییرات..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>در حال ذخیره...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel htmlFor="rtl-textarea">متن</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="rtl-textarea"
              placeholder="نظر خود را بنویسید..."
            />
            <InputGroupAddon align="block-end">
              <InputGroupText>۰/۲۸۰</InputGroupText>
              <InputGroupButton variant="default" size="sm" className="ms-auto">
                ارسال
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>پابرگ زیر متن قرار گرفته است.</FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
