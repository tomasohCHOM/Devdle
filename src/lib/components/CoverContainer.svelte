<script lang="ts">
  // import closeWindow from "/icons/close-window.png";

  export let title: string = "Error: Failed to load secret word.";
  export let isOpen: boolean;

  const toggleContainer = () => {
    isOpen = !isOpen;
  };
</script>

<section class="cover-container {isOpen === true ? 'active' : ''}">
  <div class="top-section">
    <h2>{title}</h2>
    <button class="close-window-btn" on:click={toggleContainer}
      ><img
        class="icon-images filter-on"
        src="/icons/close-window.png"
        alt="Close Window"
      /></button
    >
  </div>
  <slot name="sub-header" />
  <slot name="word-definition" />
  <slot name="help" />
</section>

<div
  class="full-window-overlay {isOpen === true ? 'active' : ''}"
  on:click={toggleContainer}
  on:keydown={toggleContainer}
  role="button"
  aria-pressed="false"
  tabindex="0"
/>

<style lang="scss">
  .cover-container {
    position: fixed;
    left: 50%;
    top: 55%;
    width: min(30em, 85vw);
    z-index: 4;
    padding: 1.25rem;
    background-color: var(--cover-container-color);
    box-shadow: 0 3px 1rem rgba(16, 19, 21, 0.1);
    border-radius: 1rem;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%);
    transition: all 0.125s ease-in;

    & h2 {
      margin: 0;
      font-family: var(--ff-custom);
      font-size: 2rem;
      text-transform: uppercase;
      letter-spacing: -0.1rem;
    }

    &.active {
      top: 50%;
      opacity: 1;
      visibility: visible;
    }
  }

  .top-section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-window-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.6em 0.6em;
    background-color: var(--cover-container-color);

    &:hover {
      border: none;
    }
  }

  .full-window-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(213, 213, 213, 0.25);
    z-index: 3;
    transition: 0.25s;
    opacity: 0;
    visibility: hidden;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  @media only screen and (max-width: 22rem) {
    .top-section {
      justify-content: space-between;
    }
  }

  @media only screen and (max-width: 22rem) {
    .cover-container {
      padding: 0.75rem;
    }
  }

  @media only screen and (max-height: 37.5rem) {
    .cover-container {
      width: min(40rem, 95vw);
    }
  }
</style>
