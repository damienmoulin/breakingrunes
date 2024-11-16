import ItemDetail from "@/component/ItemDetail";
import styles from "./page.module.css";
import { fetchItem } from "@/data/fetchItem";
import { fetchEffect } from "@/data/fetchEffects";
import { Item } from "@/domain/item";
import Link from "next/link";


export default async function ItemPage({params}: {
  params: Promise<{id: number }>
}) {
  const itemId = (await params).id

  const itemInformations = await fetchItem(itemId)

  const effects = await Promise.all(itemInformations.effects.map(async (effect) => {
    const effectDetail = await fetchEffect(effect.effectId)
    return {...effect, effect: effectDetail}
  }))

  return (
      <main className={styles.main}>
        <Link className={styles.back} href="/">Retour</Link>
        <ItemDetail item={{...itemInformations, effects} as unknown as Item}/>
      </main>
  );
}
