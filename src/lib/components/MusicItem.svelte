<script lang="ts">
	import { formatDuration, formatDate } from '$lib/utils/formatters';
	import MediaFeatures from '$lib/components/MediaFeatures.svelte';
	export let item: any;
</script>

<a
	href="/music/{item.id}"
	class="w-full max-w-4xl transform rounded-xl border border-white/20 bg-gradient-to-br from-purple-50/80 via-blue-50/80 via-yellow-40/50 to-pink-50/80 p-6 text-left text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:from-purple-100/90 hover:via-blue-100/90 hover:to-pink-100/90 focus:ring-2 focus:ring-white/50 focus:outline-none"
>
	<div class="flex items-start justify-between">
		<div>
			<h3 class="mb-1 text-2xl font-bold text-zinc-600">{item.title}</h3>
            {#if item.for}
			<p class="text-lg font-light text-zinc-500 italic">for {item.for}</p>
            {/if}
			<!-- Dedication  -->
			{#if item.dedication}
				<p class="font-light text-sm mt-1 italic text-zinc-400">{item.dedication}</p>
			{/if}
		</div>
		<!-- <span class="rounded-full bg-teal-400/20 px-3 py-1 text-xs font-semibold whitespace-nowrap text-teal-300">
            {item.category}
        </span> -->
		<div class="text-right">
			<div class="text-sm text-zinc-500">{formatDuration(item.length)}</div>
			<div class="text-sm text-zinc-500">
				{#if item.origional_date} 
					{formatDate(item.origional_date)} <br> Revised {formatDate(item.date)}
				{:else}
					{formatDate(item.date)}
				{/if}
			</div>
			<div class="mt-2 flex justify-end">
				<MediaFeatures item={item} />
			</div>
		</div>
	</div>

	<!-- Summary -->
	{#if item.summary}
		<p class="mt-4 text-sm mb-6 text-zinc-400">{item.summary}</p>
	{/if}

	<p class="mt-4 text-xs text-zinc-400 text-center italic">View details...</p>

</a>
