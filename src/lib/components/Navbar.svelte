<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "../../routes/$types";

  export let data: PageData;
  export let isContainerOpen: boolean;

  let currentTheme: string;

  onMount(() => {
    const savedTheme = document.documentElement.getAttribute("data-theme");
    if (savedTheme) {
      currentTheme = savedTheme;
      return;
    }
    const preferenceIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = preferenceIsDark ? "dark" : "light";
    setTheme(theme);
  });

  const toggleTheme = (): void => {
    const theme = currentTheme === "light" ? "dark" : "light";
    setTheme(theme);
  };

  const setTheme = (theme: string): void => {
    const period = 60 * 60 * 24 * 365;
    document.cookie = `theme=${theme}; max-age=${period}; path=/`;
    document.documentElement.setAttribute("data-theme", theme);
    currentTheme = theme;
  };

  const toggleContainer = (): void => {
    isContainerOpen = !isContainerOpen;
  };
</script>

<header class="navbar">
  <section class="navbar-section">
    <a href="https://github.com/tomasohCHOM/Devdle">
      <img
        src="/icons/github.png"
        alt="Githbub Repo Link"
        class="icon-images filter-on"
      />
    </a>
  </section>
  <section class="navbar-section title-section">
    <a href="/">
      <h1 class="lg-header">DEVDLE</h1>
    </a>
  </section>
  <section class="navbar-section">
    <div
      on:click={toggleContainer}
      on:keydown={toggleContainer}
      role="button"
      aria-pressed="false"
      tabindex="0"
    >
      <img src="/icons/help.png" alt="Help" class="icon-images filter-on" />
    </div>
    <div>
      <a href="/leaderboard">
        <img
          src="/icons/leaderboard.png"
          alt="Leaderboard"
          class="icon-images filter-on"
        />
      </a>
    </div>
    <div
      on:click={toggleTheme}
      on:keydown={toggleTheme}
      role="button"
      aria-pressed="false"
      tabindex="0"
    >
      <img
        src="icons/dark-theme.png"
        alt="Dark Theme Toggle"
        class="icon-images filter-on"
      />
    </div>
    <div>
      {#if data.session}
        <a href="/dashboard">
          <img
            class="icon-images filter-on"
            src="/icons/profile.png"
            alt="Account Profile"
          />
        </a>
      {:else}
        <a href="/login">
          <button>Log In</button>
        </a>
      {/if}
    </div>
  </section>
</header>

<style lang="scss">
  .navbar {
    display: flex;
    max-height: 4rem;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    gap: 1rem;
    border-bottom: 2px solid var(--border-active);
    padding: 0rem 1.25rem;
    margin-block-end: 2rem;
    .navbar-section {
      flex: 1;
      &.title-section {
        justify-content: center;

        & a {
          text-decoration: none;
          color: var(--color-contrast);
          display: inline-block;
        }
      }

      & a {
        text-decoration: none;
      }

      & button {
        background-color: var(--color-primary);
        color: var(--color-contrast);
        border: 2px solid var(--border-active);
        border-radius: 2rem;
        transition: all 0.125s ease-in;

        &:not(.profile):hover {
          background-color: var(--color-contrast);
          color: var(--color-primary);
        }
      }
    }
    & :first-child {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    & :last-child {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
    }
  }
  .lg-header {
    font-size: 3.2em;
    line-height: 1.1;
    font-family: var(--ff-custom);
    letter-spacing: -0.125rem;
  }
  @media screen and (max-width: 50em) {
    .navbar {
      padding: 0 0.5rem;

      & :first-child {
        flex: 0;
      }

      & :last-child {
        flex-basis: max-content;
        flex-grow: 0;
        gap: 0.5rem;
      }
    }

    .navbar-section {
      &.title-section {
        flex: 1;
        justify-content: flex-start;
      }
    }
  }

  @media screen and (max-width: 30em) {
    .navbar {
      gap: 0.5rem;
      & :last-child {
        gap: 0.25rem;
        & button {
          font-size: 0.875rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.75rem;
        }
      }
    }

    .lg-header {
      font-size: 2.2em;
    }
  }
</style>
