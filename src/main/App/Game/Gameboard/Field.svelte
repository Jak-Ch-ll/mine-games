<script lang="ts">
  import { gamestate } from "../../gamestate"

  export let isBomb = false
  export let neighborBombs = 0
  export let button: HTMLButtonElement | null = null

  let status: "neutral" | "flagged" | "maybe" | "safe" | "bomb" = "neutral"
  $: disabled =
    status === "safe" ||
    status === "bomb" ||
    $gamestate.status === "Lost" ||
    $gamestate.status === "Won"
  $: textContent = disabled && neighborBombs ? neighborBombs : null

  function handleLeftClick() {
    if (status === "neutral") {
      if (isBomb) {
        status = "bomb"
        $gamestate.status = "Lost"
      } else {
        status = "safe"
        $gamestate.safeFields--
        if ($gamestate.safeFields === 0) {
          $gamestate.status = "Won"
        }
      }
    }
  }

  function handleRightClick() {
    switch (status) {
      case "neutral":
        status = "flagged"
        $gamestate.bombCounter--
        break
      case "flagged":
        status = "maybe"
        $gamestate.bombCounter++
        break
      case "maybe":
        status = "neutral"
    }
  }
</script>

<!-- HTML -->
<button
  {disabled}
  aria-label="field"
  class={status}
  on:click
  on:click={handleLeftClick}
  on:contextmenu|preventDefault={handleRightClick}
  bind:this={button}
>
  {#if status === "bomb" || (isBomb && $gamestate.status === "Lost")}
    💣
  {:else if textContent && !isBomb}
    {textContent}
  {:else if status === "flagged"}
    🚩
  {:else if status === "maybe"}
    ❓
  {/if}
</button>

<!-- Style -->
<style lang="scss">
  button {
    $size: 2rem;

    height: $size;
    width: $size;
    vertical-align: middle;

    color: black;
  }

  .flagged {
    background-color: yellow;
  }

  .bomb {
    background-color: rgb(204, 114, 114);
  }
</style>
