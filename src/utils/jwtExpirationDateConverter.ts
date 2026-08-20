/**
 * Converts a JWT exp in days
 * @param exp - Number of days to be converted
 * @returns Converted exp in days
 */

export function jwtExpirationDateConverter(exp: number): number {
  const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
  const secondsUntilExpiration = exp - currentTime // Calculate the difference in seconds
  const secondsInADay = 60 * 60 * 24
  const daysUntilExpiration = secondsUntilExpiration / secondsInADay // Convert seconds to days
  return daysUntilExpiration
}
