<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

	const dispatch = createEventDispatcher<{ search: string }>();
	let expanded = false;
	let showButton = true;
	let query = '';
	let inputRef: HTMLInputElement | null = null;
	let showClear = false;

	function expand() {
		expanded = true;
		showButton = false;
		setTimeout(() => inputRef?.focus(), 10);
	}
	function collapse() {
		if (query.trim() === '') {
			expanded = false;
			query = '';
			dispatch('search', '');
		}
	}
	function handleInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
		dispatch('search', query);
	}
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			query = '';
			dispatch('search', '');
			expanded = false;
		}
	}
	function onOutroEnd() {
		setTimeout(() => { showButton = true; }, 0);
	}
	function clearSearch() {
		query = '';
		dispatch('search', '');
		inputRef?.focus();
	}
</script>

<div class="flex items-center justify-center mb-8">
	<div class="relative flex items-center" style="width:3rem; min-width:3rem;">
		<!-- Search Button -->
		{#if showButton}
		<div class="w-12 h-12 flex items-center justify-center">
			<button
				class="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-lg border border-white/30 text-zinc-700 hover:bg-white transition-all duration-300 focus:outline-none"
				aria-label="Search"
				on:click={expand}
				style="z-index:2"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
					<line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2"/>
				</svg>
			</button>
		</div>
		{/if}
		<!-- Search Input -->
		{#if expanded}
			<form
				autocomplete="off"
				class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center bg-white/90 border border-white/30 shadow-lg rounded-full px-4 w-72 h-12 group"
				on:submit|preventDefault={() => {}}
				style="z-index:3"
				transition:scale={{ duration: 80, start: 0.85, opacity: 0.7 }}
				on:outroend={onOutroEnd}
				on:mouseenter={() => showClear = true}
				on:mouseleave={() => showClear = false}
			>
				<svg class="w-5 h-5 text-zinc-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
					<line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2"/>
				</svg>
				<input
					bind:this={inputRef}
					type="text"
					placeholder="Search..."
					class="flex-1 bg-transparent outline-none text-zinc-800 text-base border-none focus:outline-none focus:ring-0 pr-10"
					value={query}
					on:input={handleInput}
					on:keydown={handleKeydown}
					on:blur={collapse}
					on:focus={() => showClear = true}
				/>
				{#if query && showClear}
					<button type="button"
						class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors text-3xl focus:outline-none"
						on:click={clearSearch}
						tabindex="-1"
						aria-label="Clear search"
						style="padding:0;line-height:1;"
					>
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				{/if}
			</form>
		{/if}
	</div>
</div>

<style>
	form.hidden, button.hidden {
		display: none;
	}
</style> 