<script lang="ts">
import { createEventDispatcher } from 'svelte';
export let active = false;
export let className = '';
const dispatch = createEventDispatcher();
</script>

<div class="w-12 h-12 flex items-center justify-center {className}">
	<button
		class="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/30 shadow-lg transition-all duration-200 focus:outline-none overflow-hidden"
		aria-label="Filter"
		style="background: none;"
		on:click={() => dispatch('click')}
	>
		<!-- White background always -->
		<span class="absolute left-0 top-0 w-full h-full rounded-full bg-[rgba(255,255,255,0.8)] transition-all duration-300 z-0"></span>
		<!-- Black inner circle when active -->
		{#if active}
			<span class="absolute inset-0 m-1 rounded-full bg-zinc-800 transition-all duration-300 z-10"></span>
		{/if}
		<span class="relative z-20 flex items-center justify-center w-full h-full">
			<svg class="w-7 h-5 transition-colors duration-200" fill="none" stroke={active ? 'white' : 'currentColor'} stroke-width="2" viewBox="0 0 28 24" aria-hidden="true">
				<path d="M2 5h24M5 12h18M9 19h10" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</span>
	</button>
</div> 