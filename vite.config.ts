import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// Separate vendor chunks for better caching
					vendor: ['svelte-awesome']
				}
			}
		}
	},
	optimizeDeps: {
		include: ['svelte-awesome']
	}
});