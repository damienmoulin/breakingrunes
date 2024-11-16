import { Item } from "@/domain/item"

export const fetchItem = (id: number): Promise<Item> => {
  const items = fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/item?id=${id}`).then((data) => data.json()).catch(() => {
    return undefined
  })

  return items as Promise<Item>
}