import { ItemEffect } from "@/domain/item"
import { forcePositiveNumber } from "./math"

export const parseCaracteristic = (effect: ItemEffect): string => {
  let caracteristicDescription = effect.effect?.description.fr ?? ''
  caracteristicDescription = caracteristicDescription.replaceAll('-#1', effect.from.toString())
  caracteristicDescription = caracteristicDescription.replaceAll('#1',  effect.from.toString())
  caracteristicDescription = caracteristicDescription.replaceAll('-#2', effect.to !== effect.from ? effect.to.toString() : '')
  caracteristicDescription = caracteristicDescription.replaceAll('#2', effect.to !== effect.from ? effect.to.toString(): '')
  caracteristicDescription = caracteristicDescription.replaceAll('{{~1~2 à }}',  effect.to !== effect.from ? ' à ' : '')
  caracteristicDescription = caracteristicDescription.replaceAll('{{~1~2 à -}}', effect.to !== effect.from  ? ' à ' : '')

  caracteristicDescription = caracteristicDescription.replaceAll('{{~ps}}{{~zs}}', forcePositiveNumber(effect.from) > 1 ? 's': '')

  return caracteristicDescription
}