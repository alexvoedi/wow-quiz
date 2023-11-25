import type { Quote } from './Quote'

export interface Npc {
  id: number
  name: {
    de: string
    en: string
  }
  quotes: Quote[]
}
