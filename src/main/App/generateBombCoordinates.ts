import type { Coord } from "./Game/Gameboard"

export function generateBombCoordinates(
  rows: number,
  columns: number,
  numOfBombs: number
): Set<Coord> {
  const coordinates = new Set<Coord>()

  while (coordinates.size < numOfBombs) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * columns)

    coordinates.add(`${row}/${col}`)
  }

  return coordinates
}
