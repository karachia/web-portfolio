<script lang="ts">	
	export let payhipUrl: string = '';
	export let productId: string;
	export let theme: string = 'none';
	export let buttonText: string = 'Get Score';
	export let customTitle: string = '';
	export let customMessage: string = '';
	export let customIcon: string = '';
	export let metadata: string = '';
	export let successUrl: string = '';
	export let successCallback: string = '';

	// Function to handle custom checkout with overlay
	function handleCustomCheckout() {
		if (typeof window !== 'undefined' && (window as any).Payhip) {
			console.log('Opening Payhip checkout...');

			// Open Payhip checkout with overlay
			(window as any).Payhip.Checkout.open({
				product: productId,
				theme: theme,
				method: 'overlay',
				title: customTitle || undefined,
				message: customMessage || undefined,
				icon: customIcon || undefined,
				metadata: metadata || undefined,
				successUrl: successUrl || undefined,
				successCallback: successCallback || undefined
			});
		}
	}
</script>

<button 
	on:click={handleCustomCheckout}
	class="inline-flex items-center rounded-xl bg-zinc-800 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-zinc-700 hover:shadow-lg"
>
	{buttonText}
</button>
