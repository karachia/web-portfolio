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
	
	let openIframeProductId: string | null = null;
	let selectedScore: any = null;
	
	function closeModal() {
		isOpen = false;
        selectedScore = null;
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
				{#if selectedScore === null}
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
										<p class="text-2xl text-zinc-700 mb-3">
                                            {#if score.price}
											{score.price === 0 ? 'Free' : `$${score.price.toFixed(2)}`}
                                            {:else}
                                            <span class="text-gray-500 text-sm"><a class="underline" href="/contact">Contact me</a> for pricing</span>
                                            {/if}
										</p>
                                        {#if !score.productId}
                                        <p class="text-gray-500 text-sm mt-0 mb-3">Item is only available upon request.</p>
                                        {/if}
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
                                            {#if score.productId}
                                                <PayhipButton 
                                                    productId={score.productId}
                                                    variantId={score.variantId || ''}
                                                    buttonText={score.price === 0 ? `Download` : `Purchase`}
                                                    theme="none"
                                                    method="inline"
                                                    iframeTarget="payhip-iframe"
                                                    customTitle={`${pieceTitle}${pieceFor ? ` for ${pieceFor}` : ''} - ${score.name}`}
                                                    customMessage={`${score.price === 0 ? `Download` : `Purchase`} the ${score.name} ${scoreLabel} for ${pieceTitle}${pieceFor ? ` for ${pieceFor}` : ''}`}
                                                    on:inline={() => { openIframeProductId = score.productId; selectedScore = score; }}
                                                />
                                            {:else}
                                                <button
                                                on:click={() => window.open('/contact', '_blank')}
                                                class="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors duration-200"
                                                >
                                                Contact Me
                                                </button>
                                            {/if}
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<!-- Step 2: Show only the selected score's PayhipButton and iframe -->
					<button on:click={() => { selectedScore = null; openIframeProductId = null; }} class="mb-4 text-sm text-blue-600 hover:underline flex items-center">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
						Back to score options
					</button>
					<div class="flex justify-center border-b border-gray-200 pb-4">
						<h3 class="text-lg font-semibold text-gray-900 mb-2">{selectedScore.name} - {selectedScore.price === 0 ? 'Free' : `$${selectedScore.price.toFixed(2)}`}</h3>
					</div>
                    {/if}
                    <div
                    class="payhip-iframe mx-auto mt-4 flex justify-center rounded-2xl"
                    style="min-height:500px; background-color: #dadbdc; display: {selectedScore && openIframeProductId === selectedScore.productId ? 'flex' : 'none'}"
                    ></div>
                </div>
		</div>
	</div>
{/if} 