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

	let musicItem: any = null;
	let loading = true;
	let error = false;
	let allMusic: any[] = [];

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

	function goBack() {
		goto('/#music');
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
	<title>{musicItem ? `${musicItem.title} - Sina Karachiani` : 'Music - Sina Karachiani'}</title>
	<meta
		name="description"
		content={musicItem
			? `Listen to ${musicItem.title} by Sina Karachiani`
			: 'Music by Sina Karachiani'}
	/>
</svelte:head>

{#if loading}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-xl text-gray-600">Loading...</div>
	</div>
{:else if error || !musicItem}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<h1 class="mb-4 text-2xl font-bold text-gray-800">Music piece not found</h1>
			<p class="mb-6 text-gray-600">The music piece you're looking for doesn't exist.</p>
			<button
				on:click={goBack}
				class="rounded bg-gray-900 px-6 py-2 text-white shadow transition-colors duration-200 hover:bg-gray-700"
			>
				Back to Music
			</button>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 py-8">
		<div class="mx-auto max-w-4xl px-4">
			<!-- Back button -->
			<button
				on:click={goBack}
				class="mb-6 flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-900"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
				Back to Music
			</button>

			<!-- Music content -->
			<div class="rounded-4xl border border-zinc-200 bg-white p-8 text-zinc-800 shadow-2xl">
				<div class="mb-4 flex flex-shrink-0 items-start justify-between">
					<div class="flex-1">
						<h1 class="text-3xl font-bold text-zinc-800">{musicItem.title}</h1>
						<p class="mt-0 text-xl font-light text-zinc-600 italic">for {musicItem.for}</p>
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

						<!-- Other Versions -->
						<OtherVersions {otherVersions} />
					</div>

					<!-- Image -->
					{#if isValidString(musicItem.image)}
						<div class="ml-8 flex-shrink-0 flex flex-col items-end">
							<img
								src={musicItem.image}
								alt={`Cover art for ${musicItem.title}`}
								class="h-48 w-48 rounded-2xl object-cover shadow-lg"
							/>
                            <!-- Category Tags -->
                            <CategoryTags category={musicItem.category} subcategory={musicItem.subcategory} />
                            
							<!-- Media Features -->
							<div class="mt-3 flex justify-end">
								<MediaFeatures item={musicItem} />
							</div>
						</div>
					{:else}
						<!-- Media Features (when no image) -->
						<div class="ml-8 flex flex-shrink-0 flex-col items-end justify-end">

                        <!-- Category Tags (when no image) -->
                        <CategoryTags category={musicItem.category} subcategory={musicItem.subcategory} />
                        <div class="mt-2.5"> <MediaFeatures item={musicItem} /></div>
						</div>
					{/if}
				</div>

				<!-- Description -->
				<div class="-mr-4 flex-grow overflow-y-auto pr-4">
					{#if isValidString(musicItem.description)}
						<div class="mt-6 pt-6 mb-6 border-t border-zinc-200">
							<h3 class="mb-2 text-xl font-bold text-zinc-700">Description</h3>
							<CollapsibleText text={musicItem.description} maxLength={530} />
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
                        <div class="mt-30">   </div>
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
							<button
								class="inline-flex items-center rounded-xl bg-zinc-800 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-zinc-700 hover:shadow-lg"
							>
								Contact Me!
							</button>
						</div>
					</div>
                    {/if}
				</div>
                <!-- <hr class="mt-10 border-zinc-200 mb-0 pb-0 -mx-8"/> -->
			</div>
		</div>
	</div>

	<!-- Footer -->
	<Footer />
{/if}
