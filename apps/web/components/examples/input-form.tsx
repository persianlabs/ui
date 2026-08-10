"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export function InputFormExample() {
  return (
    <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-form-name">Name</FieldLabel>
          <Input id="input-form-name" placeholder="Jane Doe" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-form-email">Email</FieldLabel>
          <Input
            id="input-form-email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <FieldDescription>
            We&apos;ll never share your email.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-form-country">Country</FieldLabel>
          <Select defaultValue="ir">
            <SelectTrigger id="input-form-country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ir">Iran</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  )
}
