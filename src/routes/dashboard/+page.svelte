<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  const blurredEmail = data.session?.user.email ?? "";

  // Method to blur the email address
  const blurEmailAddress = (email: string) => {
    const separation = email.indexOf("@");
    // start bluring from the third character if length of email name is > 3
    let startIndex = separation > 2 ? 2 : 1;
    return (
      email.slice(0, startIndex) +
      email.slice(startIndex, separation).replace(/./g, "*") +
      email.slice(separation)
    );
  };
</script>

<h2>Logged in as: <span>{blurEmailAddress(blurredEmail)}</span></h2>
<form action="/logout" method="post">
  <button type="submit">Log Out</button>
</form>

<style lang="scss">
  button {
    color: var(--color-contrast);
  }
</style>
