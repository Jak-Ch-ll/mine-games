<script lang="ts">
  import type { BombCoordinates, Coord } from "./Gameboard"

  import Field from "./Gameboard/Field.svelte"

  export let columns: number
  export let rows: number
  export let bombCoordinates: BombCoordinates = new Set()

  interface MappedField {
    id: Coord
    isBomb: boolean
    button?: HTMLButtonElement
  }

  type BoardMap = MappedField[][]

  const boardMap: BoardMap = Array.from(
    { length: rows },
    (_, i): MappedField[] => {
      return Array.from({ length: columns }, (_, j): MappedField => {
        const id: Coord = `${i}/${j}`
        return {
          id,
          isBomb: bombCoordinates.has(id),
        }
      })
    }
  )

  function calcBombs(row: number, col: number) {
    let counter = 0

    for (let i = row - 1; i <= row + 1; i++) {
      // skip iteration if exceeding board
      if (i < 0 || i >= rows) continue

      for (let j = col - 1; j <= col + 1; j++) {
        // skip iteration if exceeding board
        if (j < 0 || j >= columns) continue

        if (boardMap[i][j].isBomb) counter++
      }
    }

    return counter
  }

  function clickNeighbores(row: number, col: number) {
    // console.log("Clicking")
    const click = new Event("click")

    for (let i = row - 1; i <= row + 1; i++) {
      // skip iteration if exceeding board
      if (i < 0 || i >= rows) continue

      for (let j = col - 1; j <= col + 1; j++) {
        // skip iteration if exceeding board
        if (j < 0 || j >= columns) continue
        const button = boardMap[i][j]?.button

        if (button && !button.disabled) {
          setTimeout(() => {
            if (!button.disabled) button.dispatchEvent(click)
          }, 30)
        }
      }
    }
  }
</script>

<!-- HTML -->
<div class="gameboard">
  {#each boardMap as row, i}
    <div class="row">
      {#each row as { id, isBomb }, j (id)}
        <Field
          {isBomb}
          neighborBombs={calcBombs(i, j)}
          on:click={() => {
            if (calcBombs(i, j) === 0) clickNeighbores(i, j)
          }}
          bind:button={boardMap[i][j].button}
        />
      {/each}
    </div>
  {/each}
</div>

<!-- Style -->
<style lang="scss">
  .gameboard {
    overflow: visible;
  }

  .row {
    white-space: nowrap;
  }
</style>
