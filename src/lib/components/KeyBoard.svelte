<script lang="ts">
  import { WORD_REVEAL_ANIMATION_DELAY } from "$lib/constants/values";

  export let currentGuess: string;
  export let guesses: string[];
  export let answer: string;
  export let handleSubmit: () => void;
  const keys = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];

  /**
   * Algorithm to get the corresponding color status of a single key in
   * the keyboard, prioritizing green over yellow, and yellow over gray.
   * @param letter
   */
  const processKeyColors = (letter: string) => {
    let result: string = "";
    for (const guess of guesses) {
      if (guess.includes(letter)) {
        if (answer.includes(letter)) {
          result = "present";
          for (let i = 0; i < guess.length; i++) {
            if (guess[i] === letter && guess[i] === answer[i]) {
              result = "correct";
              return result;
            }
          }
        } else {
          result = "absent";
        }
      }
    }
    return result;
  };

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
  {#key guesses}
    {#each keys as key}
      <div class="row">
        {#each key as letter}
          <button
            class="keyboard-key .disable-double-tap-zoom {processKeyColors(
              letter
            )}"
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
  {/key}
</main>

<style>
  main {
    padding-block-end: 1.5rem;
  }

  .keyboard-key {
    background-color: var(--color-secondary);
    color: var(--color-contrast);
    margin: 0.125rem;
  }

  .correct {
    --_corresponding-color: var(--color-correct);
    background-color: var(--color-correct);
    color: var(--color-true-white);
    /* animation-name: keyboardDelay;
    animation-delay: calc(var(--key-delay) * 1ms); */
  }

  .present {
    --_corresponding-color: var(--color-present);
    background-color: var(--color-present);
    color: var(--color-true-white);
    /* animation-name: keyboardDelay;
    animation-delay: calc(var(--key-delay) * 1ms); */
  }

  .absent {
    --_corresponding-color: var(--color-absent);
    background-color: var(--color-absent);
    color: var(--color-true-white);
    /* animation-name: keyboardDelay;
    animation-delay: calc(var(--key-delay) * 1ms); */
  }

  @keyframes keyboardDelay {
    0% {
    }
    100% {
      background-color: var(--_corresponding-color);
      color: var(--color-true-white);
    }
  }

  @media screen and (max-width: 36em) {
    .keyboard-key {
      padding: 0.5em 0.7em;
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 25em) {
    .keyboard-key {
      padding: 0.5em 0.5em;
    }
  }
  @media screen and (max-width: 20em) {
    .keyboard-key {
      padding: 0.5em 0.4em;
    }
  }
</style>
