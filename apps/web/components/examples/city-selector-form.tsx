"use client"

import * as React from "react"
import * as z from "zod"

import { Button } from "@workspace/ui/components/button"
import {
  CitySelector,
  type CitySelectorValue,
} from "@workspace/ui/components/city-selector"
import { Label } from "@workspace/ui/components/label"

const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  province: z.any().refine((v) => v != null, "Select a province."),
  city: z.any().refine((v) => v != null, "Select a city."),
})

export function CitySelectorFormExample() {
  const [fullName, setFullName] = React.useState("")
  const [location, setLocation] = React.useState<CitySelectorValue>({
    province: null,
    city: null,
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const result = formSchema.safeParse({
      fullName,
      province: location.province,
      city: location.city,
    })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message
      }
      setErrors(fieldErrors)
      setSubmitted(false)
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="city-selector-form-name">Full name</Label>
        <input
          id="city-selector-form-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Jane Doe"
          className="border-border bg-background focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 h-8 w-full rounded-lg border px-2.5 text-sm outline-none"
        />
        {errors.fullName && (
          <p className="text-destructive text-xs">{errors.fullName}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Province & city</Label>
        <CitySelector
          locale="en"
          value={location}
          onValueChange={setLocation}
        />
        {(errors.province || errors.city) && (
          <p className="text-destructive text-xs">
            {errors.province ?? errors.city}
          </p>
        )}
      </div>

      <Button type="submit">Submit</Button>

      {submitted && (
        <p className="text-muted-foreground text-sm">
          Submitted: {fullName} — {location.province?.nameEn},{" "}
          {location.city?.nameEn}
        </p>
      )}
    </form>
  )
}
