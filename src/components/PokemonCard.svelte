<script>
	export let name;
	export let img;
	export let types;
	export let id;

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
		}[e];
	};

	for (let type of types) {
		pokemonTypes.push(type.type.name);
	}

	const returnColor = (e) => {
		if (e.length === 1) {
			return `background: ${colors(e[0])}`;
		} else {
			return `background: linear-gradient(52deg, ${colors(e[0])} 0%, ${colors(e[1])} 100%`;
		}
	};
</script>

<a href="../pokemon/{id}" class="col-span-6 sm:col-span-2 xl:col-span-1">
	<div
		class="pokemon {name} card shadow-lg compact items-center "
		style={returnColor(pokemonTypes)}
	>
		<figure class="p-4">
			<img class="pokemon-image h-32 !w-32 mx-auto" src={img} alt={name} />
		</figure>

		<div class="card-body w-full text-center bg-neutral-focus/50">
			<h3 class="card-title uppercase text-secondary-content">{name}</h3>
		</div>
	</div>
</a>

<style lang="scss">
</style>
