export const calculateRatesForEffect = (caracteristic: number, level: number, caracteristicWeight: number, runeWeight: number, breakingRate: number): number => {
  return ((3 * caracteristic * caracteristicWeight * level / 200) + 1) / runeWeight * breakingRate 
}