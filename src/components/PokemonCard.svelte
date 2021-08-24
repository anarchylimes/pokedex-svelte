<script>
	export let name;
	export let img;
	export let types;

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
      return `background: linear-gradient(52deg, ${colors(e[0])} 0%, ${colors(e[1])} 100%`
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
    position: relative;
		max-width: 17%;
    min-width: 17%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    margin: .75rem;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 12px;

    &::before {
      display: block;
      position: absolute;
      content: '';
      top: 25%;
      left: 50%;
      transform: translate3d(-50%, -25%, 0);
      height: 7rem;
      width: 7rem;
      border-radius: 50%;
      background: rgba($white, .25);
      border: 1px solid rgba(#fff, .125);
      z-index: 0;  
    }
	}

	.pokemon-image {
		height: 8rem;
    z-index: 1;
  }

	.pokemon-name {
		margin-top: 1.5rem;
		text-transform: capitalize;
		font-family: 'IBM Plex Serif', serif;
		font-style: italic;
		font-size: 1.125rem;
		letter-spacing: 1px;
    padding: .5rem 1rem;
    background: rgba($white, .75);
    border-radius: 8px;
	}
</style>
