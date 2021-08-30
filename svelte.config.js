/** @type {import('@sveltejs/kit').Config} */

import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const config = {
	preprocess: [preprocess({
        "postcss": true
    })],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#app',
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	}
};

export default config;
