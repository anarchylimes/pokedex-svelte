<script>
  export let name
  export let img
</script>

<style lang="scss">
  @import '../styles/_settings';
		.pokemon {
      background: $white;
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

<article class="pokemon {name}">
    <img class="pokemon-image" src={img} alt="{name}">
    <p class="pokemon-name">{name}</p>
</article>