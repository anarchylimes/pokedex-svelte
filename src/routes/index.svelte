<script>
	import ky from 'ky';
	import { pokemonStorage } from './storage';
	import PokemonCard from '../components/PokemonCard.svelte';
	import Header from '../components/Header.svelte';

	const numberOfPokemon = 24;
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

<div class="container p-4 rounded-lg mx-auto">
		<div class="grid grid-cols-1 grid-cols-6 gap-6">
			<Header />
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
			<button on:click={loadMore} class="btn btn-primary mx-auto block mt-4">Load More</button>
		{/if}
</div>

<style>
	:global(body) {
		min-height: 100vh;
	}
</style>
