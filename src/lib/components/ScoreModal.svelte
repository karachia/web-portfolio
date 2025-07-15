<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import PayhipButton from './PayhipButton.svelte';
	import Icon from 'svelte-awesome';
	import eyeIcon from 'svelte-awesome/icons/eye';
	
	export let isOpen: boolean = false;
	export let scores: any[] = [];
	export let pieceTitle: string = '';
	export let pieceFor: string = '';
	export let category: string = '';
	
	const dispatch = createEventDispatcher();
	
	$: scoreLabel = category?.toLowerCase() === 'solo' ? 'sheet music' : 'score';
	
	function closeModal() {
		isOpen = false;
		dispatch('close');
	}
	
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}
	
	function handleEscapeKey(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
	
	function openPreview(previewUrl: string) {
		window.open(previewUrl, '_blank');
	}
</script>

<svelte:window on:keydown={handleEscapeKey} />

{#if isOpen}
	<!-- Backdrop -->
	<div 
		class="fixed inset-0 bg-black/85 flex items-center z-50 justify-center p-4"
		on:click={handleBackdropClick}
		in:fade={{ duration: 200 }}
	>
		<!-- Modal Content -->
		<div 
			class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
			in:scale={{ duration: 200 }}
		>
			<!-- Header -->
			<div class="flex items-center justify-between p-6 border-gray-200 border-b">
				<h2 class="text-2xl italic font-semibold text-zinc-600">
					{pieceTitle}{pieceFor ? ` for ${pieceFor}` : ''}

				</h2>

				<button
					on:click={closeModal}
					class="text-gray-400 hover:text-gray-600 transition-colors"
					aria-label="Close modal"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
			
			<!-- Content -->
			<div class="p-6">
				<p class="text-md text-gray-600 mb-6">
                    Access the {scoreLabel} in PDF format. Print and shipping is <b>NOT</b> available.
				</p>
				
				<div class="space-y-4">
					{#each scores as score, index}
						<div class="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<h3 class="text-lg font-semibold text-gray-900 mb-2">
										{score.name}
									</h3>
									<p class="text-2xl font-bold text-zinc-700 mb-3">
										{score.price === 0 ? 'Free' : `$${score.price.toFixed(2)}`}
									</p>
									
									<div class="flex space-x-3">
										{#if score.preview}
											<button
												on:click={() => openPreview(score.preview)}
												class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											>
												<Icon data={eyeIcon} class="w-4 h-4 mr-2" />
												Preview
											</button>
										{/if}
										
										<PayhipButton 
											productId={score.productId}
											buttonText={score.price === 0 ? `Download` : `Purchase`}
											theme="none"
											customTitle={`${pieceTitle}${pieceFor ? ` for ${pieceFor}` : ''} - ${score.name}`}
											customMessage={`${score.price === 0 ? `Download` : `Purchase`} the ${score.name} ${scoreLabel} for ${pieceTitle}${pieceFor ? ` for ${pieceFor}` : ''}`}
										/>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if} 