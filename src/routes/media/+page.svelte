<script lang="ts">
  import { onMount } from 'svelte';
  import StreamingEmbed from '$lib/components/StreamingEmbed.svelte';
  import StreamingServiceLink from '$lib/components/StreamingServiceLink.svelte';
  import { formatDate } from '$lib/utils/formatters';
  import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { fade } from 'svelte/transition';

  let music: any[] = [];
  let recordings: any[] = [];
  let selected: any = null;
  let showModal = false;
  let mounted = false;

  onMount(async () => {
    try {
      const response = await fetch('/data/music.json');
      music = await response.json();
      
      // Filter for items that have recordings with actual content
      recordings = music.filter(item => 
        item.recordings && 
        Object.keys(item.recordings).length > 0 && 
        item.recordings.preview // Check if there's a preview
      );
    } catch (error) {
      console.error('Error loading music data:', error);
    }
  });

  // Set mounted to true after a brief delay to trigger fade-in
  setTimeout(() => {
    mounted = true;
  }, 100);

  function openModal(item: any) {
    selected = item;
    showModal = true;
  }
  function closeModal() {
    showModal = false;
    selected = null;
  }
  function isValidString(value: any): boolean {
    return value && typeof value === 'string' && value.trim() !== '';
  }
</script>

<svelte:head>
  <title>Sina Karachiani - Media & Recordings</title>
  <meta name="description" content="Explore media, recordings, and featured performances by Sina Karachiani." />
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-50">
  {#if mounted}
    <div class="flex-1 max-w-6xl mx-auto px-4 py-12" in:fade={{ duration: 1200 }}>
      <!-- Header -->
      <div class="text-center mt-4 mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Media & Recordings</h1>
        <p class="text-lg text-gray-700 max-w-2xl mx-auto">
          Explore selected recordings and media highlights.
        </p>
      </div>

      <!-- Latest Recordings Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-zinc-700 mb-12 italic text-center flex items-center justify-center gap-3">
          <img src="/assets/media-features/recording.png" alt="Recording Icon" class="w-9 h-9 inline-block align-middle" />
          Latest Recordings
        </h2>
        
        {#if recordings.length > 0}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each recordings as recording}
              <div class="group cursor-pointer" on:click={() => { if (!recording.comingSoon) openModal(recording); }}>
                <!-- Album Cover with Vinyl Sleeve Effect -->
                <div class="relative aspect-square bg-gradient-to-b from-gray-100 via-stone-50 via-stone-50 to-stone-100 rounded-none shadow-2xl overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105 p-3 flex items-center justify-center">
                  {#if recording.image}
                    <img 
                      src={recording.image} 
                      alt={`Cover art for ${recording.title}`}
                      class="w-full h-full object-contain"
                    />
                  {:else}
                    <!-- Placeholder when no image -->
                    <div class="w-full h-93/100 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div class="flex items-center justify-center">
                        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                        </svg>
                      </div>
                    </div>
                  {/if}
                  
                  <!-- Play overlay on hover -->
                  <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {#if recording.comingSoon}
                      <div class="bg-white/90 rounded-full px-5 py-2 text-gray-700 font-semibold text-base shadow">
                        Coming Soon
                      </div>
                    {:else}
                      <div class="bg-white/90 rounded-full p-3">
                        <svg class="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    {/if}
                  </div>
                </div>
                
                <!-- Caption -->
                <div class="text-center">
                  <h3 class="font-semibold text-gray-900 text-lg mb-1">{recording.title}</h3>
                  <p class="text-gray-600 text-sm italic">for {recording.for}</p>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <!-- No recordings available -->
          <div class="text-center py-12">
            <div class="max-w-md mx-auto">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
                <rect x="8" y="14" width="32" height="20" rx="4" stroke="currentColor" fill="none"/>
                <circle cx="24" cy="24" r="4" stroke="currentColor" fill="none"/>
                <rect x="20" y="20" width="8" height="8" rx="2" stroke="currentColor" fill="none"/>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No Recordings Available Yet</h3>
              <p class="text-gray-600">
                Recordings will appear here as they become available. Check back soon!
              </p>
            </div>
          </div>
        {/if}
      </section>

      <!-- Videos Section -->
      <section id="videos" class="mb-16">
        <h2 class="text-3xl font-bold text-zinc-700 mb-12 italic text-center flex items-center justify-center gap-3">
          <img src="/assets/media-features/video.png" alt="Video Icon" class="w-9 h-9 inline-block align-middle" />
          Videos
        </h2>
        {#if music.filter(item => item.videos && item.videos.length > 0).length > 0}
          <div class="flex flex-col gap-10">
            {#each music.filter(item => item.videos && item.videos.length > 0) as item}
              {#each item.videos as videoUrl}
                <div class="bg-white shadow-2xl rounded-2xl p-4 flex flex-col relative z-[2]">
                  <div>
                    <YouTubeEmbed videoUrl={videoUrl} width="w-full" title={item.title} />
                  </div>
                  <div class="grid grid-cols-2 gap-2 items-center">
                    <div>
                      <h3 class="font-semibold text-gray-900 text-lg mb-1">{item.title}</h3>
                    </div>
                    <div class="text-right">
                      <a class="text-purple-600 hover:underline font-medium" href={`/music/${item.id}`}>View full details &rarr;</a>
                    </div>
                  </div>
                  <div>
                    <p class="text-gray-600 text-sm italic">for {item.for}</p>
                  </div>
                </div>
              {/each}
            {/each}
          </div>
        {:else}
          <div class="text-center py-12">
            <div class="max-w-md mx-auto">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
                <rect x="8" y="14" width="32" height="20" rx="4" stroke="currentColor" fill="none"/>
                <circle cx="24" cy="24" r="4" stroke="currentColor" fill="none"/>
                <rect x="20" y="20" width="8" height="8" rx="2" stroke="currentColor" fill="none"/>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No Videos Available Yet</h3>
              <p class="text-gray-600">
                Videos will appear here as they become available. Check back soon!
              </p>
            </div>
          </div>
        {/if}
      </section>
    </div>
  {:else}
    <!-- Placeholder to maintain layout -->
    <div class="flex-1 max-w-6xl mx-auto px-4 py-12">
      <div class="h-96"></div>
    </div>
  {/if}

  <!-- Modal -->
  {#if showModal && selected}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" on:click={closeModal}>
      <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full md:w-[38rem] p-8 relative" on:click|stopPropagation>
        <!-- Close button -->
        <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-700" on:click={closeModal} aria-label="Close modal">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 28 28"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">{selected.title}</h2>
        <p class="text-md text-gray-700 italic mb-2">for {selected.for}</p>
        {#if isValidString(selected.dedication)}
          <p class="text-sm text-gray-500 italic mb-2">{selected.dedication}</p>
        {/if}
        {#if isValidString(selected.commissionedBy)}
          <p class="text-sm text-gray-500 mb-2">{selected.commissionedBy}</p>
        {/if}
        <p class="text-sm text-gray-600 mb-4">{formatDate(selected.date)}</p>
        <a class="inline-block mb-4 text-purple-600 hover:underline font-medium" href={`/music/${selected.id}`}>View full details &rarr;</a>
        {#if selected.recordings && selected.recordings.preview}
          <div class="mb-4">
            <StreamingEmbed item={selected} />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
<Footer /> 