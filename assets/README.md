# assets

Sources, not shipped files. Everything the site actually serves is derived from
what is here and lives in `public/`.

## hero-backdrop-source.png

The generated photograph behind the hero window, before treatment. Generated
through the free Gemini browser path and watermark-scrubbed.

The shipped `public/images/hero-backdrop.png` is this run through the dither:

    ~/.claude/skills/gemini-image-scrub/.venv/bin/python tools/dither.py \
      assets/hero-backdrop-source.png public/images/hero-backdrop.png \
      --block 8 --levels 6 --contrast 1.12 --strength 0.6

Keep the source. The dither is lossy and the settings will get retuned.
