/**
 * Renderers that don't perform text shaping themselves — most notably
 * Satori, which powers Next's `ImageResponse` (`next/og`) and therefore
 * every OG-image route — draw each character as its isolated glyph and
 * never join Arabic/Persian letters into connected script. Persian text
 * handed to them renders as disconnected letters instead of the joined
 * script readers expect.
 *
 * `reshapePersian` maps each letter to the correct
 * isolated/initial/medial/final Unicode Arabic Presentation Forms
 * codepoint based on its neighbors, and reorders the result for renderers
 * (Satori included) that draw characters in raw logical order without
 * applying the Unicode Bidi Algorithm — so the output already looks
 * correct with zero runtime shaping required.
 *
 * Presentation-form codepoints and the letter-joining table are adapted
 * from the public domain Arabic/Persian shaping map popularized by
 * node-arabic-persian-reshaper (Shen Yiming, MIT), itself forked from
 * font-store/persian-reshaper and originally based on Accorpa's
 * Arabic-Converter-From-and-To-Arabic-Presentation-Forms-B. Codepoints are
 * written as \u escapes (rather than pasted glyphs) so the mapping stays
 * auditable against the Unicode Arabic Presentation Forms-A (U+FB50-FDFF)
 * and Forms-B (U+FE70-FEFF) blocks.
 */

interface LetterForms {
  isolated: string
  final: string
  initial: string
  medial: string
  /** Whether this letter can pass a connection on to the next letter. */
  dual: boolean
}

function forms(
  isolated: number,
  final: number,
  initial?: number,
  medial?: number
): LetterForms {
  return {
    isolated: String.fromCharCode(isolated),
    final: String.fromCharCode(final),
    initial: String.fromCharCode(initial ?? isolated),
    medial: String.fromCharCode(medial ?? final),
    dual: initial !== undefined,
  }
}

const LETTERS: Record<string, LetterForms> = {
  // Hamza — isolated only, never joins.
  ء: forms(0xfe80, 0xfe80),
  // Non-connecting (right-joining only) letters — isolated/final only.
  آ: forms(0xfe81, 0xfe82), // آ alef madda
  أ: forms(0xfe83, 0xfe84), // أ alef hamza above
  ؤ: forms(0xfe85, 0xfe86), // ؤ waw hamza
  إ: forms(0xfe87, 0xfe88), // إ alef hamza below
  ا: forms(0xfe8d, 0xfe8e), // ا alef
  د: forms(0xfea9, 0xfeaa), // د dal
  ذ: forms(0xfeab, 0xfeac), // ذ thal
  ر: forms(0xfead, 0xfeae), // ر reh
  ز: forms(0xfeaf, 0xfeb0), // ز zain
  ژ: forms(0xfb8a, 0xfb8b), // ژ jeh (Persian)
  و: forms(0xfeed, 0xfeee), // و waw
  ى: forms(0xfeef, 0xfef0), // ى alef maksura
  ة: forms(0xfe93, 0xfe94), // ة teh marbuta
  // Tatweel — an elongation stroke, not a letter; passes through unchanged
  // and always "connects" so it never breaks a run.
  ـ: forms(0x0640, 0x0640, 0x0640, 0x0640),

  // Dual-joining letters — isolated, final, initial, medial.
  ب: forms(0xfe8f, 0xfe90, 0xfe91, 0xfe92), // ب beh
  پ: forms(0xfb56, 0xfb57, 0xfb58, 0xfb59), // پ peh (Persian)
  ت: forms(0xfe95, 0xfe96, 0xfe97, 0xfe98), // ت teh
  ث: forms(0xfe99, 0xfe9a, 0xfe9b, 0xfe9c), // ث theh
  ج: forms(0xfe9d, 0xfe9e, 0xfe9f, 0xfea0), // ج jeem
  چ: forms(0xfb7a, 0xfb7b, 0xfb7c, 0xfb7d), // چ tcheh (Persian)
  ح: forms(0xfea1, 0xfea2, 0xfea3, 0xfea4), // ح hah
  خ: forms(0xfea5, 0xfea6, 0xfea7, 0xfea8), // خ khah
  س: forms(0xfeb1, 0xfeb2, 0xfeb3, 0xfeb4), // س seen
  ش: forms(0xfeb5, 0xfeb6, 0xfeb7, 0xfeb8), // ش sheen
  ص: forms(0xfeb9, 0xfeba, 0xfebb, 0xfebc), // ص sad
  ض: forms(0xfebd, 0xfebe, 0xfebf, 0xfec0), // ض dad
  ط: forms(0xfec1, 0xfec2, 0xfec3, 0xfec4), // ط tah
  ظ: forms(0xfec5, 0xfec6, 0xfec7, 0xfec8), // ظ zah
  ع: forms(0xfec9, 0xfeca, 0xfecb, 0xfecc), // ع ain
  غ: forms(0xfecd, 0xfece, 0xfecf, 0xfed0), // غ ghain
  ف: forms(0xfed1, 0xfed2, 0xfed3, 0xfed4), // ف feh
  ق: forms(0xfed5, 0xfed6, 0xfed7, 0xfed8), // ق qaf
  ك: forms(0xfed9, 0xfeda, 0xfedb, 0xfedc), // ك kaf (Arabic)
  ک: forms(0xfb8e, 0xfb8f, 0xfb90, 0xfb91), // ک keheh (Persian) — dedicated forms, distinct from Arabic kaf
  گ: forms(0xfb92, 0xfb93, 0xfb94, 0xfb95), // گ gaf (Persian)
  ل: forms(0xfedd, 0xfede, 0xfedf, 0xfee0), // ل lam
  م: forms(0xfee1, 0xfee2, 0xfee3, 0xfee4), // م meem
  ن: forms(0xfee5, 0xfee6, 0xfee7, 0xfee8), // ن noon
  ه: forms(0xfee9, 0xfeea, 0xfeeb, 0xfeec), // ه heh
  ي: forms(0xfef1, 0xfef2, 0xfef3, 0xfef4), // ي yeh (Arabic)
  ی: forms(0xfbfc, 0xfbfd, 0xfbfe, 0xfbff), // ی farsi yeh (Persian) — dedicated forms, distinct from Arabic yeh
  ئ: forms(0xfe89, 0xfe8a, 0xfe8b, 0xfe8c), // ئ yeh hamza
}

