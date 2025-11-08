<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, scale, slide } from 'svelte/transition';
	import PayhipButton from './PayhipButton.svelte';
	import Icon from 'svelte-awesome';
	import eyeIcon from 'svelte-awesome/icons/eye';
	
    export let pieceId: string;
	export let isOpen: boolean = false;
	export let scoreData: any = null; // Now expects the full score object with payhipPage and scoreOptions
	export let pieceTitle: string = '';
	export let pieceFor: string = '';
	export let category: string = '';
	
	$: scores = scoreData?.scoreOptions || [];
	
	const dispatch = createEventDispatcher();
	
	$: scoreLabel = category?.toLowerCase() === 'solo' ? 'sheet music' : 'score';
	
	let openIframeProductId: string | null = null;
	let selectedScore: any = null;
	let scrollableContentElement: HTMLElement | null = null;

	// Prevent background scrolling when modal is open
	$: if (typeof document !== 'undefined') {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
	
	// Detect if user is on Safari
	let isSafari = false;
	let safariNoticeExpanded = false;
	if (typeof window !== 'undefined') {
		isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	}
	
	function toggleSafariNotice() {
		safariNoticeExpanded = !safariNoticeExpanded;
	}
	
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

    function getPieceString() {
        return pieceId;
    }
	
	function scrollToTop() {
		if (scrollableContentElement) {
			scrollableContentElement.scrollTop = 0;
		}
	}
	
	function handlePurchaseClick(score: any) {
		openIframeProductId = score.productId;
		selectedScore = score;
		// Scroll to top after a brief delay to ensure the iframe section is rendered
		setTimeout(() => {
			scrollToTop();
		}, 100);
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
			class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
			in:scale={{ duration: 200 }}
		>
			<!-- Header -->
			<div class="flex items-center justify-between p-6 border-gray-200 border-b flex-shrink-0">
				<h2 class="text-lg md:text-xl font-semibold text-zinc-800">
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
			
			<!-- Back button for Payhip view (fixed position) -->
			{#if selectedScore !== null}
				<div class="px-6 py-4 border-b border-gray-200 flex-shrink-0">
					<button on:click={() => { selectedScore = null; openIframeProductId = null; }} class="text-sm text-zinc-600 hover:underline flex items-center">
						<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
						Back
					</button>
					<div class="flex justify-center mt-2">
						<h3 class="text-lg font-semibold text-gray-900">{selectedScore.name} - {selectedScore.price === 0 ? 'Free' : `$${selectedScore.price.toFixed(2)}`}</h3>
					</div>
					<p class="text-gray-500 text-xs md:text-sm text-center mt-2">Checkout experience is powered by <span class="font-semibold">Payhip</span> & payments are processed securely by <span class="font-semibold">PayPal</span>. <br /> If the transaction fails, visit my <a class="underline text-blue-500" href={scoreData.payhipPage} target="_blank" rel="noopener noreferrer">Payhip store</a> instead.</p>
					<!-- instead or use <span class="font-semibold">Chrome</span> browser</p> -->
					<!-- as there are some issues browsers such as Safari <br/>On Safari, you may also temporarily disable <span class="font-semibold">Safari &gt; Settings &gt; Privacy &gt; Prevent cross-site tracking</span></p> -->
					
					<!-- Safari compatibility note -->
					{#if isSafari}
						<div class="mt-6 mb-2">
							<!-- Collapsed state -->
							<button 
								on:click={toggleSafariNotice}
								class="w-full p-3 bg-amber-50 border border-amber-200 rounded-xl text-left hover:bg-amber-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
								aria-expanded={safariNoticeExpanded}
							>
								<div class="flex items-center justify-between">
									<div class="flex items-center">
										<div class="flex-shrink-0">
											<svg class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
												<path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
											</svg>
										</div>
										<div class="ml-3 text-xs font-medium text-amber-800">
											<span class="line">
												Safari Users: 
											</span>
											<span class="line">
												click here if transaction fails
											</span>
										</div>
									</div>
									<div class="flex-shrink-0">
										<svg 
											class="h-4 w-4 text-amber-600 transform transition-transform duration-200 {safariNoticeExpanded ? 'rotate-90' : ''}" 
											viewBox="0 0 20 20" 
											fill="currentColor"
										>
											<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
										</svg>
									</div>
								</div>
							</button>
							
							<!-- Expanded state -->
							{#if safariNoticeExpanded}
								<div 
									class="p-4 bg-amber-50 border border-amber-200 rounded-xl border-t-0 rounded-t-none"
									transition:slide={{ duration: 200 }}
								>
									<div class="text-xs text-amber-700">
										<p class="mb-3">Safari's privacy settings may block the embedded checkout. If the purchase doesn't work, you can try one of the following:</p>
										<ul class="list-disc list-inside space-y-0.5">
											<li>Use <a href={scoreData.payhipPage} target="_blank" rel="noopener noreferrer" class="underline font-medium">direct PayHip store link</a></li>
											<li>Use Chrome or Firefox browser</li>
											<li>Temporarily disable: Safari → Settings → Privacy → Uncheck "Prevent cross-site tracking"</li>
										</ul>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Content -->
			<div class="flex-1 overflow-y-auto" bind:this={scrollableContentElement}>
				<div class="p-6">
				{#if selectedScore === null}
					<p class="text-sm text-gray-600 mb-6">
						Access the {scoreLabel} in PDF format. Print and shipping is <b>NOT</b> available.
					</p>
					
					{#if scores.length > 0}
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
                                            {/if}
										</p>
										{#if !score.productId && !score.price}
											<p class="text-gray-500 text-xs mt-0 mb-3">Item and pricing are only available upon request.</p>
                                        {:else if !score.productId && score.price}
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
                                            {#if score.productId && score.price}
                                                <PayhipButton 
                                                    productId={score.productId}
                                                    variantId={score.variantId || ''}
                                                    buttonText={score.price === 0 ? `Download` : `Purchase`}
                                                    theme="none"
                                                    method="inline"
                                                    iframeTarget="payhip-iframe"
                                                    customTitle={`${pieceTitle} - ${score.name}`}
                                                    customMessage={`${pieceFor ? ` for ${pieceFor}` : ''}`}
                                                    on:inline={() => handlePurchaseClick(score)}
                                                />
                                            {:else}
                                                <button
                                                on:click={() => window.open(`/contact?type=scorePurchase&piece=${getPieceString()}`, '_blank')}
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
						<!-- The main score button should not even show if there are no options but this is just for safety  -->
						<div class="text-center py-8">
							<p class="text-gray-500">No scores currently available. Please use the Payhip store link above or contact for more information.</p>
						</div>
					{/if}
				{:else}
					<!-- Step 2: Show only the Payhip iframe (back button is now fixed above) -->
                    {/if}
					<!--  Payhip iframe -->
                    <div
                    class="payhip-iframe mx-auto mt-4 flex justify-center rounded-2xl"
                    style="height: 1000px; width: 100%; background-color: #dadbdc; display: {selectedScore && openIframeProductId === selectedScore.productId ? 'flex' : 'none'}"
                    ></div>
                </div>
			</div>
		</div>
	</div>
{/if} 

<style>
	span.line {
		display: inline-block;
	}
</style>