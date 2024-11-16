import { Effects } from "@/adapter/effectsAdapter"

export const fetchEffect = (id: number): Promise<Effects> => {
  const effects = fetch(`http://localhost:3000/api/effect?id=${id}`).then((data) => data.json()).catch(() => {
    return undefined
  })

  return effects as Promise<Effects>
}