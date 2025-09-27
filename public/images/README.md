# Images Directory Structure

This directory contains all image assets for the Sanovias website, organized by category for better maintainability and scalability.

## Directory Structure

```
/public/images/
├── blog/                    # Blog-related images
│   ├── dental-implants.jpeg # Blog post thumbnails and featured images
│   ├── dr-author.jpg        # Author profile photos for blog posts
│   ├── medical-expert.jpg   # Medical expert images
│   ├── medical-procedures.jpg
│   ├── patient-success.jpg
│   ├── plastic-surgery-guide.jpg
│   ├── tunisia-destination.jpg
│   └── README.md           # Blog images documentation
│
├── partners/               # Partner and insurance company logos
│   ├── allianz-logo.svg    # Insurance partner logos
│   ├── khayem-logo.svg     # Medical facility partners
│   ├── polyclinic-logo.webp
│   ├── sindbad-logo.gif    # Travel/accommodation partners
│   ├── sindbad-logo.jpg    # Alternative format for sindbad logo
│   ├── stce-header3.png    # Partner organization logos
│   └── uniqa-logo.svg
│
├── slider/                 # Homepage hero slider images
│   ├── slider1.jpg         # Medical tourism destination images
│   ├── slider2.png         # Medical facility images
│   ├── slider3.jpeg        # Treatment procedure images
│   └── slider4.jpg         # Recovery and aftercare images
│
├── team/                   # Team member photographs
│   ├── ala.jpg            # Team member profile photos
│   └── atef.jpg           # Used in about page and blog author profiles
│
└── sanovias_2.png         # Company logo and branding assets
```

## Usage Guidelines

### Adding New Images

1. **Blog Images**: Place in `/blog/` directory
   - Use descriptive filenames (e.g., `dental-tourism-tunisia.jpg`)
   - Optimize for web (recommended: JPEG for photos, PNG for graphics)
   - Include alt text descriptions for accessibility

2. **Partner Logos**: Place in `/partners/` directory
   - Maintain consistent sizing and format when possible
   - Use SVG format for scalable logos when available
   - Include both light and dark versions if needed

3. **Slider Images**: Place in `/slider/` directory
   - Use high-resolution images (minimum 1920x600px)
   - Optimize file sizes for fast loading
   - Maintain consistent aspect ratios

4. **Team Photos**: Place in `/team/` directory
   - Use professional headshots with consistent styling
   - Square format (1:1 aspect ratio) recommended
   - Optimize for both large and small display sizes

### File Naming Conventions

- Use lowercase letters and hyphens for separators
- Be descriptive but concise
- Include relevant keywords for SEO
- Example: `plastic-surgery-tunisia-clinic.jpg`

### Image Optimization

- **JPEG**: Use for photographs and complex images
- **PNG**: Use for graphics, logos with transparency, or simple images
- **SVG**: Use for scalable vector graphics and simple logos
- **WebP**: Consider for modern browsers (with fallbacks)

### Responsive Images

When adding new images, consider multiple sizes for responsive design:
- Mobile: 320px - 768px wide
- Tablet: 768px - 1024px wide  
- Desktop: 1024px+ wide

## Referenced Files

These images are referenced in the following components:

- **Homepage**: `/src/app/[locale]/page.tsx`
  - Slider images from `/slider/`
  - Partner logos from `/partners/`

- **About Page**: `/src/app/[locale]/about/page.tsx`
  - Team photos from `/team/`

- **Blog System**: `/src/app/[locale]/blog/`
  - Blog images from `/blog/`
  - Team photos from `/team/` (for author profiles)

## Maintenance Notes

- Keep image file sizes optimized for web performance
- Regularly audit unused images and remove them
- Update alt text and descriptions for accessibility
- Consider using Next.js Image component for automatic optimization
- Maintain backup copies of original high-resolution images

## Contact

For questions about image management or adding new assets, contact the development team.