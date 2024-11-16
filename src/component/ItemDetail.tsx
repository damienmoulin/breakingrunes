"use client"

import { Item } from "@/domain/item"
import styles from "./itemDetail.module.css";
import Image from "next/image";
import { parseCaracteristic } from "@/service/caracteristic";
import { useState } from "react";
import { Runes } from "./Runes";

const ItemDetail = ({item}: {item: Item}) => {
  const [breakingRate, setBreakingRate] = useState<number>(1)
  const [focusOn, setFocus] = useState<number|null>(null)
  
  const onClickOnFocus = (effectId: number) => {
    if (focusOn === effectId) {
      return setFocus(null)
    }

    setFocus(effectId)
  }

  return <article className={styles.item}>
      <Image src={item.img} alt={item.name.fr} width={200} height={200}/>
      <div className={styles.caracteristic}>
        <div className={styles.title}>
          <h1>{item.name.fr} </h1>
          <input type="number" placeholder="Taux" defaultValue={100} onChange={(e) => setBreakingRate(parseInt(e.target.value) /100)}/>
        </div>
        
        <ul className={styles.list_effects}>
          {item.effects.map((effect) => <li className={styles.effect} key={effect.effectId}>
            <Image src={`/icons/${effect.effectId}.png`} alt="" aria-hidden width={200} height={200}/>
            <span className={effect.to < 0 ? styles.negative : styles.positive}>{parseCaracteristic(effect)}</span>
            <input type="checkbox" name={"focus"} alt="Focus" checked={focusOn === effect.effectId} onChange={() => onClickOnFocus(effect.effectId)}/>
            <Runes effect={effect} item={item} focusOn={focusOn} breakingRate={breakingRate}/>
          </li>)}
        </ul>
      </div>
  </article>
}

export default ItemDetail