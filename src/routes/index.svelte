<script>
	import ky from 'ky';
	import { pokemonStorage } from './storage';
	import PokemonCard from '../components/PokemonCard.svelte';

	const numberOfPokemon = 20;
	let offset = 0;
	let allPokemonInfo;
	let pokemons = [];

	$: {
		loadPokemon(offset);
	}

	pokemonStorage.subscribe((value) => {
		allPokemonInfo = value;
	});

	async function loadPokemon() {
		let baseApi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${numberOfPokemon}`;
		const data = await ky.get(baseApi).json();
		pokemons = data.results;

		for (const pokemon of pokemons) {
			const pokemonFetchRequest = await ky.get(pokemon.url).json();
			pokemonStorage.update((value) => [...value, pokemonFetchRequest]);
		}
		pokemonStorage.update(() => [...allPokemonInfo]);
		console.log(allPokemonInfo)
	}

	function loadMore(event) {
		offset += numberOfPokemon;
	}
</script>

<svelte:head>
	<title>Svelte Pokedex</title>
</svelte:head>

<div id="container">
	<div class="inner-container">
		<div class="grid grid-cols-5 gap-8">
			{#each allPokemonInfo as pokemon}
				<PokemonCard
					name={pokemon.name}
					img={pokemon['sprites']['other']['official-artwork']['front_default']}
					types={pokemon.types}
					id={pokemon.id}
				/>
			{/each}
		</div>

		{#if allPokemonInfo.length > 0}
			<button
				on:click={loadMore}
				class="bg-red-500 px-6 py-3 mt-4 mx-auto rounded-lg appearance-none font-mono font-bold text-white cursor-pointer block"
				>Load More</button
			>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../styles/_settings';

	:global {
		body {
			min-height: 100vh;
			background: linear-gradient(to bottom, $light-purple 0%, $light-purple 50%, $light-blue 100%);
			background-repeat: no-repeat;
		}
	}
	.inner-container {
		background: $white;
		max-width: 65rem;
		width: 95%;
		margin: 3rem auto;
		border-radius: 8px;
		padding: 1rem;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// flex-direction: column;
	}
</style>
