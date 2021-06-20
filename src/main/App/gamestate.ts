import { writable } from "svelte/store"

export interface Gamestate {
  status: "Setup" | "Lost" | "Won"
  safeFields: number
  bombCounter: number
}

const initialValues: Gamestate = {
  status: "Setup",
  safeFields: 0,
  bombCounter: 0,
}

const gamestateStore = writable<Gamestate>(initialValues)

export const gamestate = {
  ...gamestateStore,
}
