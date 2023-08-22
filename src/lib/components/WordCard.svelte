<script lang="ts">
  import CoverContainer from "./CoverContainer.svelte";

  interface Secret {
    word: string;
    description: string;
    supplementalImageLink: string;
  }

  export let isOpen: boolean;
  export let secret: Secret;
</script>

<CoverContainer bind:isOpen title={secret?.word}>
  <svelte:fragment slot="word-definition">
    <div>
      {secret?.description}
    </div>
    <img
      class="supplemental-image"
      src={secret?.supplementalImageLink}
      alt="Supplemental Image for {secret?.word}"
    />
  </svelte:fragment>
</CoverContainer>

<style lang="scss">
  .supplemental-image {
    margin-block-start: 1rem;
    max-width: 80%;
    object-fit: cotain;
  }
</style>
