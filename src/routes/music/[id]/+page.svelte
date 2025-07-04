<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { formatDuration, formatDate } from '$lib/utils/formatters';
	import SoundCloudEmbed from '$lib/components/SoundCloudEmbed.svelte';
	import StreamingEmbed from '$lib/components/StreamingEmbed.svelte';
	import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';
	import CollapsibleText from '$lib/components/CollapsibleText.svelte';
	import MediaFeatures from '$lib/components/MediaFeatures.svelte';
	import OtherVersions from '$lib/components/OtherVersions.svelte';
	import CategoryTags from '$lib/components/CategoryTags.svelte';
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import { fade } from 'svelte/transition';

	let musicItem: any = null;
	let loading = true;
	let error = false;
	let allMusic: any[] = [];
	let mounted = false;

	onMount(async () => {
		try {
			const response = await fetch('/data/music.json');
			allMusic = await response.json();
			const id = $page.params.id;

			musicItem = allMusic.find((item: any) => item.id === id);

			if (!musicItem) {
				error = true;
			}
		} catch (err) {
			error = true;
		} finally {
			loading = false;
		}
	});

	// Set mounted to true after a brief delay to trigger fade-in
	setTimeout(() => {
		mounted = true;
	}, 100);

	function goBack() {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			goto('/music');
		}
	}

	// Helper function to check if a value is truthy and not an empty string
	function isValidString(value: any): boolean {
		return value && typeof value === 'string' && value.trim() !== '';
	}

	// Helper function to check if an array has valid items
	function hasValidItems(array: any[]): boolean {
		return array && Array.isArray(array) && array.some((item) => isValidString(item));
	}

	// Get other versions that actually exist
	$: otherVersions = musicItem?.otherVersions
		? allMusic.filter(
				(item: any) => musicItem.otherVersions.includes(item.id) && item.id !== musicItem.id
			)
		: [];
</script>

<svelte:head>
	<title>{musicItem ? `${musicItem.title} - Sina Karachiani` : 'Sina Karachiani - Music'}</title>
	<meta
		name="description"
		content={musicItem
			? `Listen to ${musicItem.title} by Sina Karachiani`
			: 'Music by Sina Karachiani'}
	/>
</svelte:head>

