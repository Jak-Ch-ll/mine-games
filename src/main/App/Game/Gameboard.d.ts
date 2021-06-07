type Row = number
type Col = number
/**
 * Format: Row/Col
 */
export type Coord = `${Row}/${Col}`
export type BombCoordinates = Set<Coord>
