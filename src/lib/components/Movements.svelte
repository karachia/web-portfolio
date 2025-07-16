<script lang="ts">
	import { convertNumberToDuration } from '$lib/utils/formatters';
	
	export let movements: any[] = [];
	
	// Helper function to check if movements exist and are valid
	function hasMovements(): boolean {
		return movements && Array.isArray(movements) && movements.length > 0;
	}
</script>

{#if hasMovements()}
	<div class="mb-8">
		<h4 class="mb-4 text-lg font-semibold text-zinc-700">Movements</h4>
		<div class="space-y-1">
			{#each movements as movement, index}
				<!-- <div class="flex items-center justify-between"> -->
					<div class="flex items-center">
						{#if movement.numbered}
							<span class="text-sm font-medium text-zinc-600 mr-1 w-6 text-center">
								{index + 1}.
							</span>
                        <!-- {:else} -->
                            <!-- <span class="text-sm font-medium text-zinc-600 mr-1 w-6 text-center">- </span> -->
						{/if}
						<span class="text-zinc-700 font-medium">
							{movement.name}
						</span>
						{#if movement.duration}
							<span class="text-sm text-zinc-600 ml-2">
								({convertNumberToDuration(movement.duration)})
							</span>
						{/if}
					</div>
					
				<!-- </div> -->
			{/each}
		</div>
	</div>
{/if} 