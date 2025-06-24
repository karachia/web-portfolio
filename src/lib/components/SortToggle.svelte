<script lang="ts">
	export let sortMode: 'chronological' | 'category' = 'chronological';
	export let onToggle: (mode: 'chronological' | 'category') => void;
</script>

<div class="flex items-center justify-center mb-8">
	<div class="bg-white/60 backdrop-blur-lg rounded-full p-1 shadow-lg border border-white/30">
		<button
			class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 {sortMode === 'chronological'
				? 'bg-zinc-800 text-white shadow-md'
				: 'text-zinc-600 hover:text-zinc-800'}"
			on:click={() => onToggle('chronological')}
		>
			Chronological
		</button>
		<button
			class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 {sortMode === 'category'
				? 'bg-zinc-800 text-white shadow-md'
				: 'text-zinc-600 hover:text-zinc-800'}"
			on:click={() => onToggle('category')}
		>
			By Category
		</button>
	</div>
</div> 