import { Item } from "@/domain/item"

export const fetchItem = (id: number): Promise<Item> => {
  const items = fetch(`http://localhost:3000/api/item?id=${id}`).then((data) => data.json()).catch(() => {
    return undefined
  })

  return items as Promise<Item>
}