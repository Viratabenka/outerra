# Sanity Utilities

This directory contains utilities for working with Sanity CMS in the Outerra project.

## Image URL Builder

The `imageUrl.ts` utility provides helper functions for building optimized image URLs from Sanity image sources.

### Usage

```typescript
import { urlFor, getImageUrl, getCroppedImageUrl, getOptimizedImageUrl } from "@/sanity/imageUrl";

// Basic usage - chain methods
const imageUrl = urlFor(heroImage)
  .width(800)
  .height(600)
  .quality(80)
  .url();

// Helper function for simple width
const thumbnail = getImageUrl(heroImage, 300, 75);

// Helper function for cropped images
const cropped = getCroppedImageUrl(heroImage, 800, 600, 80);

// Helper function with auto format optimization
const optimized = getOptimizedImageUrl(heroImage, 1200, 85);
```

### Available Methods

The `urlFor()` function returns a builder with these methods:

- `.width(number)` - Set image width
- `.height(number)` - Set image height
- `.quality(number)` - Set quality (1-100)
- `.fit(string)` - Set fit mode ('clip', 'crop', 'fill', 'fillmax', 'max', 'scale', 'min')
- `.crop(string)` - Set crop mode ('top', 'bottom', 'left', 'right', 'center', 'focalpoint', 'entropy')
- `.auto(string)` - Auto optimization ('format')
- `.blur(number)` - Apply blur (1-100)
- `.sharpen(number)` - Apply sharpening (0-100)
- `.url()` - Get the final URL string

### Examples

```typescript
// Responsive hero image
const heroUrl = urlFor(heroImage)
  .width(1920)
  .quality(90)
  .auto("format")
  .url();

// Thumbnail with blur placeholder
const thumbnail = urlFor(image)
  .width(300)
  .height(300)
  .fit("crop")
  .quality(75)
  .url();

// Optimized for web
const webImage = getOptimizedImageUrl(image, 1200, 85);
```

### Next.js Image Component

For use with Next.js Image component:

```typescript
import Image from "next/image";
import { urlFor } from "@/sanity/imageUrl";

<Image
  src={urlFor(heroImage).width(1920).url()}
  alt={heroImage.alt || "Image"}
  width={1920}
  height={1080}
  quality={90}
/>
```

