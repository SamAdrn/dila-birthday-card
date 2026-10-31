# Removes the EXIF block (camera model, date and GPS location) from JPEGs, in place.
# The site is public, so run this on every photo before it goes in public/.
#   python3 scripts/strip-exif.py public/photos/*.jpg public/friends/*.jpg
import sys


def strip(path):
    data = open(path, 'rb').read()
    if data[:2] != b'\xff\xd8':
        print(f'skipped (not a JPEG): {path}')
        return
    out, i = data[:2], 2
    while i < len(data):
        marker = data[i + 1]
        if marker == 0xDA:  # start of the image data: everything after it is kept as is
            out += data[i:]
            break
        length = int.from_bytes(data[i + 2:i + 4], 'big')
        segment = data[i:i + 2 + length]
        if not (marker == 0xE1 and segment[4:10] == b'Exif\0\0'):
            out += segment
        i += 2 + length
    open(path, 'wb').write(out)
    print(f'cleaned: {path} ({len(data) - len(out)} bytes removed)')


for p in sys.argv[1:]:
    strip(p)
