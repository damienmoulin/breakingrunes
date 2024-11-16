import { Items } from "@/adapter/itemsAdapter"

export const fetchItems = ({search, signal}: {search: string, signal?: AbortSignal}): Promise<Items> => {
  const items = fetch(`http://localhost:3000/api/items?search=${search}`, {signal}).then((data) => data.json()).catch(() => {
    return []
  })

  return items as Promise<Items>
}