{#if loading}
	<div class="flex min-h-screen items-center justify-center relative z-[2]">
		<div class="text-xl text-gray-600">Loading...</div>
	</div>
{:else if error || !musicItem}
	<div class="flex min-h-screen items-center justify-center relative z-[2]">
		<div class="text-center">
			<h1 class="mb-4 text-2xl font-bold text-gray-800">Music piece not found</h1>
			<p class="mb-6 text-gray-600">The music piece you're looking for doesn't exist.</p>
			<button
				on:click={goBack}
				class="rounded bg-gray-900 px-6 py-2 text-white shadow transition-colors duration-200 hover:bg-gray-700"
			>
				Back
			</button>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 py-8">
		{#if mounted}
			<div class="mx-auto max-w-4xl px-4 relative z-[2]" in:fade={{ duration: 800 }}>
				<!-- Back button -->
				<button
					on:click={goBack}
					class="mb-6 flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-900"
				>
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
						></path>
					</svg>
					Back
				</button>

				<!-- Music content -->
				<div class="rounded-4xl border border-zinc-200 bg-white p-8 text-zinc-800 shadow-2xl">
					<div class="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
						<div class="flex-1 text-center sm:text-left">
							<h1 class="text-3xl font-bold text-zinc-800">{musicItem.title}</h1>
							{#if isValidString(musicItem.for)}
								<p class="mt-0 text-xl font-light text-zinc-600 italic">for {musicItem.for}</p>
							{/if}
							{#if isValidString(musicItem.dedication)}
								<p class="text-sm text-zinc-500 italic">{musicItem.dedication}</p>
							{/if}

							<!-- Commissioned By -->
							{#if isValidString(musicItem.commissionedBy)}
								<div class="mt-2 text-sm text-zinc-600">
									{musicItem.commissionedBy}
								</div>
							{/if}

							<!-- Length and Date -->
							<p class="text-md mt-2 text-zinc-600">
								{formatDuration(musicItem.length)} &nbsp;//&nbsp; {formatDate(musicItem.date)}
							</p>

							<!-- Instrumentation -->
							{#if isValidString(musicItem.detailed_instrumentation)}
								<div>
									<div class="text-md text-bold mt-2 text-zinc-800">Instrumentation:</div>
									<div class="text-sm text-zinc-600">
										{musicItem.detailed_instrumentation}
									</div>
								</div>
							{/if}

							<!-- Image (mobile: below commission text, desktop: to the right) -->
							{#if isValidString(musicItem.image)}
								<div class="mt-6 sm:hidden flex flex-col items-center">
									<img
										src={musicItem.image}
										alt={`Cover art for ${musicItem.title}`}
										class="h-80 w-80 sm:h-48 sm:w-48 rounded-2xl object-cover shadow-lg"
									/>
									<!-- Category Tags -->
									<CategoryTags category={musicItem.category} subcategory={musicItem.subcategory} />
									
									<!-- Media Features -->
									<div class="mt-3 flex justify-center">
										<MediaFeatures item={musicItem} />
									</div>
								</div>
							{:else}
								<!-- Media Features (when no image) - mobile only -->
								<div class="mt-6 sm:hidden flex flex-col items-center">
									<!-- Category Tags (when no image) -->
									<CategoryTags category={musicItem.category} subcategory={musicItem.subcategory} />
									<div class="mt-2.5">
										<MediaFeatures item={musicItem} />
									</div>
								</div>
							{/if}

							<!-- Other Versions -->
							<OtherVersions {otherVersions} />
						</div>

						<!-- Image (desktop only: to the right) -->
						{#if isValidString(musicItem.image)}
							<div class="hidden sm:flex sm:ml-8 sm:flex-shrink-0 sm:flex-col sm:items-end">
								<img
									src={musicItem.image}
									alt={`Cover art for ${musicItem.title}`}
									class="h-80 w-80 sm:h-48 sm:w-48 rounded-2xl object-cover shadow-lg"
								/>
								<!-- Category Tags -->
								<CategoryTags category={musicItem.category} subcategory={musicItem.subcategory} />
								
								<!-- Media Features -->
								<div class="mt-3 flex justify-end">
									<MediaFeatures item={musicItem} />
								</div>
							</div>
						{:else}
							<!-- Media Features (when no image) - desktop only -->
							<div class="hidden sm:flex sm:ml-8 sm:flex-shrink-0 sm:flex-col sm:items-end sm:justify-end">
								<!-- Category Tags (when no image) -->
								<CategoryTags category={musicItem.category} subcategory={musicItem.subcategory} />
								<div class="mt-2.5">
									<MediaFeatures item={musicItem} />
								</div>
							</div>
						{/if}
					</div>

					<!-- Description -->
					<div class="-mr-4 flex-grow overflow-y-auto pr-4 text-center sm:text-left">
						{#if isValidString(musicItem.description)}
							<div class="mt-6 pt-6 mb-6 border-t border-zinc-200">
								<h3 class="mb-2 text-xl font-bold text-zinc-700">Description</h3>
								<CollapsibleText text={musicItem.description} maxLength={1000} />
							</div>
						{/if}

						<!-- Listen Section -->
						{#if (musicItem.recordings && musicItem.recordings.preview) || (musicItem.soundcloud && musicItem.soundcloud.url)}
							<div class="mt-8 mb-6">
								<h3 class="mb-4 text-xl font-bold text-zinc-700">Listen</h3>

								{#if musicItem.recordings && musicItem.recordings.preview}
									<!-- Streaming Preview -->
									<StreamingEmbed item={musicItem} />
								{:else if musicItem.soundcloud && musicItem.soundcloud.url}
									<!-- SoundCloud -->
									<SoundCloudEmbed
										trackUrl={musicItem.soundcloud.url}
										width={musicItem.soundcloud.width || '70%'}
										height={musicItem.soundcloud.height || 166}
										trackTitle={musicItem.soundcloud.title || musicItem.title}
									/>
								{/if}
							</div>
						{/if}

						<!-- Video Section -->
						{#if musicItem.videos && musicItem.videos.length > 0}
							<div class="mt-8 mb-6">
								<h3 class="mb-4 text-xl font-bold text-zinc-700">Watch</h3>
								{#each musicItem.videos as video, index}
									<YouTubeEmbed videoUrl={video} />
								{/each}
							</div>
						{/if}

						<!-- If there is no content bsides a description, show a spacer -->
						{#if isValidString(musicItem.description) && (!musicItem.videos || musicItem.videos.length === 0) && (!musicItem.recordings || !musicItem.recordings.preview) && (!musicItem.soundcloud || !musicItem.soundcloud.url)}
							<div class="mt-16">   </div>
						{/if}

						<!-- Contact Section -->
						 <!-- Show the contact section if there is any content such as description, videos, recordings, or soundcloud. -->
						{#if isValidString(musicItem.description) || (musicItem.videos && musicItem.videos.length > 0) || (musicItem.recordings && musicItem.recordings.preview) || (musicItem.soundcloud && musicItem.soundcloud.url)}
						<div class="mt-12 border-t border-zinc-200 pt-8">
							<div class="text-center">
								<h3 class="mb-3 text-lg font-bold text-zinc-700">
									Get in Touch!
								</h3>
								<p class="mb-6 text-md text-zinc-600">
									I'd love to hear from you about performances of this piece, questions, or collaborations!
								</p>
								<a
									href="/contact"
									class="inline-flex items-center rounded-3xl bg-zinc-800 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-zinc-700 hover:shadow-lg"
								>
									Contact Me!
								</a>
							</div>
						</div>
						{/if}
					</div>
					<!-- <hr class="mt-10 border-zinc-200 mb-0 pb-0 -mx-8"/> -->
				</div>
			</div>
		{:else}
			<!-- Placeholder to maintain layout -->
			<div class="mx-auto max-w-4xl px-4 relative z-[2]">
				<div class="h-96"></div>
			</div>
		{/if}
	</div>

	<!-- Footer -->
	<Footer />
{/if}