/** Lam followed by one of these alef variants merges into one ligature glyph. */
const LAM_ALEF_LIGATURES: Record<string, { isolated: string; final: string }> =
  {
    ا: { isolated: "ﻻ", final: "ﻼ" }, // لا
    آ: { isolated: "ﻵ", final: "ﻶ" }, // لآ
    أ: { isolated: "ﻷ", final: "ﻸ" }, // لأ
    إ: { isolated: "ﻹ", final: "ﻺ" }, // لإ
  }

const LAM = "ل"

/**
 * Arabic combining diacritics (harakat/tashkeel) are "transparent" to
 * shaping: their presence between two letters doesn't break the joining
 * between them, and they aren't shaped themselves. They pass straight
 * through in the output at their original position.
 */
const TRANSPARENT = new Set(
  [
    0x0610, 0x0611, 0x0612, 0x0613, 0x0614, 0x0615, 0x064b, 0x064c, 0x064d,
    0x064e, 0x064f, 0x0650, 0x0651, 0x0652, 0x0653, 0x0654, 0x0655, 0x0656,
    0x0657, 0x0658, 0x0670, 0x06d6, 0x06d7, 0x06d8, 0x06d9, 0x06da, 0x06db,
    0x06dc, 0x06df, 0x06e0, 0x06e1, 0x06e2, 0x06e3, 0x06e4, 0x06e7, 0x06e8,
    0x06ea, 0x06eb, 0x06ec, 0x06ed,
  ].map((code) => String.fromCharCode(code))
)

/** Nearest non-transparent letter looking in `step` direction from `from`. */
function nearestLetter(
  chars: string[],
  from: number,
  step: 1 | -1
): string | undefined {
  let i = from
  while (i >= 0 && i < chars.length) {
    const ch = chars[i] as string
    if (!TRANSPARENT.has(ch)) return ch
    i += step
  }
  return undefined
}

/**
 * Reshapes Persian/Arabic text into pre-joined Unicode presentation-form
 * codepoints so it renders correctly through renderers that don't shape
 * connected scripts themselves — chiefly Satori (`next/og`), the target
 * this was built for.
 *
 * @example
 * reshapePersian("راهنمای خرید") // renders as connected script in an <ImageResponse>
 */
export function reshapePersian(text: string): string {
  const chars = Array.from(text)

  // Pass 1: shape each letter (or lam-alef ligature) using its LOGICAL
  // neighbors — skipping over transparent diacritics when looking for the
  // nearest real letter, since they don't break a joining run.
  const tokens: { glyph: string; rtl: boolean }[] = []
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i] as string

    if (TRANSPARENT.has(ch)) {
      tokens.push({ glyph: ch, rtl: true })
      continue
    }

    const prev = nearestLetter(chars, i - 1, -1)
    const next = nearestLetter(chars, i + 1, 1)

    if (ch === LAM && next && LAM_ALEF_LIGATURES[next]) {
      const ligature = LAM_ALEF_LIGATURES[next]!
      const hasIncoming = !!prev && !!LETTERS[prev] && LETTERS[prev]!.dual
      tokens.push({
        glyph: hasIncoming ? ligature.final : ligature.isolated,
        rtl: true,
      })
      // Consume the alef too — it may itself be preceded by transparent
      // marks, so skip forward past however many chars nearestLetter used.
      let j = i + 1
      while (chars[j] !== next) j++
      i = j
      continue
    }

    const letterForms = LETTERS[ch]
    if (!letterForms) {
      tokens.push({ glyph: ch, rtl: false })
      continue
    }

    const hasIncoming = !!prev && !!LETTERS[prev] && LETTERS[prev]!.dual
    const hasOutgoing = letterForms.dual && !!next && !!LETTERS[next]

    let glyph: string
    if (hasIncoming && hasOutgoing) glyph = letterForms.medial
    else if (hasIncoming) glyph = letterForms.final
    else if (hasOutgoing) glyph = letterForms.initial
    else glyph = letterForms.isolated

    tokens.push({ glyph, rtl: true })
  }

  // Pass 2: Satori draws characters in raw array order without applying
  // the Unicode Bidi Algorithm itself, so an RTL string shaped in logical
  // (typed) order still comes out visually backwards. Group into runs of
  // same-direction tokens, reverse the run order (the paragraph is
  // predominantly RTL) and reverse token order *within* each RTL run only
  // — a neutral run (spaces, digits, embedded Latin) keeps its own
  // internal order so mixed content doesn't get mangled.
  const runs: { glyphs: string[]; rtl: boolean }[] = []
  for (const token of tokens) {
    const lastRun = runs[runs.length - 1]
    if (lastRun && lastRun.rtl === token.rtl) {
      lastRun.glyphs.push(token.glyph)
    } else {
      runs.push({ glyphs: [token.glyph], rtl: token.rtl })
    }
  }

  return runs
    .reverse()
    .map((run) => (run.rtl ? [...run.glyphs].reverse() : run.glyphs).join(""))
    .join("")
}
