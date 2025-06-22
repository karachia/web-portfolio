<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { formatDuration, formatDate } from '$lib/utils/formatters';
  import SoundCloudEmbed from '$lib/components/SoundCloudEmbed.svelte';
  import StreamingEmbed from '$lib/components/StreamingEmbed.svelte';
  import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';
  import CollapsibleText from '$lib/components/CollapsibleText.svelte';
  import { goto } from '$app/navigation';

  let musicItem: any = null;
  let loading = true;
  let error = false;

  onMount(async () => {
    try {
      const response = await fetch('/data/music.json');
      const music = await response.json();
      const id = $page.params.id;
      
      musicItem = music.find((item: any) => item.id === id);
      
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
    return array && Array.isArray(array) && array.some(item => isValidString(item));
  }
</script>

<svelte:head>
  <title>{musicItem ? `${musicItem.title} - Sina Karachiani` : 'Music - Sina Karachiani'}</title>
  <meta name="description" content={musicItem ? `Listen to ${musicItem.title} by Sina Karachiani` : 'Music by Sina Karachiani'} />
</svelte:head>

{#if loading}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-xl text-gray-600">Loading...</div>
  </div>
{:else if error || !musicItem}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Music piece not found</h1>
      <p class="text-gray-600 mb-6">The music piece you're looking for doesn't exist.</p>
      <button 
        on:click={goBack}
        class="px-6 py-2 bg-gray-900 text-white rounded shadow hover:bg-gray-700 transition-colors duration-200"
      >
        Back to Music
      </button>
    </div>
  </div>
{:else}
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Back button -->
      <button 
        on:click={goBack}
        class="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Music
      </button>

      <!-- Music content -->
      <div class="bg-white text-zinc-800 rounded-4xl shadow-2xl p-8 border border-zinc-200">
        <div class="flex-shrink-0 flex justify-between items-start mb-4">
          <div>
            <h1 class="text-3xl font-bold text-zinc-800">{musicItem.title}</h1>
            <p class="text-xl font-light italic text-zinc-600 mt-0">for {musicItem.for}</p>
            {#if isValidString(musicItem.dedication)}
              <p class="text-sm italic text-zinc-500">{musicItem.dedication}</p>
            {/if}
            <p class="text-md text-zinc-600 mt-2">{formatDuration(musicItem.length)} &nbsp;//&nbsp; {formatDate(musicItem.date)}</p>
            {#if isValidString(musicItem.detailed_instrumentation)}
              <div>
                <div class="text-md text-bold text-zinc-800 mt-2">
                  Instrumentation:
                </div>
                <div class="text-sm text-zinc-600">
                  {musicItem.detailed_instrumentation}
                </div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Description -->
        <div class="flex-grow overflow-y-auto pr-4 -mr-4">
          {#if isValidString(musicItem.description)}
            <div class="mb-6 mt-8">
              <h3 class="text-xl font-bold text-zinc-700 mb-2">Description</h3>
              <CollapsibleText text={musicItem.description} maxLength={530} />
            </div>
          {/if}

          <!-- Listen Section -->
          {#if (musicItem.recordings && musicItem.recordings.preview) || (musicItem.soundcloud && musicItem.soundcloud.url)}
            <div class="mb-6 mt-8">
              <h3 class="text-xl font-bold text-zinc-700 mb-4">Listen</h3>
              
              {#if musicItem.recordings && musicItem.recordings.preview}
                <!-- Streaming Preview -->
                <StreamingEmbed item={musicItem}/>
              {:else if musicItem.soundcloud && musicItem.soundcloud.url}
                <!-- SoundCloud -->
                <SoundCloudEmbed 
                  trackUrl={musicItem.soundcloud.url}
                  width={musicItem.soundcloud.width || "70%"}
                  height={musicItem.soundcloud.height || 166}
                  trackTitle={musicItem.soundcloud.title || musicItem.title}
                />
              {/if}
            </div>
          {/if}

          <!-- Video Section -->
          {#if musicItem.videos && musicItem.videos.length > 0}
            <div class="mb-6 mt-8">
              <h3 class="text-xl font-bold text-zinc-700 mb-4">Watch</h3>
              {#each musicItem.videos as video, index}
                <YouTubeEmbed videoUrl={video} />
              {/each}
            </div>
          {/if}
          
          <!-- Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 class="font-semibold text-zinc-600 mb-2">Details</h4>
              <p><strong>Category:</strong> {musicItem.category} ({musicItem.subcategory})</p>
              {#if isValidString(musicItem.detailed_instrumentation)}
                <p class="mt-2"><strong>Instrumentation:</strong> {musicItem.detailed_instrumentation}</p>
              {/if}
            </div>
            {#if isValidString(musicItem.soundcloud) || hasValidItems(musicItem.videos) || hasValidItems(musicItem.recordings)}
              <div>
                <h4 class="font-semibold text-zinc-600 mb-2">Links</h4>
                {#if isValidString(musicItem.soundcloud)}<a href={musicItem.soundcloud} class="text-orange-600 block hover:underline">Listen on SoundCloud</a>{/if}
                {#if hasValidItems(musicItem.videos)}{#each musicItem.videos as video}{#if isValidString(video)}<a href={video} class="text-red-600 block hover:underline">Watch Video</a>{/if}{/each}{/if}
                {#if hasValidItems(musicItem.recordings)}{#each musicItem.recordings as recording}{#if isValidString(recording)}<a href={recording} class="text-blue-600 block hover:underline">Listen to Recording</a>{/if}{/each}{/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if} 