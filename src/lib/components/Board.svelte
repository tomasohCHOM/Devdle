<script lang="ts">
  import { WORD_REVEAL_ANIMATION_DELAY } from "$lib/constants/values";

  export let guesses: string[];
  export let colorsFromGuesses: string[];
  export let currentGuess: string;
  export let numAttempts: number;
  export let isError: boolean;

  const NUM_ROWS = { length: 6 };
  const NUM_CELLS = { length: 5 };

  const convertColorsToCSSColorClasses = (i: number, j: number): string => {
    switch (colorsFromGuesses[i][j]) {
      case "G":
        return "correct";
      case "Y":
        return "present";
      case "B":
        return "absent";
      default:
        break;
    }
    return "";
  };
</script>

<main>
  <section class="board">
    {#each NUM_ROWS as _, i}
      <div class="board-row">
        {#each NUM_CELLS as _, j}
          <div
            class="board-cell {guesses[i] !== undefined
              ? convertColorsToCSSColorClasses(i, j)
              : ''} {i === guesses.length && currentGuess[j] !== undefined
              ? 'border-active'
              : ''} {i === guesses.length && isError === true ? 'shake' : ''}"
            style="--order: {j}; --win-delay: {WORD_REVEAL_ANIMATION_DELAY}"
          >
            {#if i === numAttempts && currentGuess.length - 1 >= j}
              {currentGuess[j].toUpperCase()}
            {:else}
              {guesses[i]?.[j].toUpperCase() ?? ""}
            {/if}
          </div>
        {/each}
      </div>
    {/each}
  </section>
</main>

<style lang="scss">
  .board-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    margin-block-end: 0.25rem;
  }
  .board-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    aspect-ratio: 1;
    border: 2px solid var(--border-empty);
    font-size: 1.5rem;
    font-weight: bold;

    /* To prevent the user from selecting the letters in the cells */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &.border-active {
      border: 2px solid var(--border-active);
      animation: cellPopUp 0.1s ease-in-out;
      animation-iteration-count: 1;
    }
    &.correct,
    &.present,
    &.absent {
      animation: flipCells 500ms ease forwards;
      animation-delay: calc(var(--order) * 200ms);
    }

    &.correct {
      --background-color: var(--color-correct);
      --color: var(--color-true-white);
      border: 2px solid var(--border-active);
    }

    &.present {
      --background-color: var(--color-present);
      --color: var(--color-true-white);
      border: 2px solid var(--border-active);
    }

    &.absent {
      --background-color: var(--color-absent);
      --color: var(--color-true-white);
      border: 2px solid var(--border-active);
    }

    &.shake {
      animation: shakeCells 200ms;
    }

    &.win {
      animation: winAnimation 300ms;
      animation-delay: calc(var(--win-delay) * 1ms + var(--order) * 100ms);
    }
  }
  @keyframes cellPopUp {
    0% {
      transform: scale(0.95);
      border-color: var(--border-pop);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
      border-color: var(--border-active);
    }
  }
  @keyframes flipCells {
    0% {
      transform: rotateX(0);
      background-color: var(--color-primary);
      border: 2px solid var(--border-active);
      color: var(--color-contrast);
    }
    45% {
      transform: rotateX(90deg);
      background-color: var(--color-primary);
      border: 2px solid var(--border-active);
      color: var(--color-contrast);
    }
    55% {
      transform: rotateX(90deg);
      background-color: var(--background-color);
      color: var(--color);
      border: none;
    }
    100% {
      transform: rotateX(0deg);
      background-color: var(--background-color);
      color: var(--color);
      border: none;
    }
  }
  @keyframes shakeCells {
    10%,
    90% {
      transform: translate(-1px, 0);
    }

    20%,
    80% {
      transform: translate(2px, 0);
    }

    30%,
    50%,
    70% {
      transform: translate(-4px, 0);
    }

    40%,
    60% {
      transform: translate(4px, 0);
    }
  }

  @keyframes winAnimation {
    0% {
      transform: translate(0, 0);
    }

    25% {
      transform: translate(0, 0.5rem);
    }

    50% {
      transform: translate(0, -0.125rem);
    }

    75% {
      transform: translate(0, 0.25rem);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @media screen and (max-width: 36em) {
    .board-cell {
      width: 3rem;
    }
  }
</style>
