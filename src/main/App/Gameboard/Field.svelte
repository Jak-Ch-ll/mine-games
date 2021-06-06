<script lang="ts">
  export let isBomb = false
  export let neighborBombs = 0
  export let button: HTMLButtonElement | null = null
  let disabled = false
  let flagged = false
  let bomb = false
</script>

<!-- HTML -->
<button
  {disabled}
  aria-label="field"
  class="field"
  class:flagged
  class:bomb
  on:click={() => {
    disabled = true
    if (isBomb) bomb = true
  }}
  on:contextmenu|preventDefault={() => (flagged = true)}
  bind:this={button}
  on:click
>
  {neighborBombs}
</button>

<!-- Style -->
<style lang="scss">
  .field {
    $size: 2rem;

    height: $size;
    width: $size;
    color: transparent;

    &:disabled {
      color: black;
    }
  }

  .flagged {
    background-color: yellow;
  }

  .bomb {
    background-color: red;
  }
</style>
