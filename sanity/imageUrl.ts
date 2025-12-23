import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

/**
 * Builds a Sanity image URL from an image source
 * @param source - Sanity image object (from heroImage, image field, etc.)
 * @returns Image URL builder instance with helper methods
 * 
 * @example
 * ```ts
 * const imageUrl = urlFor(heroImage).width(800).url();
 * const thumbnail = urlFor(heroImage).width(300).height(300).url();
 * const optimized = urlFor(heroImage).width(1200).quality(80).url();
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Helper function to get a responsive image URL
 * @param source - Sanity image object
 * @param width - Desired width in pixels
 * @param quality - Image quality (1-100, default: 75)
 * @returns Image URL string
 */
export function getImageUrl(
  source: SanityImageSource,
  width: number,
  quality: number = 75
): string {
  return urlFor(source).width(width).quality(quality).url();
}

/**
 * Helper function to get a cropped image URL
 * @param source - Sanity image object
 * @param width - Desired width in pixels
 * @param height - Desired height in pixels
 * @param quality - Image quality (1-100, default: 75)
 * @returns Image URL string
 */
export function getCroppedImageUrl(
  source: SanityImageSource,
  width: number,
  height: number,
  quality: number = 75
): string {
  return urlFor(source).width(width).height(height).quality(quality).url();
}

/**
 * Helper function to get an optimized image URL with auto format
 * @param source - Sanity image object
 * @param width - Desired width in pixels
 * @param quality - Image quality (1-100, default: 75)
 * @returns Image URL string with auto format
 */
export function getOptimizedImageUrl(
  source: SanityImageSource,
  width: number,
  quality: number = 75
): string {
  return urlFor(source)
    .width(width)
    .quality(quality)
    .auto("format")
    .url();
}

/**
 * Helper function to get a blur placeholder data URL
 * @param source - Sanity image object
 * @returns Base64 encoded blur placeholder
 */
export function getBlurPlaceholder(source: SanityImageSource): string {
  return urlFor(source).width(20).blur(50).url();
}

