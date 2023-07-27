<script lang="ts">
  import CoverContainer from "./CoverContainer.svelte";
  export let isOpen: boolean;

  let examples: string[] = ["clone", "grasp", "trees"];
  let exampleIndex: number = 0;
</script>

<CoverContainer bind:isOpen title="How to Play">
  <h2 class="sub-header" slot="sub-header">
    <strong>Guess the Devdle in 6 tries.</strong>
  </h2>
  <ul class="rules-list">
    <li>Each guess must be a valid 5-letter word.</li>
    <li>
      The color of the tiles will change to show how close your guess was to the
      word.
    </li>
  </ul>
  <h2 class="sub-header examples"><strong>Examples</strong></h2>
  <div class="wordle-row">
    {#each examples[exampleIndex++] as letter, i}
      <div class="wordle-tiles {i === 0 ? 'correct' : ''}">
        {letter.toUpperCase()}
      </div>
    {/each}
  </div>
  <p>C is in the word and in the correct spot.</p>
  <div class="wordle-row">
    {#each examples[exampleIndex++] as letter, i}
      <div class="wordle-tiles {i === 1 ? 'present' : ''}">
        {letter.toUpperCase()}
      </div>
    {/each}
  </div>
  <p>R is in the word but in the wrong spot.</p>
  <div class="wordle-row">
    {#each examples[exampleIndex] as letter, i}
      <div class="wordle-tiles {i === 2 ? 'absent' : ''}">
        {letter.toUpperCase()}
      </div>
    {/each}
  </div>
  <p>E is not in the word in any spot.</p>
</CoverContainer>

<style lang="scss">
  .sub-header {
    margin: 0;
  }

  .rules-list {
    margin: 0.5rem 0;
    text-align: start;
  }

  .wordle-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    margin-block-end: 0.25rem;
  }

  .wordle-tiles {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    aspect-ratio: 1;
    border: 2px solid var(--border-active);
    font-size: 1.5rem;
    font-weight: bold;

    /* To prevent the user from selecting the letters in the cells */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &.correct {
      overflow: auto;
      background-color: var(--color-correct);
      color: var(--color-true-white);
      border: none;
    }

    &.present {
      background-color: var(--color-present);
      color: var(--color-true-white);
      border: none;
    }

    &.absent {
      background-color: var(--color-absent);
      color: var(--color-true-white);
      border: none;
    }
  }
</style>
