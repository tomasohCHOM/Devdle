<script lang="ts">
  import "../styles/app.css";
  import { browser } from "$app/environment";
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types";
  import { ANSWERS } from "$lib/constants/answersList";
  import { WIN_MESSAGES } from "$lib/constants/strings";
  import {
    WORD_REVEAL_ANIMATION_DELAY,
    MESSAGE_DURATION,
    MESSAGE_FADING_TRANSITION,
  } from "$lib/constants/values";
  import VALID_GUESSES from "$lib/constants/validGuesses.json";
  import setCharAt from "$lib/constants/utils";
  import Board from "$lib/components/Board.svelte";
  import KeyBoard from "$lib/components/KeyBoard.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Help from "$lib/components/Help.svelte";
  import WordCard from "$lib/components/WordCard.svelte";

  const validGuesses = new Set<string>(VALID_GUESSES);

  interface Secret {
    word: string;
    description: string;
    supplementalImageLink: string;
  }

  export let data: PageData;
  let secret: Secret;
  let guesses: string[] = [];
  let colorsFromGuesses: string[] = [];
  let currentGuess: string = "";
  let numAttempts: number = 0;
  let isGameOver: boolean = false;
  let isError: boolean = false;
  let gameOverMessage: string = "";

  $: isWordCardOpen = false;
  let popOver: HTMLDivElement;

  onMount(async () => {
    window.addEventListener("keydown", handleKeyType);
    secret = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  });

  onDestroy(async () => {
    if (browser) window.removeEventListener("keydown", handleKeyType);
  });

  const getColorsFromGuess = (
    guessedWords: string[],
    attempts: number
  ): void => {
    // Represented by letters (G, Y, B) - G = Correct, Y = Present, B = Absent.
    let result = "BBBBB";
    let answer = secret.word;
    let guess = guessedWords[attempts];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === answer[i]) {
        // Calling our utility function to replace characters at specified indices.
        result = setCharAt(result, i, "G");
        answer = setCharAt(answer, i, "$");
      }
    }
    for (let i = 0; i < guess.length; i++) {
      if (answer.includes(guess[i])) {
        let correctIndex: number = answer.indexOf(guess[i]);
        if (result[i] != "G") {
          result = setCharAt(result, i, "Y");
          answer = setCharAt(answer, correctIndex, "$");
        }
      }
    }
    colorsFromGuesses = [...colorsFromGuesses, result];
  };

  const triggerPopOver = (
    message: string,
    popOverDelay: number | undefined = undefined
  ): void => {
    setTimeout(() => {
      popOver.textContent = message;
      popOver.style.visibility = "visible";
      popOver.style.opacity = "1";

      setTimeout(() => {
        popOver.style.opacity = "0";
        setTimeout(() => {
          popOver.style.visibility = "hidden";
        }, MESSAGE_FADING_TRANSITION);
      }, MESSAGE_DURATION);
    }, popOverDelay);
  };

  const setContainerOpen = (delay: number | undefined = undefined) => {
    setTimeout(() => {
      isWordCardOpen = true;
    }, delay);
  };

  const handleSubmit = (): void => {
    if (currentGuess.length !== 5) {
      isError = true;
      setTimeout(() => (isError = false), 250);
      triggerPopOver("Not enough letters");
      return;
    }
    if (!validGuesses.has(currentGuess)) {
      isError = true;
      setTimeout(() => (isError = false), 250);
      triggerPopOver("Not a valid word");
      return;
    }
    guesses = [...guesses, currentGuess];
    getColorsFromGuess(guesses, numAttempts);

    if (currentGuess === secret.word || guesses.length === 6) {
      if (browser) window.removeEventListener("keydown", handleKeyType);
      setTimeout(() => {
        isGameOver = true;
      }, WORD_REVEAL_ANIMATION_DELAY + MESSAGE_DURATION);
      if (currentGuess === secret.word) {
        gameOverMessage = WIN_MESSAGES[numAttempts];
      } else {
        gameOverMessage = secret.word;
      }
      triggerPopOver(gameOverMessage, WORD_REVEAL_ANIMATION_DELAY);
      setContainerOpen(WORD_REVEAL_ANIMATION_DELAY + MESSAGE_DURATION);
      currentGuess = "";
    } else {
      currentGuess = "";
      if (browser) window.removeEventListener("keydown", handleKeyType);
      setTimeout(() => {
        if (browser) window.addEventListener("keydown", handleKeyType);
      }, WORD_REVEAL_ANIMATION_DELAY);
      numAttempts++;
    }
  };

  const handleKeyType = (event: KeyboardEvent) => {
    if (isGameOver) return;
    if (event.key === "Backspace") currentGuess = currentGuess.slice(0, -1);
    else if (event.key === "Enter") handleSubmit();
    if (currentGuess.length === 5) return;
    if (event.key >= "a" && event.key <= "z") currentGuess += event.key;
  };

  const resetGame = () => {
    guesses = [];
    colorsFromGuesses = [];
    currentGuess = "";
    numAttempts = 0;
    isGameOver = false;
    isError = false;
    gameOverMessage = "";
    if (browser) window.addEventListener("keydown", handleKeyType);
    secret = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  };
</script>

<svelte:head>
  <title>Devdle</title>
</svelte:head>

<main>
  <WordCard bind:secret bind:isOpen={isWordCardOpen} />

  <div bind:this={popOver} class="pop-over" />

  <Board
    bind:guesses
    bind:colorsFromGuesses
    bind:currentGuess
    bind:numAttempts
    bind:isError
  />

  {#if data.session}
    {#if isGameOver}
      <button class="reset-button" on:click={resetGame}>
        Generate New Word
      </button>
    {/if}
  {/if}

  <KeyBoard
    bind:currentGuess
    bind:guesses
    answer={secret?.word}
    {handleSubmit}
  />
</main>

<style>
  .pop-over {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 15%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    transition: opacity 0.125s ease-in-out;
    background-color: var(--color-contrast);
    color: var(--color-primary);
    padding: 0.5rem 0.5rem;
    border-radius: 0.25rem;
  }

  .reset-button {
    margin-block: 0.5rem;
    color: var(--color-contrast);
    /* border: 2px solid var(--border-empty); */
  }
</style>
