import { Effect } from './effect';
import { Translation } from "./translation"

export interface Item {
    id: number,
    level: number,
    img: string,
    name: Translation,
    effects: ItemEffect[]
}

export interface ItemEffect  {
  from: number,
  to: number,
  effectId: number,
  effect?: Effect 
} 