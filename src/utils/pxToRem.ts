/**
 * Converts a Pixel value to rem based on a base font size of 16px.
 * @param pixels - Pixels value to be converted
 * @returns The converted value in rem units
 */

export function pxToRem(pixels: number): string {
  return `${pixels / 16}rem`
}
