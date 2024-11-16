import { getOverridedRuneWeight } from "@/domain/effect";
import { z } from "zod";

const EffectSchema = z.object({
  id: z.number(),
  effectPowerRate: z.coerce.number(),
  description: z.object({
    fr: z.string(),
    es: z.string(),
    en: z.string(),
    de: z.string()
  })
})

export type Effects = z.infer<typeof EffectSchema>
export const formatEffects = (effects: Effects) => {
  const parsedEffect = EffectSchema.safeParse(effects)

  if (!parsedEffect.success) {
    return []
  } else {
    return ({
      id: parsedEffect.data.id,
      caracteristicWeight: Math.abs(parsedEffect.data.effectPowerRate),
      description: parsedEffect.data.description,
      runeWeight: getOverridedRuneWeight(parsedEffect.data.id) || Math.abs(parsedEffect.data.effectPowerRate),
    })
  }
}