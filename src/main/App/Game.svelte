<script lang="ts">
  import type { Coord } from "./Game/Gameboard.d"

  import Gameboard from "./Game/Gameboard.svelte"

  let gameStarted = false
  let columns = 10
  let rows = 10
  let bombs = 10

  function generateBombCoordinates(numOfBombs: number) {
    const coordinates = new Set<Coord>()

    while (coordinates.size < numOfBombs) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * columns)

      coordinates.add(`${row}/${col}`)
    }

    return coordinates
  }
</script>

<!-- HTML -->
{#if !gameStarted}
  <form
    aria-label="setup"
    on:change={() => {
      if (columns < 1) columns = 1
      if (rows < 1) rows = 1
      if (bombs < 1) bombs = 1

      const maxBombs = (rows * columns) / 2
      if (bombs > maxBombs) bombs = maxBombs
    }}
  >
    <label>
      Columns:
      <input type="number" bind:value={columns} min="1" />
    </label>
    <label>
      Rows:
      <input type="number" bind:value={rows} min="1" />
    </label>
    <label>
      Bombs:
      <input
        type="number"
        bind:value={bombs}
        min="1"
        max={(rows * columns) / 2}
      />
    </label>

    <button on:click|preventDefault={() => (gameStarted = true)} class="test"
      >Start Game</button
    >
  </form>
{:else}
  <button on:click={() => (gameStarted = false)}>New Game</button>
  <Gameboard
    {columns}
    {rows}
    bombCoordinates={generateBombCoordinates(bombs)}
  />
{/if}

<!-- Style -->
<style lang="scss">
</style>
