<script>
	import PokemonCard from '../components/PokemonCard.svelte';

	import { onMount } from 'svelte';

	import { pokemonStorage } from './storage';

	const numberOfPokemon = 151;
	let allPokemonInfo;
	let pokemons = [];

	pokemonStorage.subscribe((value) => {
		allPokemonInfo = value;
	});

	onMount(async () => {
		let baseApi = `https://pokeapi.co/api/v2/pokemon/?limit=${numberOfPokemon}`;
		const data = await fetch(baseApi);
		const results = await data.json();
		pokemons = results.results;

		for (const pokemon of pokemons) {
			const pokemonFetchRequest = await fetch(pokemon.url);
			const singlePokemonInfo = await pokemonFetchRequest.json();
			pokemonStorage.update((value) => [...value, singlePokemonInfo]);
		}

		pokemonStorage.update(() => [...allPokemonInfo]);
	});
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
</div>

<style lang="scss">
	@import '../styles/_settings';
	#container {
		height: 100%;
		width: 100%;
		background: linear-gradient(to bottom, $white 0%, $light-purple 50%, $light-blue 100%);
	}
	#grid {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
