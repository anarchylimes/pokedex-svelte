<script>
	import { page } from '$app/stores';
	import ky from 'ky';
	const id = $page.params.id;

	let pokemon;

	export function toTitleCase(string, splitChar) {
  return string
    .toLowerCase()
    .split(splitChar)
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

	async function getPokemonData(id) {
		let baseApi = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const pokemonGeneral = await ky.get(baseApi).json();

		const { name, types, sprites, stats, abilities, height, weight } = pokemonGeneral;

		const formattedStats = stats.map((stat) => {
			return {
				name: toTitleCase(stat.stat.name, '-'),
				base_stat: stat.base_stat
			};
		});

		pokemon = {
			stats: formattedStats
		};
	}

	$: getPokemonData(id);
</script>

<style lang="scss">
	/* your styles go here */
</style>

{#if pokemon}
	 {#each pokemon.stats as stat}
		  <p>{stat.name} - {stat.base_stat}</p>
	 {/each}
{/if}