<script lang="ts">
  import Help from "$lib/components/Help.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import { onMount } from "svelte";

  $: isHelpOpen = false;

  onMount(async () => {
    localStorage.getItem("theme") === "dark" &&
      document.documentElement.setAttribute("data-theme", "dark");
  });
</script>

<div id="app">
  <main>
    <Navbar bind:isContainerOpen={isHelpOpen} />

    <Help bind:isOpen={isHelpOpen} />

    <slot />
  </main>
</div>
