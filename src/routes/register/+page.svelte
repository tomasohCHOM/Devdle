<script lang="ts">
  import "../../styles/form.scss";
</script>

<svelte:head>
  <title>Sign Up | Devdle</title>
</svelte:head>

<h2>Sign Up to Devdle</h2>

<form action="" method="POST">
  <div class="container">
    <label for="uname"><b>Create Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required />

    <label for="psw"><b>Create Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required />

    <label for="confirm-psw"><b>Confirm Password</b></label>
    <input
      type="password"
      placeholder="Confirm Password"
      name="confirm-psw"
      required
    />

    <button type="submit">Sign Up</button>
    <div class="new-user">
      Already Have an Account? <a href="/login">Login</a>
    </div>
  </div>
</form>
