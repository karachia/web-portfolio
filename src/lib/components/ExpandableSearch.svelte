<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let alwaysExpanded: boolean = false;
	const dispatch = createEventDispatcher<{ search: string }>();
	let expanded = false;
	let query = '';
	let inputRef: HTMLInputElement | null = null;
	let inputFocused = false;

	$: expanded = alwaysExpanded ? true : expanded;

	function expand() {
		expanded = true;
		setTimeout(() => inputRef?.focus(), 120);
	}
	function collapse() {
		if (!alwaysExpanded && query.trim() === '') {
			expanded = false;
			query = '';
			dispatch('search', '');
		}
		inputFocused = false;
	}
	function handleInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
		dispatch('search', query);
	}
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			query = '';
			dispatch('search', '');
			if (!alwaysExpanded) expanded = false;
		}
	}
	function clearSearch() {
		query = '';
		dispatch('search', '');
		inputRef?.focus();
	}
</script>

<div class="flex items-center justify-center">
	<div
		class="relative flex items-center overflow-hidden transition-all duration-300 shadow-lg border border-white/30 bg-white/80"
		style="width: {expanded ? '18rem' : '3rem'}; border-radius: 9999px; min-width: 3rem;"
		on:click={() => { if (!expanded && !alwaysExpanded) expand(); }}
	>
		<!-- Search Icon -->
		<div class="absolute left-0 top-0 h-full w-12 flex items-center justify-center pointer-events-none">
			<svg class="w-6 h-6 text-zinc-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
				<line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2"/>
			</svg>
		</div>
		<!-- Input -->
		<input
			bind:this={inputRef}
			type="text"
			placeholder="Search..."
			class="pl-12 pr-10 py-0 bg-transparent outline-none text-zinc-800 text-base border-none focus:outline-none focus:ring-0 w-full h-12 transition-opacity duration-200"
			style="opacity: {expanded ? 1 : 0}; pointer-events: {expanded ? 'auto' : 'none'};"
			value={query}
			on:input={handleInput}
			on:keydown={handleKeydown}
			on:blur={collapse}
			on:focus={() => inputFocused = true}
			tabindex={expanded ? 0 : -1}
		/>
		<!-- Clear Button -->
		{#if (inputFocused || query) && expanded}
			<button type="button"
				class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors text-2xl focus:outline-none"
				on:click={clearSearch}
				tabindex="-1"
				aria-label="Clear search"
				style="padding:0;line-height:1;"
			>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		{/if}
		<!-- Clickable overlay for collapsed state -->
		{#if !expanded && !alwaysExpanded}
			<div class="absolute inset-0 cursor-pointer z-10"></div>
		{/if}
	</div>
</div>

<style>
	input::placeholder {
		color: #a1a1aa; /* zinc-400 */
		opacity: 1;
	}
</style> 