# Builds our single local Vazirmatn cut:
#   variable weights 100-900, digits (0-9) KEPT, Latin LETTERS removed,
#   Arabic/Persian + punctuation kept, all OpenType features kept (ss01
#   Farsi digits, tnum, full Arabic shaping).
#
# Result: one ~57KB woff2 that renders Farsi via `ss01` while English
# falls through to the English font (Geist) because no Latin letters
# exist. This is the font the create system marks as "local only".
#
# Usage (from repo root, needs fonttools + brotli):
#   python -m pip install fonttools brotli
#   python scripts/build-vazirmatn-subset.py <path-to-Vazirmatn[wght].ttf> <out.woff2>

import sys

from fontTools import subset

# Everything except A-Z, a-z and Latin-1/Extended letters.
# Kept: space + punctuation, digits 0-9, Arabic (base/supplement/extended),
# ZWNJ & friends, dashes/quotes/ellipsis, bidi isolates, guillemets.
UNICODES = (
    "U+0020-002F,U+0030-0039,U+003A-0040,"  # punct + digits + more punct
    "U+005B-0060,U+007B-007F,"  # brackets/braces
    "U+00A0,U+00AB,U+00BB,"  # nbsp, guillemets (« »)
    "U+0600-06FF,U+0750-077F,U+08A0-08FF,"  # Arabic blocks
    "U+200C-200F,"  # ZWNJ, ZWJ, LRM, RLM
    "U+2010-2015,U+2018-201D,U+2026,"  # dashes, quotes, ellipsis
    "U+2066-2069,"  # bidi isolates
    "U+FB50-FDFF,U+FE70-FEFF"  # presentation forms
)


def main() -> None:
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    source, output = sys.argv[1], sys.argv[2]

    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = True

    font = subset.load_font(source, options)
    subsetter = subset.Subsetter(options)
    # parse_unicodes turns the "U+XXXX-YYYY,…" spec into a list of ints —
    # populate(unicodes=<str>) would treat the string as character iterable.
    subsetter.populate(unicodes=subset.parse_unicodes(UNICODES))
    subsetter.subset(font)
    subset.save_font(font, output, options)
    print(f"Wrote {output}")


if __name__ == "__main__":
    main()
