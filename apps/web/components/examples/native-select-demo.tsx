import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

export function NativeSelectDemoExample() {
  return (
    <NativeSelect defaultValue="next" aria-label="Framework">
      <NativeSelectOption value="next">Next.js</NativeSelectOption>
      <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
      <NativeSelectOption value="nuxt">Nuxt.js</NativeSelectOption>
    </NativeSelect>
  )
}
