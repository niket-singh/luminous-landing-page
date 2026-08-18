#!/usr/bin/env python3
"""Regenerate every favicon / app icon from the Adzzat logo shown on the site.

Source of truth: public/adzzat-logo.png (the same lockup used in the nav and
footer). The "ADZZAT" wordmark is cropped away and only the A-swoosh mark is
used, because a wordmark is unreadable at 16x16.

Two colour variants, matching the prefers-color-scheme setup in app/layout.tsx:
  * white (#ffffff) -> dark UI  -> favicon*.png, favicon.ico, apple-touch-icon.png, android-chrome-*
  * navy  (#002366) -> light UI -> the *-light.* variants

Small sizes are rendered by supersampling at 8x and dilating the stroke before
downsampling. The raw mark is a hairline monoline: a plain LANCZOS resize turns
it into a grey smudge at 16px, and simply padding less does not help. Dilation
is tuned so the apex counter and the swoosh crescent stay open (variant "B" of
the weight test) instead of clogging into a blob.

Run: /opt/data/venv/bin/python scripts/gen-icons.py   (needs Pillow)
"""
from __future__ import annotations

import io
import struct
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SRC = PUBLIC / "adzzat-logo.png"

# Horizontal slice of the 291x91 lockup holding just the mark. The blank gutter
# before the wordmark starts at x=110, so 111 is a safe cut.
MARK_SLICE = (0, 0, 111, 91)

WHITE = (255, 255, 255)
NAVY = (0, 35, 102)

SUPERSAMPLE = 8


def load_mark() -> Image.Image:
    lockup = Image.open(SRC).convert("RGBA")
    mark = lockup.crop(MARK_SLICE)
    return mark.crop(mark.getbbox())


def recipe(size: int, rgb) -> tuple[float, int, float]:
    """(padding, dilation kernel at SUPERSAMPLE scale, alpha gain) per size.

    Kernel 5 is the tested sweet spot for both polarities: 3 leaves the hairline
    strokes translucent, 7+ closes the triangular counter under the apex.
    """
    if size <= 32:
        return 0.02, 5, 1.35
    if size <= 64:
        return 0.06, 0, 1.0
    return 0.10, 0, 1.0


def render(mark: Image.Image, size: int, rgb) -> Image.Image:
    pad, dilate, gain = recipe(size, rgb)
    big = size * SUPERSAMPLE
    box = int(round(big * (1 - 2 * pad)))
    w, h = mark.size
    scale = min(box / w, box / h)
    glyph = mark.resize((max(1, int(round(w * scale))), max(1, int(round(h * scale)))), Image.LANCZOS)

    alpha = glyph.split()[3]
    if dilate:
        alpha = alpha.filter(ImageFilter.MaxFilter(dilate))

    canvas = Image.new("L", (big, big), 0)
    canvas.paste(alpha, ((big - glyph.size[0]) // 2, (big - glyph.size[1]) // 2))
    small = canvas.resize((size, size), Image.LANCZOS)
    if gain != 1.0:
        small = small.point(lambda v: min(255, int(v * gain)))

    out = Image.new("RGBA", (size, size), rgb + (0,))
    out.putalpha(small)
    return out


def write_ico(path: Path, frames: list[Image.Image]) -> None:
    """Write a PNG-compressed .ico with each frame rendered at its native size.

    Pillow's own ICO writer downsamples one base image, which re-blurs the
    hand-tuned 16px and 32px renders, so the container is packed manually.
    """
    blobs = []
    for frame in frames:
        buf = io.BytesIO()
        frame.save(buf, "PNG", optimize=True)
        blobs.append(buf.getvalue())

    offset = 6 + 16 * len(frames)
    entries, data = b"", b""
    for frame, blob in zip(frames, blobs):
        w, h = frame.size
        entries += struct.pack(
            "<BBBBHHII",
            0 if w >= 256 else w,
            0 if h >= 256 else h,
            0,
            0,
            1,
            32,
            len(blob),
            offset,
        )
        offset += len(blob)
        data += blob

    path.write_bytes(struct.pack("<HHH", 0, 1, len(frames)) + entries + data)


PNG_TARGETS = {
    "favicon-16x16.png": (16, WHITE),
    "favicon-32x32.png": (32, WHITE),
    "favicon-light-16x16.png": (16, NAVY),
    "favicon-light-32x32.png": (32, NAVY),
    "apple-touch-icon.png": (180, WHITE),
    "apple-touch-icon-light.png": (180, NAVY),
    "android-chrome-192x192.png": (192, WHITE),
    "android-chrome-512x512.png": (512, WHITE),
    "android-chrome-light-192x192.png": (192, NAVY),
    "android-chrome-light-512x512.png": (512, NAVY),
}

ICO_SIZES = [16, 32, 48]


def main() -> None:
    mark = load_mark()
    print(f"mark cropped from {SRC.name}: {mark.size[0]}x{mark.size[1]}")

    for name, (size, rgb) in PNG_TARGETS.items():
        render(mark, size, rgb).save(PUBLIC / name, "PNG", optimize=True)
        print(f"wrote public/{name} {size}x{size}")

    for name, rgb in (("favicon.ico", WHITE), ("favicon-light.ico", NAVY)):
        write_ico(PUBLIC / name, [render(mark, s, rgb) for s in ICO_SIZES])
        print(f"wrote public/{name} {ICO_SIZES}")

    (ROOT / "app" / "favicon.ico").write_bytes((PUBLIC / "favicon.ico").read_bytes())
    print("wrote app/favicon.ico (copy of public/favicon.ico)")


if __name__ == "__main__":
    main()
