import { QuestionnairePreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Questionnaire — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Questionnaire",
    "A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions, built on @shadcn/react.",
    <QuestionnairePreview />
  )
}
