import { CodeBlockCommand } from "@/components/code-block-command"
import { convertNpmCommand } from "@/lib/convert-npm-command"

export function InstallCommand({ packages }: { packages: string }) {
  return <CodeBlockCommand {...convertNpmCommand(`npm install ${packages}`)} />
}
