<script lang="ts">
  import "../../styles/app.css";
  import "../../styles/form.scss";
  import { enhance } from "$app/forms";
  import type { Provider } from "@supabase/supabase-js";
  import type { SubmitFunction, PageData } from "./$types";

  export let data: PageData;
  $: ({ supabase } = data);

  let popOver: HTMLDivElement;

  const signInWithProvider = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
  };

  const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
    switch (action.searchParams.get("provider")) {
      case "google":
        await signInWithProvider("google");
        break;
      case "github":
        await signInWithProvider("github");
        break;
      case "discord":
        await signInWithProvider("discord");
        break;
      default:
        break;
    }
    cancel();
  };

  const disabledLoginMessage = () => {
    setTimeout(() => {
      popOver.textContent = "Sorry, User login is currently disabled.";
      popOver.style.visibility = "visible";
      popOver.style.opacity = "1";

      setTimeout(() => {
        popOver.style.opacity = "0";
        setTimeout(() => {
          popOver.style.visibility = "hidden";
        }, 250);
      }, 2000);
    });
  };
</script>

<svelte:head>
  <title>Login | Devdle</title>
</svelte:head>

<h2>Login to Devdle</h2>

<!-- Authentication is currently paused due to little traffic -->
<!-- Replace the formactions with a popup that login is disabled -->

<!-- Originally, it would look like this -->
<!-- <button formaction="?/login&provider={provider}"> -->
<!--  where provider could be "google", "github", or "discord" -->

<form class="socials" method="post" use:enhance={submitSocialLogin}>
  <div class="container">
    <button on:click={disabledLoginMessage}>
      <img class="icon-images" src="/icons/google.png" alt="Google Logo" />
      <span>Sign in with Google</span>
    </button>
    <button on:click={disabledLoginMessage}>
      <img
        class="icon-images filter-on"
        src="/icons/github.png"
        alt="Github Logo"
      />
      <span>Sign in with Github</span>
    </button>
    <button on:click={disabledLoginMessage}>
      <img class="icon-images" src="/icons/discord.png" alt="Discord Logo" />
      <span>Sign in with Discord</span>
    </button>
  </div>
</form>

<div bind:this={popOver} class="disabled-login-pop-over" />

<style lang="scss">
  .disabled-login-pop-over {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 15%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    transition: opacity 0.125s ease-in-out;
    background-color: var(--color-warning);
    color: var(--color-true-white);
    padding: 1rem 1rem;
    border-radius: 0.25rem;
  }
  .socials {
    display: flex;
    align-items: center;
    justify-content: center;

    & .container {
      & button {
        background-color: var(--color-primary);
        color: var(--color-contrast);
        border: 2px solid var(--border-active);
        // transition: all 0.25s ease-out;
        & img,
        & span {
          margin: 0 0.125rem;
          vertical-align: middle;
        }
      }
    }
  }
</style>
