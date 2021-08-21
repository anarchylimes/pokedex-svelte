<script>
	import { onMount } from 'svelte';

	import { pokemonStorage } from './store';

	const numberOfPokemon = 151;
	let allPokemonInfo;
	let pokemons = [];

	pokemonStorage.subscribe((value) => {
    allPokemonInfo = value
  });

	onMount(async () => {
		let baseApi = `https://pokeapi.co/api/v2/pokemon/?limit=${numberOfPokemon}`;
		const data = await fetch(baseApi)
    const results = await data.json()
		pokemons = results.results

    for (const pokemon of pokemons) {
      const pokemonFetchRequest = await fetch(pokemon.url);
      const singlePokemonInfo = await pokemonFetchRequest.json();
      pokemonStorage.update((value) => [...value, singlePokemonInfo]);
    }

    pokemonStorage.update(() => [...allPokemonInfo])
	});
</script>

<svelte:head>
	<title>Svelte Pokedex</title>
</svelte:head>

<div id="container">
	<div id="grid">
		{#each allPokemonInfo as pokemon}
			<div class="pokemon {pokemon.name}}">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{pokemon.id}.png" alt="{pokemon.name} Artwork" />
				<p class="pokemon-name">{pokemon.name}</p>
			</div>
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

		.pokemon {
			background: $white;
			max-width: 10rem;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 1rem 0.5rem;
			padding: 1rem;
			border-radius: 8px;
			box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 12px;
		}

		.pokemon-image {
			height: 8rem;
		}

		.pokemon-name {
			text-transform: capitalize;
		}
	}
</style>
