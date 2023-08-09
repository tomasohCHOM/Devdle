<script lang="ts">
  import "../../styles/form.scss";
</script>

<svelte:head>
  <title>Sign Up | Devdle</title>
</svelte:head>

<h2>Sign Up to Devdle</h2>

<form action="?/register" method="POST">
  <div class="container">
    <label for="email"><b>Enter your Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required />

    <label for="password"><b>Create Password</b></label>
    <input
      type="password"
      placeholder="Enter Password"
      name="password"
      required
    />

    <label for="confirm-password"><b>Confirm Password</b></label>
    <input
      type="password"
      placeholder="Confirm Password"
      name="confirm-password"
      required
    />

    <button type="submit">Sign Up</button>
    <div class="new-user">
      Already Have an Account? <a href="/login">Login</a>
    </div>
  </div>
</form>
