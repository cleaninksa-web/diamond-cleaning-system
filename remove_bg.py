"""Remove black background from logo PNG and make it transparent"""
from PIL import Image
import os

logo_path = os.path.join('assets', 'logo.png')
output_path = os.path.join('assets', 'logo.png')
backup_path = os.path.join('assets', 'logo_backup.png')

img = Image.open(logo_path).convert('RGBA')
pixels = img.load()

# Backup original
img.save(backup_path)

w, h = img.size
threshold = 30  # pixels darker than this = black background

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        # If pixel is very dark (black background), make transparent
        if r < threshold and g < threshold and b < threshold:
            pixels[x, y] = (0, 0, 0, 0)

img.save(output_path, 'PNG')
print(f"Done! Saved transparent logo to {output_path}")
print(f"Backup saved to {backup_path}")
