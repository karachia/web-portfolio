import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import { join } from 'path';

// Function to get all music composition entries from music.json
function getMusicCompositionEntries() {
	try {
		const musicDataPath = join(process.cwd(), 'static', 'data', 'music.json');
		const musicData = JSON.parse(readFileSync(musicDataPath, 'utf8'));
		return musicData.map(piece => `/music/${piece.id}`);
	} catch (error) {
		console.warn('Could not read music.json, returning empty array:', error.message);
		return [];
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: 'index.html', //'404.html',
			precompress: true, // Enable compression for better performance
			strict: true
		}),
		prerender: {
			crawl: true,
			entries: [
				'/',
				'/about',
				'/art',
				'/contact',
				'/music',
				'/media',
				'/explore',
				...getMusicCompositionEntries()
			],
			// handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
