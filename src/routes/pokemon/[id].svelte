<script>
import { page } from '$app/stores';

  	import { pokemonStorage } from '../storage';
    const id = $page.params.id
</script>

<style lang="scss">
  /* your styles go here */
</style>

<p>{$pokemonStorage}</p>