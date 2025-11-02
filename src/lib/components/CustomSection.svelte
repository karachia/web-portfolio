<script lang="ts">
	export let customSection: any;
</script>

{#if customSection}
	<div class="mt-8 mb-6 pt-6 border-t border-zinc-200">
		{#if customSection.title}
			<h3 class="mb-4 text-xl font-bold text-zinc-700">{customSection.title}</h3>
		{/if}
		
		<!-- Banner Image and Description Layout -->
		<div class="mb-4">
			{#if customSection.bannerImage}
				<!-- Banner Image - Float right on medium+ screens, centered on mobile -->
				<div class="mb-4 md:float-right md:ml-6 md:mb-4 rounded-xl overflow-hidden shadow-md max-w-full mx-auto md:mx-0">
					<img 
						src={customSection.bannerImage} 
						alt={customSection.title || 'Custom section banner'} 
						class="w-full h-auto md:max-w-xs md:max-h-56 object-cover"
					/>
				</div>
			{/if}
			
			<!-- Description -->
			{#if customSection.description}
				<div class="text-zinc-600 leading-relaxed">{@html customSection.description}</div>
			{/if}
			
			<!-- Clear float -->
			<div class="clear-both"></div>
		</div>
		
		<!-- Link Button -->
		{#if customSection.link}
			<div class="mb-4">
				<a
					href={customSection.link}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center rounded-3xl bg-zinc-800 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-zinc-700 hover:shadow-lg"
				>
                {customSection.linkText || 'Read Article'}
					<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
					</svg>
				</a>
			</div>
		{/if}
		
		<!-- Images Grid - Masonry Layout -->
		{#if customSection.images && customSection.images.length > 0}
			<div class="columns-1 sm:columns-2 gap-4 mt-10">
				{#each customSection.images as image}
					<div class="rounded-xl overflow-hidden mb-4 break-inside-avoid">
						<img 
							src={image} 
							alt="" 
							class="w-full h-auto"
						/>
					</div>
				{/each}
			</div>
		{/if}
	
	</div>
{/if}

