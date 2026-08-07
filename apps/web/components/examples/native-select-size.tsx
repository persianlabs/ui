import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

export function NativeSelectSizeExample() {
  return (
    <div className="flex flex-col gap-3">
      <NativeSelect size="sm" defaultValue="next" aria-label="Framework">
        <NativeSelectOption value="next">Next.js</NativeSelectOption>
        <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
      </NativeSelect>
      <NativeSelect defaultValue="next" aria-label="Framework">
        <NativeSelectOption value="next">Next.js</NativeSelectOption>
        <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}
