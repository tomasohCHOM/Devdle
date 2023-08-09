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

<form action="?/login" method="post">
  <div class="container">
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required />

    <label for="password"><b>Password</b></label>
    <input
      type="password"
      placeholder="Enter Password"
      name="password"
      required
    />

    <button type="submit">Login</button>
    <div class="new-user">
      Don't Have an Account? <a href="/register">Sign Up Here</a>
    </div>

    <form class="socials" method="post" use:enhance={submitSocialLogin}>
      <button formaction="?/login&provider=google">Google</button>
      <button formaction="?/login&provider=github">Github</button>
      <button formaction="?/login&provider=discord">Discord</button>
    </form>
  </div>
</form>

<style lang="scss">
  .socials {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & button {
      margin-inline: 0.5rem;
      background-color: var(--color-primary);
      color: var(--color-true-white);
      border: 2px solid var(--border-active);
    }
  }
</style>
