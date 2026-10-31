# Removes the metadata from WebPs, in place: the EXIF block (camera model, date and GPS location) and XMP.
# The pixels, the transparency and the colour profile are untouched.
# The site is public, so run this on every WebP before it goes in public/.
#   python3 scripts/strip-webp.py public/faces/*.webp
import os
import sys

# The chunks that make up the picture, kept as is. Every other chunk is dropped
# (EXIF, XMP, and anything this list doesn't know about).
KEEP = {b'VP8X', b'VP8 ', b'VP8L', b'ALPH', b'ICCP', b'ANIM', b'ANMF'}
# Bits in the VP8X header that announce an EXIF and an XMP chunk; they have to go with the chunks
EXIF_FLAG, XMP_FLAG = 0x08, 0x04


def strip(path):
    data = open(path, 'rb').read()
    if data[:4] != b'RIFF' or data[8:12] != b'WEBP':
        print(f'skipped (not a WebP): {path}')
        return
    chunks, removed, i = [], [], 12
    while i < len(data):
        kind = data[i:i + 4]
        length = int.from_bytes(data[i + 4:i + 8], 'little')
        if i + 8 + length > len(data):
            print(f'skipped (damaged WebP): {path}')
            return
        if kind in KEEP:
            body = bytearray(data[i + 8:i + 8 + length])
            if kind == b'VP8X':
                body[0] &= 0xFF & ~(EXIF_FLAG | XMP_FLAG)
            chunks.append(kind + length.to_bytes(4, 'little') + bytes(body) + b'\0' * (length & 1))
        else:
            removed.append(kind.decode('latin1').strip())
        i += 8 + length + (length & 1)  # chunks are padded to an even length
    if not removed:
        print(f'already clean: {path}')
        return
    payload = b'WEBP' + b''.join(chunks)
    clean = b'RIFF' + len(payload).to_bytes(4, 'little') + payload
    # Write beside it and swap, so a crash can't leave half a file
    tmp = path + '.tmp'
    open(tmp, 'wb').write(clean)
    os.replace(tmp, path)
    print(f'cleaned: {path} ({len(data) - len(clean)} bytes removed: {", ".join(removed)})')


for p in sys.argv[1:]:
    strip(p)
