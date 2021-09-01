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
	}

	function loadMore(event) {
		offset += numberOfPokemon;
	}
</script>

<svelte:head>
	<title>Svelte Pokedex</title>
</svelte:head>

<div id="container">
	<div class="inner-container p-4 rounded-lg bg-white w-max my-12 mx-auto">
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

<style>
	:global(body) {
		min-height: 100vh;
		background: linear-gradient(to bottom, #e4ddfd 0%, #e4ddfd 50%, #c8e0ff 100%);
		background-repeat: no-repeat;
	}
</style>
