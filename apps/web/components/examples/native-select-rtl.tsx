import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

export function NativeSelectRtlExample() {
  return (
    <NativeSelect defaultValue="tehran" aria-label="شهر">
      <NativeSelectOption value="tehran">تهران</NativeSelectOption>
      <NativeSelectOption value="mashhad">مشهد</NativeSelectOption>
      <NativeSelectOption value="isfahan">اصفهان</NativeSelectOption>
    </NativeSelect>
  )
}
