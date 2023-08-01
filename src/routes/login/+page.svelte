<script lang="ts">
  import "../../styles/form.scss";
</script>

<svelte:head>
  <title>Login | Devdle</title>
</svelte:head>

<h2>Login to Devdle</h2>

<form action="" method="POST">
  <div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required />

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required />

    <button type="submit">Login</button>
    <div class="new-user">
      Don't Have an Account? <a href="/register">Sign Up Here</a>
    </div>
  </div>
</form>
