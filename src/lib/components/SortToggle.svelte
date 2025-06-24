<script lang="ts">
	export let sortMode: 'chronological' | 'category' = 'chronological';
	export let onToggle: (mode: 'chronological' | 'category') => void;
</script>

<div class="flex items-center justify-center">
	<div class="relative bg-white/60 backdrop-blur-lg rounded-full p-1.5 shadow-lg border border-white/30 w-[278px] h-12 flex items-center">
		<!-- Sliding pill -->
		<div
			class="absolute top-1.5 left-1.5 h-9 w-[132px] rounded-full bg-zinc-800 shadow transition-all duration-300"
			style="transform: translateX({sortMode === 'chronological' ? '0' : '132px'});"
		></div>
		<!-- Buttons -->
		<button
			class="relative z-10 w-[132px] h-9 flex justify-center items-center rounded-full text-sm font-medium transition-all duration-300 {sortMode === 'chronological' ? 'text-white' : 'text-zinc-600 hover:text-zinc-800'}"
			on:click={() => onToggle('chronological')}
		>
			Chronological
		</button>
		<button
			class="relative z-10 w-[132px] h-9 flex justify-center items-center rounded-full text-sm font-medium transition-all duration-300 {sortMode === 'category' ? 'text-white' : 'text-zinc-600 hover:text-zinc-800'}"
			on:click={() => onToggle('category')}
		>
			By Category
		</button>
	</div>
</div> 