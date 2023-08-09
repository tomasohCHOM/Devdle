<script lang="ts">
  import { enhance } from "$app/forms";
  import "../../styles/form.scss";
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

    <form class="socials" method="post">
      <button>Google</button>
      <button formaction="?/login&provider=github">Github</button>
      <button>Discord</button>
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
