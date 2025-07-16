<script lang="ts">
	import { formatDuration } from '$lib/utils/formatters';
	
	export let movements: any[] = [];
	
	// Helper function to check if movements exist and are valid
	function hasMovements(): boolean {
		return movements && Array.isArray(movements) && movements.length > 0;
	}
</script>

{#if hasMovements()}
	<div class="pt-2 mb-8">
		<h4 class="mb-4 text-lg font-semibold text-zinc-600">Movements</h4>
		<div class="space-y-1">
			{#each movements as movement, index}
				<!-- <div class="flex items-center justify-between"> -->
					<div class="flex items-center">
						{#if movement.numbered}
							<span class="text-sm font-medium text-zinc-600 mr-3 w-6 text-center">
								{index + 1}.
							</span>
						{/if}
						<span class="text-zinc-800 font-medium">
							{movement.name}
						</span>
                        {#if movement.duration}
                            <span class="text-sm text-zinc-600 ml-3">
                                ({formatDuration(movement.duration)})
                            </span>
                        {/if}
					</div>
					
				<!-- </div> -->
			{/each}
		</div>
	</div>
{/if} 