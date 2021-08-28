<script>
	import { onMount } from 'svelte';
	import { pokemonStorage } from './storage';
	import PokemonCard from '../components/PokemonCard.svelte';
	import 'carbon-components-svelte/css/g10.css';
	import { Button } from 'carbon-components-svelte';
	import Add16 from 'carbon-icons-svelte/lib/Add16';

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
		const data = await fetch(baseApi);
		const results = await data.json();
		pokemons = results.results;

		for (const pokemon of pokemons) {
			const pokemonFetchRequest = await fetch(pokemon.url);
			const singlePokemonInfo = await pokemonFetchRequest.json();
			pokemonStorage.update((value) => [...value, singlePokemonInfo]);
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
	<div id="grid">
		{#each allPokemonInfo as pokemon}
			<PokemonCard
				name={pokemon.name}
				img={pokemon['sprites']['other']['official-artwork']['front_default']}
				types={pokemon.types}
			/>
		{/each}
	</div>
	{#if allPokemonInfo.length > 0}
		<Button on:click={loadMore} icon={Add16} size="field">Load More</Button>
	{/if}
</div>

<style lang="scss">
	@import '../styles/_settings';

	:global {
		#app {
			background: linear-gradient(to bottom, $light-purple 0%, $light-purple 50%, $light-blue 100%);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}
	#container {
		background: $white;
		max-width: 70rem;
		margin: 3rem auto;
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	#grid {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 1.5rem;
	}
</style>
