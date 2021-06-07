<script lang="ts">
  export let isBomb = false
  export let neighborBombs = 0
  export let button: HTMLButtonElement | null = null

  let status: "neutral" | "flagged" | "maybe" | "safe" | "bomb" = "neutral"
  $: disabled = status === "safe" || status === "bomb"
  $: textContent = disabled && neighborBombs ? neighborBombs : null

  function handleLeftClick() {
    if (status === "neutral") {
      if (isBomb) status = "bomb"
      else status = "safe"
    }
  }

  function handleRightClick() {
    switch (status) {
      case "neutral":
        status = "flagged"
        break
      case "flagged":
        status = "maybe"
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
  {#if status === "bomb"}
    💣
  {:else if textContent}
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
