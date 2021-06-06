<script lang="ts">
  import Gameboard from "./App/Gameboard.svelte"
</script>

<!-- HTML -->
<main>
  <Gameboard width={10} height={10} bombCoordinates={new Set(["0/0"])} />
</main>

<!-- Style -->
<style lang="scss">
</style>
