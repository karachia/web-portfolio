<script lang="ts">
	export let category: string;
	export let subcategory: string;
</script>

{#if category || subcategory}
	<div class="mt-3 flex flex-wrap gap-2 justify-end">
		{#if category}
			<span class="inline-flex items-center rounded-full bg-gradient-to-br from-black via-gray-700 to-black px-3 py-1 text-xs font-small text-zinc-200 shadow-lg">
				{category}
			</span>
		{/if}
		{#if subcategory}
			<span class="inline-flex items-center rounded-full bg-gradient-to-br from-black via-gray-700 to-black px-3 py-1 text-xs font-small text-zinc-200 shadow-lg">
				{subcategory}
			</span>
		{/if}
	</div>
{/if} 