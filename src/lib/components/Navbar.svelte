<script lang="ts">
  // import githubLogo from "/icons/github-logo.png";
  // import leaderboard from "/icons/leaderboard.png";
  // import darkTheme from "/icons/dark-theme.png";
  // import help from "/icons/help.png";

  export let isContainerOpen: boolean;

  const toggleContainer = (): void => {
    isContainerOpen = !isContainerOpen;
    console.log(isContainerOpen);
  };

  const toggleTheme = (): void => {
    const element: HTMLElement = document.documentElement;
    if (element.getAttribute("data-theme") === "dark") {
      element.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      element.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };
</script>

<header class="navbar">
  <section class="navbar-section">
    <a href="https://github.com/tomasohCHOM/Devdle">
      <img
        src="/icons/github-logo.png"
        alt="Githbub Repo Link"
        class="icon-images"
      />
    </a>
  </section>
  <section class="navbar-section title-section">
    <h1 class="lg-header">DEVDLE</h1>
  </section>
  <section class="navbar-section">
    <div
      on:click={toggleContainer}
      on:keydown={toggleContainer}
      role="button"
      aria-pressed="false"
      tabindex="0"
    >
      <img src="/icons/help.png" alt="Help" class="icon-images" />
    </div>
    <div>
      <img src="/icons/leaderboard.png" alt="Leaderboard" class="icon-images" />
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
        class="icon-images"
      />
    </div>
    <button class="sign-in">Sign In</button>
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

        & h1 {
          display: inline-block;
        }
      }

      & button {
        background-color: var(--color-primary);
        color: var(--color-contrast);
        border: 2px solid var(--border-active);
        border-radius: 2rem;
        transition: all 0.125s ease-in;

        &:hover {
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
        flex: 0.5;
        flex: 0;
      }

      & :last-child {
        flex: 2;
        flex-grow: 1;
        gap: 0.5rem;

        & button {
          max-width: fit-content;
          display: inline-flex;
          align-self: start;
        }
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
      & :last-child {
        & button {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          border-radius: 0.75rem;
        }
      }
    }

    .lg-header {
      font-size: 2.2em;
    }
  }
</style>
