<script lang="ts">
  import "../../styles/form.scss";
  import { enhance } from "$app/forms";
  import type { Provider } from "@supabase/supabase-js";
  import type { SubmitFunction, PageData } from "./$types";

  export let data: PageData;
  $: ({ supabase } = data);

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
</script>

<svelte:head>
  <title>Login | Devdle</title>
</svelte:head>

<h2>Login to Devdle</h2>

<form class="socials" method="post" use:enhance={submitSocialLogin}>
  <div class="container">
    <button formaction="?/login&provider=google">
      <img class="icon-images" src="/icons/google.png" alt="Google Logo" />
      <span>Sign in with Google</span>
    </button>
    <button formaction="?/login&provider=github">
      <img
        class="icon-images filter-on"
        src="/icons/github.png"
        alt="Github Logo"
      />
      <span>Sign in with Github</span>
    </button>
    <button formaction="?/login&provider=discord">
      <img class="icon-images" src="/icons/discord.png" alt="Discord Logo" />
      <span>Sign in with Discord</span>
    </button>
  </div>
</form>

<style lang="scss">
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
