<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MusicItem from '$lib/components/MusicItem.svelte';

	export let category: string;
	export let subcategories: { [key: string]: any[] };
	export let isExpanded: boolean = true;

	const dispatch = createEventDispatcher<{ toggle: string }>();

	function toggleExpanded() {
		dispatch('toggle', category);
	}
</script>

<div class="mb-8">
	<!-- Category Header -->
	<button
		on:click={toggleExpanded}
		class="w-full flex items-center justify-between p-4 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
	>
		<h2 class="text-2xl font-bold text-zinc-700">{category}</h2>
		<svg
			class="w-6 h-6 text-zinc-600 transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isExpanded}
		<!-- Subcategories -->
		<div class="space-y-6 mb-16">
			{#each Object.entries(subcategories) as [subcategory, items]}
				<div>
					<div class="flex justify-center mt-10 mb-4">
						<h3 class="text-xl font-bold drop-shadow-lg bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent text-center">
							{subcategory}
						</h3>
					</div>
					<div class="flex flex-col items-center space-y-3 md:space-y-8">
						{#each items as item}
							<MusicItem {item} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div> 