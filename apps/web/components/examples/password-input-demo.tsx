"use client"

import { PasswordInput } from "@workspace/ui/components/password-input"

export function PasswordInputDemoExample() {
  return (
    <div className="w-full max-w-sm">
      <PasswordInput placeholder="Password" autoComplete="current-password" />
    </div>
  )
}
