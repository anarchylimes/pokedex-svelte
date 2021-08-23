<script>
	export let name;
	export let img;
	export let types = undefined;

	let pokemonTypes = [];

	const colors = (e) => {
    return {
      normal: 'rgb(248, 177, 149)',
      fighting: 'rgb(245, 88, 123)',
      flying: 'rgb(30,175,237)',
      poison: 'rgb(123,136,255)',
      ground: 'rgb(187,113,113)',
      rock: 'rgb(196, 193, 224)',
      bug: 'rgb(123,198,123)',
      ghost: 'rgb(222,222,222)',
      steel: 'rgb(113,160,165)',
      fire: 'rgb(238, 119, 119)',
      water: 'rgb(114, 214, 201)',
      grass: 'rgb(176, 224, 168)',
      electric: 'rgb(255, 199, 133)',
      psychic: 'rgb(130, 172, 255)',
      ice: 'rgb(176, 222, 255)',
      dragon: 'rgb(255,162,88)',
      dark: 'rgb(167,115,195)',
      fairy: 'rgb(171,147,201)',
      unknown: 'rgb(52,132,152)',
      shadow: 'rgb(69,77,102)'
    }[e]
	};

  for (let type of types) {
		pokemonTypes.push(type.type.name);
	}

  const returnColor = e => {
    if (e.length === 1) {
      return `background: ${colors(e[0])}`
    } else {
      return `background: linear-gradient(to right, ${colors(e[0])} 50%, ${colors(e[1])} 50%`
    }
  }
</script>

<article class="pokemon {name}" style="{returnColor(pokemonTypes)}">
	<img class="pokemon-image" src={img} alt={name} />
	<p class="pokemon-name">{name}</p>
</article>

<style lang="scss">
	@import '../styles/_settings';
	.pokemon {
		max-width: 16rem;
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
		height: 14rem;
	}

	.pokemon-name {
		margin-top: 1.5rem;
		text-transform: capitalize;
		font-family: 'IBM Plex Serif', serif;
		font-style: italic;
		font-size: 1.25rem;
		letter-spacing: 1px;
	}
</style>
