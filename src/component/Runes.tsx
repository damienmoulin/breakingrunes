import { Item, ItemEffect } from "@/domain/item";
import { useEffect, useState } from "react";
import styles from "./runes.module.css";
import { calculateRatesForEffect } from "@/service/runes";

export const Runes = ({effect, item, focusOn, breakingRate} : {effect: ItemEffect, item: Item, focusOn: number|null, breakingRate: number}) => {

  const [minRunes, setMinRunes] = useState<number>(0);
  const [maxRunes, setMaxRunes] = useState<number>(0);

  useEffect(() => {
    if (focusOn && focusOn !== effect.effectId) {
      setMinRunes(0)
      setMaxRunes(0)

      return
    }

    if (effect.from > 0 && effect.effect?.runeWeight) {
      let minRunesWithoutFocus = calculateRatesForEffect(effect.from, item.level, effect.effect.caracteristicWeight, effect.effect.runeWeight, breakingRate)

      if (focusOn === effect.effectId) {
        item.effects.map((otherEffect) => {
          if (!otherEffect.effect || otherEffect.effectId === effect.effectId) {
            return
          }
          minRunesWithoutFocus = minRunesWithoutFocus + (calculateRatesForEffect(otherEffect.from, item.level, otherEffect.effect?.caracteristicWeight ?? 0, effect.effect?.runeWeight ?? 0, breakingRate)) * 0.5 * (otherEffect.from < 0 ? 0.1 : 1)
        })
      }

      setMinRunes(minRunesWithoutFocus)
    }

    if (effect.to > 0 && effect.effect?.runeWeight) {
      
      let maxRunesWithoutFocus = calculateRatesForEffect(effect.to, item.level, effect.effect?.caracteristicWeight, effect.effect.runeWeight, breakingRate)

      if (focusOn === effect.effectId) {
        item.effects.map((otherEffect) => {
          if (!otherEffect.effect || otherEffect.effectId === effect.effectId) {
            return
          }
          maxRunesWithoutFocus = maxRunesWithoutFocus + (calculateRatesForEffect(otherEffect.to, item.level, otherEffect.effect?.caracteristicWeight ?? 0, effect.effect?.runeWeight ?? 0, breakingRate)) * 0.5 * (otherEffect.from < 0 ? 0.1 : 1)
        })
      }
      setMaxRunes(maxRunesWithoutFocus)
    }

  }, [effect, item, focusOn, breakingRate])

  return <div className={styles.runes}>
    {minRunes > 0 && <span className={styles.min}>{minRunes.toFixed(2)}</span>}
    {maxRunes > 0 && <>{` à `} <span className={styles.max}>{maxRunes.toFixed(2)}</span></>}
  </div>
}