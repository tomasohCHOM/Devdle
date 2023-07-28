<script lang="ts">
  export let name: string;
  export let ranking: number;
  export let playerStats: number;
</script>

<div class="player-card">
  <div class="left-section">
    <span>#{ranking}</span>
    <span>{name}</span>
  </div>
  <div>{playerStats}/6</div>
</div>

<style lang="scss">
  .player-card {
    width: min(80vw, 40rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin-block-end: 1rem;
    border-radius: 1rem;
    border: 2px solid var(--border-active);

    & .left-section > span {
      padding-inline-end: 0.75rem;
    }
  }
</style>
