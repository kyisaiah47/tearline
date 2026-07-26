#!/usr/bin/env python3
"""Ordered-dither a photograph into the template's hero backdrop.

The Axon donor ran its hero art through a coarse dither — chunky pixels, a
collapsed palette, visible Bayer texture — and that treatment is most of why the
section reads as a developer tool rather than as a stock landscape. The donor
did it in a live WebGL shader, which a static port cannot carry, so it happens
here instead: once, at build time, into a PNG.

Every product on this template runs its own generated photograph through this
with the same settings, which is what keeps a family of landing pages looking
like a family.

    python3 tools/dither.py in.png public/images/hero-backdrop.png

Needs numpy and Pillow. The house image-scrub venv already has both, and every
generated backdrop passes through the scrub first anyway, so:

    ~/.claude/skills/gemini-image-scrub/.venv/bin/python tools/dither.py …

Settings used for this product's backdrop, for anyone matching it:

    --block 8 --levels 6 --contrast 1.12 --strength 0.6

Flags worth touching, in the order you will want them:

    --block N     pixel size. Bigger is coarser. 4 matches the donor.
    --levels N    quantisation steps per channel. Lower collapses the palette
                  harder. 5 keeps hue while killing gradients.
    --contrast F  applied BEFORE dithering. Ordered dither has nothing to work
                  with in a flat midtone, so a photograph usually needs a push.
    --strength F  dither amplitude. 1.0 dithers everything and reads as
                  halftone noise; ~0.6 keeps flat areas flat and leaves the
                  cross-hatch only where tones meet, which is the donor look.

Deliberately not a CSS filter: dithering needs to happen at a fixed pixel grid,
and a CSS-filtered image re-dithers itself at every viewport width, which
crawls when the page resizes.
"""

import argparse
import sys

import numpy as np
from PIL import Image, ImageEnhance

# 4x4 Bayer threshold matrix, normalised to 0..1. The classic ordered-dither
# kernel — its cross-hatch is the texture the donor's art has.
BAYER4 = (
    np.array(
        [
            [0, 8, 2, 10],
            [12, 4, 14, 6],
            [3, 11, 1, 9],
            [15, 7, 13, 5],
        ],
        dtype=np.float32,
    )
    + 0.5
) / 16.0


def dither(
    img: Image.Image,
    block: int = 4,
    levels: int = 5,
    contrast: float = 1.15,
    saturation: float = 1.0,
    strength: float = 1.0,
) -> Image.Image:
    img = img.convert("RGB")
    w, h = img.size

    if contrast != 1.0:
        img = ImageEnhance.Contrast(img).enhance(contrast)
    if saturation != 1.0:
        img = ImageEnhance.Color(img).enhance(saturation)

    # Downscale to the dither grid. LANCZOS, not NEAREST: we want the average of
    # each block, not one arbitrary pixel out of sixteen, or fine detail like
    # grass turns into salt-and-pepper noise instead of tone.
    small = img.resize((max(1, w // block), max(1, h // block)), Image.LANCZOS)

    a = np.asarray(small, dtype=np.float32)
    sh, sw, _ = a.shape

    # Tile the threshold matrix over the image and offset each pixel by up to
    # half a quantisation step before rounding. That offset is the whole trick:
    # neighbouring pixels round in different directions, so a flat area breaks
    # into a stable pattern of the two nearest palette entries.
    #
    # At full strength every flat area dithers, which reads as halftone noise
    # rather than as pixel art. Below 1.0 the offset stops reaching the next
    # palette entry in the middle of a flat region, so large areas go solid and
    # the cross-hatch survives only across tonal boundaries — which is the
    # donor's look: chunky flat blocks, texture at the edges between them.
    thresh = np.tile(BAYER4, (sh // 4 + 1, sw // 4 + 1))[:sh, :sw]
    step = 255.0 / (levels - 1)
    a = a + (thresh[:, :, None] - 0.5) * step * strength
    a = np.clip(np.round(a / step) * step, 0, 255).astype(np.uint8)

    # Back up on the same grid with NEAREST, so the pixels stay hard-edged.
    return Image.fromarray(a).resize((w, h), Image.NEAREST)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--block", type=int, default=4)
    ap.add_argument("--levels", type=int, default=5)
    ap.add_argument("--contrast", type=float, default=1.15)
    ap.add_argument("--saturation", type=float, default=1.0)
    ap.add_argument(
        "--strength",
        type=float,
        default=1.0,
        help="Dither amplitude. Below 1.0 flat areas go solid and the texture "
        "survives only across tonal boundaries.",
    )
    ap.add_argument(
        "--width",
        type=int,
        default=1440,
        help="Resize to this width first. The backdrop is never shown larger "
        "than the hero column, and a dithered 4K source is a 6 MB PNG of "
        "pixels nobody sees.",
    )
    args = ap.parse_args()

    img = Image.open(args.src)
    if args.width and img.width > args.width:
        img = img.resize(
            (args.width, round(img.height * args.width / img.width)), Image.LANCZOS
        )

    out = dither(
        img,
        args.block,
        args.levels,
        args.contrast,
        args.saturation,
        args.strength,
    )
    out.save(args.dst, optimize=True)
    print(f"{args.src} -> {args.dst}  {out.width}x{out.height}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
