<script>
	import { page } from '$app/stores';
	import ky from 'ky';
	const id = $page.params.id;

	let pokemon;

	async function getPokemonData(id) {
		let baseApi = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const pokemonGeneral = await ky.get(baseApi).json();

		const { name, types, sprites, stats, abilities, height, weight } = pokemonGeneral;

		const pokemonTypes = types.map((type) => {
			return {
				name: type.type.name
			}
		})

		const returnStats = stats.map((stat) => {
			return {
				name: stat.stat.name,
				base_stat: stat.base_stat
			};
		});

		pokemon = {
			name,
			types: pokemonTypes,
			stats: returnStats
		};
	}

	$: getPokemonData(id);
</script>

<style lang="scss">
	/* your styles go here */
</style>

{#if pokemon}
	{#each pokemon.types as type (type.name)}
		 <p>{type.name}</p>
	{/each}
	 {#each pokemon.stats as stat}
		  <p>{stat.name} - {stat.base_stat}</p>
	 {/each}
{/if}