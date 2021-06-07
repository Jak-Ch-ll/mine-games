<script lang="ts">
  import type { Coord } from "./Game/Gameboard.d"

  import Gameboard from "./Game/Gameboard.svelte"

  let gameStarted = false
  let width = 10
  let height = 10
  let bombs = 10

  function generateBombCoordinates(numOfBombs: number) {
    const coordinates = new Set<Coord>()

    while (coordinates.size < numOfBombs) {
      const row = Math.floor(Math.random() * height)
      const col = Math.floor(Math.random() * width)

      coordinates.add(`${row}/${col}`)
    }

    return coordinates
  }
</script>

<!-- HTML -->
<form>
  <label>
    Width:
    <input type="number" bind:value={width} />
  </label>
  <label>
    Height:
    <input type="number" bind:value={height} />
  </label>
  <label>
    Bombs:
    <input type="number" bind:value={bombs} />
  </label>

  <button on:click|preventDefault={() => (gameStarted = true)} class="test"
    >Start Game</button
  >
</form>

{#if gameStarted}
  <Gameboard
    {width}
    {height}
    bombCoordinates={generateBombCoordinates(bombs)}
  />
{/if}

<!-- Style -->
<style lang="scss">
</style>
