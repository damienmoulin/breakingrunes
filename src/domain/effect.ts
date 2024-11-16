import { Translation } from "./translation"

export interface Effect {
  id: number
  caracteristicWeight: number
  description: Translation
  runeWeight: number,

}

export const getOverridedRuneWeight = (effectId: number) => {
  switch(effectId) {
    case 125: return 1  // Vitality 0.2 weight by caracteristic but runes = 0.2*5
    default: return null
  }
}