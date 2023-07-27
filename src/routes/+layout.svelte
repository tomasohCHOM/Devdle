<script lang="ts">
  import Help from "$lib/components/Help.svelte";
  import Navbar from "$lib/components/Navbar.svelte";

  $: isHelpOpen = false;
</script>

<div id="app">
  <main>
    <Navbar bind:isContainerOpen={isHelpOpen} />

    <Help bind:isOpen={isHelpOpen} />

    <slot />
  </main>
</div>
