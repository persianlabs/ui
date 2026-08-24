"use client"

import {
  Field,
  FieldLabel,
  FieldValidity,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function FieldValidityExample() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="field-validity-email">Email</FieldLabel>
      <Input
        id="field-validity-email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <FieldValidity>
        {(validity) => (
          <div className="flex w-full flex-col gap-2">
            {validity.error && (
              <p className="text-sm leading-normal text-destructive">
                {validity.error}
              </p>
            )}
            <div className="w-full rounded-lg bg-muted p-2">
              <pre className="max-h-60 overflow-y-auto font-mono text-xs [scrollbar-width:none]">
                {JSON.stringify(validity, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </FieldValidity>
    </Field>
  )
}
