<script lang="ts">
  import type { PageData } from "./$types";
  import "../styles/app.css";
  import Help from "$lib/components/Help.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import { onMount } from "svelte";

  export let data: PageData;
  $: isHelpOpen = false;

  onMount(async () => {
    localStorage.getItem("theme") === "dark" &&
      document.documentElement.setAttribute("data-theme", "dark");
  });
</script>

<div id="app">
  <main>
    <Navbar bind:data bind:isContainerOpen={isHelpOpen} />

    <!-- <Help bind:isOpen={isHelpOpen} /> -->

    <slot />
  </main>
</div>
