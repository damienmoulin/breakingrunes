import { ItemEffect } from "@/domain/item";
import { z } from "zod";

const ItemSchema = z.object({
  id: z.number(),
  level: z.number(),
  img: z.string(),
  name: z.object({
    fr: z.string(),
    es: z.string(),
    en: z.string(),
    de: z.string()
  }),
  effects: z.array(z.object({
    from: z.number(),
    to: z.number(),
    effectId: z.number(),
    characteristic: z.number()
  }))
})

const ItemsSchema = z.array(ItemSchema)

export type Items = z.infer<typeof ItemsSchema>
export type Item = z.infer<typeof ItemSchema>

export const formatItems = (items: Items) => {
  const parsedItems = ItemsSchema.safeParse(items)

  if (!parsedItems.success) {
    return []
  } else {
    return parsedItems.data
  }
}

const overrideErrorOnItemEffect = (effect: ItemEffect): ItemEffect => {
  // On Api for PM / PO / PA the from and to is inversed
  if (effect.from > effect.to) {
    return {
      from: effect.to || effect.from,
      to: effect.from || effect.to,
      effectId: effect.effectId
    }
  }

  return {
    from: effect.from,
    to: effect.to,
    effectId: effect.effectId
  }
}

export const formatItem = (item: Item) => {
  const parsedItem = ItemSchema.safeParse(item)
  if (!parsedItem.success) {
    return []
  } else {
    return {
      id: parsedItem.data.id,
      level: parsedItem.data.level,
      img: parsedItem.data.img,
      name: parsedItem.data.name,
      effects: parsedItem.data.effects.filter((effect) => effect.characteristic !== -1).map((effect) => {
          return overrideErrorOnItemEffect(effect)
      })
  }
  }
}