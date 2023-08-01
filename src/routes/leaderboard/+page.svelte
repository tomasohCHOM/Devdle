<script lang="ts">
  import PlayerCard from "$lib/components/PlayerCard.svelte";

  let dummyData = [
    { name: "John Doe", ranking: 2, stats: 4.5 },
    { name: "Kyle Mane", ranking: 1, stats: 3.7 },
    { name: "Tomas Oh", ranking: 4, stats: 5.1 },
    { name: "Louis", ranking: 6, stats: 5.3 },
    { name: "Johnathan", ranking: 5, stats: 5.6 },
    { name: "Maria Bonillas", ranking: 3, stats: 5 },
  ];

  dummyData.sort((player1, player2) =>
    player1.ranking > player2.ranking
      ? 1
      : player1.ranking < player2.ranking
      ? -1
      : 0
  );
</script>

<svelte:head>
  <title>Leaderboard | Devdle</title>
</svelte:head>

<section class="stats-wrapper">
  {#each dummyData as player}
    <PlayerCard
      name={player.name}
      ranking={player.ranking}
      playerStats={player.stats}
    />
  {/each}
</section>

<style lang="scss">
  .stats-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
