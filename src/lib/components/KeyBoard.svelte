<script lang="ts">
  export let currentGuess: string;
  export let guesses: string[];
  export let answer: string;
  export let handleSubmit: () => void;

  const getKeyColor = (letter: string) => {
    for (const guess of guesses) {
      if (guess.includes(letter)) {
        console.log(guess);
        for (let i = 0; i < guess.length; i++) {
          if (guess[i] === letter && guess[i] === answer[i]) {
            return "correct";
          }
        }
      }
    }
  };

  const keys = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];
  const clickKey = (key: string) => {
    if (key == "<") {
      currentGuess = currentGuess.slice(0, -1);
      return;
    } else if (key == ">") {
      handleSubmit();
      return;
    }
    if (currentGuess.length === 5) return;
    currentGuess = currentGuess + key.toLowerCase();
  };
</script>

<main>
  <br />
  {#each keys as key}
    <div class="row">
      {#each key as letter}
        <button
          class="keyboard-key {getKeyColor(letter)} .disable-double-tap-zoom"
          on:click={() => {
            clickKey(letter);
          }}
          >{#if letter === "<"}
            DEL
          {:else if letter === ">"}
            ENTER
          {:else}
            {letter.toUpperCase()}
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</main>

<style>
  main {
    padding-block-end: 2rem;
  }

  .keyboard-key {
    background-color: var(--color-secondary);
    color: var(--color-contrast);
    margin: 0.125rem;
  }

  .correct {
    --background-color: var(--color-correct);
    --color: var(--color-true-white);
  }

  .present {
    --background-color: var(--color-present);
    --color: var(--color-true-white);
  }

  .absent {
    --background-color: var(--color-absent);
    --color: var(--color-true-white);
  }

  @media screen and (max-width: 36em) {
    .keyboard-key {
      padding: 0.2em 0.4em;
      font-size: 1rem;
    }
  }
</style>
