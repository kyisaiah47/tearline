#!/usr/bin/env python3
"""Dither a photograph into the template's backdrop art.

The Axon donor ran its art through a coarse dither — chunky pixels, a collapsed
palette, visible Bayer cross-hatch — and that treatment is most of why its
sections read as a developer tool rather than as stock landscape photography.
The donor did it in a live WebGL shader, which a static port cannot carry, so it
happens here instead: once, at build time, into a PNG.

Every product on this template runs its own generated photograph through this,
which is what keeps a family of landing pages looking like a family: same grain,
same palette depth, the product's own colours.

Dithering is done by **hitherdither** (hbldh), not by hand. A hand-rolled
threshold-matrix loop gets the cross-hatch roughly right and the palette badly
wrong: it quantises each channel on an independent uniform ramp, so R, G and B
round in different directions and an amber photograph picks up green and magenta
speckle through its midtones. hitherdither dithers against a real palette chosen
from the image itself, in colour space, so every dithered pixel is a colour that
was actually in the picture.

    .venv/bin/python tools/dither.py in.png public/images/hero-backdrop.png

Setup, once:

    python3 -m venv .venv
    .venv/bin/pip install -r tools/requirements.txt

The PyPI package called `hitherdither` is a reserved placeholder containing no
code — installing it succeeds and imports nothing. requirements.txt points at
the GitHub source, which is the real library.

Flags, in the order you will want them:

    --colors N     palette size, chosen from the image by median cut. Lower
                   collapses the palette harder. 8 is the donor's depth.
    --block N      pixel size. Bigger is coarser. 8 matches the donor.
    --threshold N  Bayer dither amplitude. Low keeps flat areas flat and leaves
                   the cross-hatch only where tones meet — the donor look. High
                   dithers everything and reads as halftone noise.
    --order N      Bayer matrix order (2, 4, 8, 16). 8 is the classic.
    --contrast F   applied BEFORE dithering. Ordered dither has nothing to work
                   with in a flat midtone, so a photograph usually needs a push.
    --method M     `bayer` (default) for the donor's ordered cross-hatch, or an
                   error-diffusion kernel — floyd-steinberg, atkinson, jarvis,
                   stucki, burkes, sierra3 — for organic grain with no pattern.

Settings used for this product's backdrop:

    --colors 8 --block 8 --threshold 48 --contrast 1.12

Deliberately not a CSS filter: dithering needs a fixed pixel grid, and a
CSS-filtered image re-dithers itself at every viewport width, so the whole
backdrop crawls while the page resizes.
"""

import argparse
import sys

from PIL import Image, ImageEnhance

try:
    import hitherdither
except ImportError:  # pragma: no cover - setup guidance, not logic
    sys.exit(
        "hitherdither is missing. From the repo root:\n"
        "  python3 -m venv .venv\n"
        "  .venv/bin/pip install -r tools/requirements.txt\n"
        "then run this with .venv/bin/python."
    )

DIFFUSION = {
    "floyd-steinberg",
    "atkinson",
    "jarvis-judice-ninke",
    "stucki",
    "burkes",
    "sierra3",
    "sierra2",
    "sierra-2-4a",
    "stevenson-arce",
}


def dither(
    img: Image.Image,
    colors: int = 8,
    block: int = 8,
    threshold: int = 48,
    order: int = 8,
    contrast: float = 1.12,
    saturation: float = 1.0,
    method: str = "bayer",
) -> Image.Image:
    img = img.convert("RGB")
    w, h = img.size

    if contrast != 1.0:
        img = ImageEnhance.Contrast(img).enhance(contrast)
    if saturation != 1.0:
        img = ImageEnhance.Color(img).enhance(saturation)

    # Downscale to the dither grid FIRST, so the palette is chosen from the tones
    # that will actually survive and the dither runs on the pixels we ship.
    # LANCZOS, not NEAREST: we want each block's average, not one arbitrary pixel
    # out of sixty-four, or fine detail like grass becomes salt-and-pepper noise
    # instead of tone.
    small = img.resize((max(1, w // block), max(1, h // block)), Image.LANCZOS)

    # Median cut over the image's own colours. This is the part worth having a
    # library for — the palette is what stops a warm photograph from picking up
    # cold speckle.
    palette = hitherdither.palette.Palette.create_by_median_cut(small, n=colors)

    if method in DIFFUSION:
        out = hitherdither.diffusion.error_diffusion_dithering(
            small, palette, method=method, order=2
        )
    else:
        out = hitherdither.ordered.bayer.bayer_dithering(
            small, palette, threshold, order=order
        )

    # Back up on the same grid with NEAREST, so the pixels stay hard-edged.
    return out.convert("RGB").resize((w, h), Image.NEAREST)


def main() -> int:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--colors", type=int, default=8)
    ap.add_argument("--block", type=int, default=8)
    ap.add_argument("--threshold", type=int, default=48)
    ap.add_argument("--order", type=int, default=8, choices=[2, 4, 8, 16])
    ap.add_argument("--contrast", type=float, default=1.12)
    ap.add_argument("--saturation", type=float, default=1.0)
    ap.add_argument("--method", default="bayer")
    ap.add_argument(
        "--width",
        type=int,
        default=1440,
        help="Resize to this width first. The backdrop is never shown wider "
        "than the section it sits in, and a dithered 4K source is megabytes "
        "of pixels nobody sees.",
    )
    args = ap.parse_args()

    img = Image.open(args.src)
    if args.width and img.width > args.width:
        img = img.resize(
            (args.width, round(img.height * args.width / img.width)), Image.LANCZOS
        )

    out = dither(
        img,
        colors=args.colors,
        block=args.block,
        threshold=args.threshold,
        order=args.order,
        contrast=args.contrast,
        saturation=args.saturation,
        method=args.method,
    )
    out.save(args.dst, optimize=True)
    print(f"{args.src} -> {args.dst}  {out.width}x{out.height}  ({args.method})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
