'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { Items } from "@/adapter/itemsAdapter";
import { fetchItems } from "@/data/fetchItems";

export default function Home() {

  const [items, setItems] = useState<Items>([])
  const abortController = new AbortController();
  
  const onSearchItem = (search: string) => {
    if (!search.length) {
      return setItems([])
    }
    fetchItems({search, signal: abortController.signal}).then((data) => {
      setItems(data)
    })
  }

  return (
      <main className={styles.main}>
        <h1>Cherche ton Item</h1>
        <input className={styles.search} type="text" placeholder="Search Item" onChange={(e) => onSearchItem(e.target.value)}/>

        <section className={styles.items}>
          {items.map((item) => 
            <a href={`/item/${item.id}`} key={item.id} className={styles.item}>
              <Image src={item.img} alt={item.name.fr} width={200} height={200}/>
              <div>{ item.name.fr}</div>
            </a>
          )}
        </section>
       
      </main>
  );
}
