# Sanovias Favicon Creation Guide

## Source Files
- **Source Image**: `public/images/sanovias_2.png` (1024x1024)
- **Current Favicon**: `src/app/favicon.ico` (16x16, 32x32)

## Steps to Create New Favicon

### Method 1: Online Favicon Generator (Recommended)

1. **Extract the Logo Elements First**:
   - Open `public/images/sanovias_2.png` in an image editor (Photoshop, GIMP, Canva)
   - Crop/select only the lotus leaf motif and abstract "S" elements
   - Save as a high-quality PNG (512x512 or 256x256)

2. **Generate Favicon**:
   - Go to https://favicon.io/favicon-generator/
   - Upload your cropped logo
   - Select icon sizes: 16x16, 32x32, 48x48 (to match current favicon)
   - Download the generated favicon.ico

3. **Replace Current Favicon**:
   ```bash
   # Backup current favicon
   cp src/app/favicon.ico src/app/favicon.ico.backup
   
   # Replace with new favicon
   cp downloaded-favicon.ico src/app/favicon.ico
   ```

### Method 2: Using ImageMagick (Command Line)

```bash
# Install ImageMagick if not available
# Extract and resize the logo first manually, then:

# Create multiple sizes
convert logo-cropped.png -resize 16x16 favicon-16.png
convert logo-cropped.png -resize 32x32 favicon-32.png

# Combine into ICO file
convert favicon-16.png favicon-32.png favicon.ico

# Replace current favicon
cp favicon.ico src/app/favicon.ico
```

### Method 3: Using GIMP (Free Alternative)

1. Open `public/images/sanovias_2.png` in GIMP
2. Use selection tools to isolate lotus leaf + abstract "S"
3. Export selection as PNG
4. Scale image to 32x32 (File → Scale Image)
5. Export as ICO file (File → Export As → favicon.ico)

## Design Considerations for Favicon

### Elements to Include:
- ✅ Lotus leaf motif (main visual element)
- ✅ Abstract "S" shape (brand identifier)
- ❌ Avoid text (too small to read at 16x16)
- ❌ Avoid complex details (simplify for small sizes)

### Color Recommendations:
- Use high contrast colors
- Consider how it looks on both light and dark backgrounds
- Maintain brand colors if possible: teal (#2CA6A4) and gold (#C9A66B)

### Technical Requirements:
- **Sizes**: 16x16, 32x32 pixels minimum
- **Format**: ICO file with multiple embedded sizes
- **Colors**: 32-bit color with transparency support

## Testing the New Favicon

After replacement:
1. Clear browser cache (Ctrl+F5)
2. Check in browser tab
3. Test on different backgrounds
4. Verify in bookmarks/favorites

## Current Favicon Location
- **File**: `src/app/favicon.ico`
- **Next.js**: Automatically served at `/favicon.ico`
- **Backup**: Create backup before replacing

## Alternative: SVG Favicon (Modern Approach)

Consider creating an SVG version for better scalability:
```html
<!-- In layout.tsx head -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/x-icon" href="/favicon.ico"> <!-- fallback -->
```