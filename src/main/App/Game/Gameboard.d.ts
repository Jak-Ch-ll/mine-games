type Row = number
type Col = number

/**
 * Format: Row/Col
 */
export type Coord = `${Row}/${Col}`
/**
 * Format: Row/Col
 * @see {@link Coord}
 */
export type BombCoordinates = Set<Coord>
