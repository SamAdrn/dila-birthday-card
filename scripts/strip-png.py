# Removes the metadata from PNGs, in place: the EXIF block (camera model, date and GPS location),
# XMP, text notes and timestamps. The pixels and the transparency are untouched.
# The site is public, so run this on every PNG before it goes in public/.
#   python3 scripts/strip-png.py public/faces/*.png
import os
import sys

SIGNATURE = b'\x89PNG\r\n\x1a\n'
# Optional chunks that change how the picture looks. They are kept as is; every other optional chunk
# is dropped (eXIf, iTXt, tEXt, zTXt, tIME, pHYs...), including ones this list doesn't know about.
KEEP = {b'tRNS', b'gAMA', b'cHRM', b'sRGB', b'iCCP', b'cICP', b'acTL', b'fcTL', b'fdAT'}


def strip(path):
    data = open(path, 'rb').read()
    if data[:8] != SIGNATURE:
        print(f'skipped (not a PNG): {path}')
        return
    out, removed, i = [data[:8]], [], 8
    while i < len(data):
        length = int.from_bytes(data[i:i + 4], 'big')
        kind = data[i + 4:i + 8]
        end = i + 12 + length  # length, type, data and CRC
        if end > len(data):
            print(f'skipped (damaged PNG): {path}')
            return
        # An uppercase first letter marks a critical chunk (IHDR, PLTE, IDAT, IEND): always kept
        if kind[:1].isupper() or kind in KEEP:
            out.append(data[i:end])
        else:
            removed.append(kind.decode('latin1'))
        i = end
    if not removed:
        print(f'already clean: {path}')
        return
    clean = b''.join(out)
    # Write beside it and swap, so a crash can't leave half a file
    tmp = path + '.tmp'
    open(tmp, 'wb').write(clean)
    os.replace(tmp, path)
    print(f'cleaned: {path} ({len(data) - len(clean)} bytes removed: {", ".join(removed)})')


for p in sys.argv[1:]:
    strip(p)
