"use client"

import * as React from "react"
import { useId, useState } from "react"

import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  StatusButton,
  type ButtonStatus,
} from "@workspace/ui/components/status-button"

async function subscribe(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!email.includes("@")) {
    return { ok: false, message: "Enter a valid email address." }
  }

  return { ok: true }
}

export function StatusButtonFormExample() {
  const id = useId()
  const [status, setStatus] = useState<ButtonStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    setStatus("loading")
    const result = await subscribe(String(formData.get("email")))

    setError(result.ok ? null : (result.message ?? null))
    setStatus(result.ok ? "success" : "idle")
  }

  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Field data-invalid={error !== null || undefined}>
        <FieldLabel htmlFor={id}>Email</FieldLabel>
        <Input
          id={id}
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          disabled={status !== "idle"}
          aria-invalid={error !== null}
        />
        <FieldError match={error !== null}>{error}</FieldError>
      </Field>

      <StatusButton
        className="self-start"
        type="submit"
        status={status}
        onStatusChange={setStatus}
        successLabel="Subscribed"
      >
        Subscribe
      </StatusButton>
    </form>
  )
}
