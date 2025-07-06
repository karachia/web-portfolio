<script lang="ts">
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';

  let artwork: any[] = [];
  let loading = true;
  let selectedArtwork: any = null;
  let showModal = false;
  let mounted = false;

  onMount(async () => {
    try {
      const response = await fetch('/data/art.json');
      artwork = await response.json();
    } catch (err) {
      console.error('Failed to load artwork:', err);
    } finally {
      loading = false;
    }
    mounted = true;
  });

  function handleCommissionClick() {
    // TODO: Link to future contact form
    goto('/contact');
  }

  function openModal(item: any) {
    selectedArtwork = item;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedArtwork = null;
  }

  function showPrev() {
    if (!selectedArtwork || artwork.length < 2) return;
    const idx = artwork.findIndex(a => a.id === selectedArtwork.id);
    const prevIdx = (idx - 1 + artwork.length) % artwork.length;
    selectedArtwork = artwork[prevIdx];
  }

  function showNext() {
    if (!selectedArtwork || artwork.length < 2) return;
    const idx = artwork.findIndex(a => a.id === selectedArtwork.id);
    const nextIdx = (idx + 1) % artwork.length;
    selectedArtwork = artwork[nextIdx];
  }
</script>

<svelte:head>
  <title>Sina Karachiani - Art</title>
  <meta name="description" content="Explore the visual art of Sina Karachiani." />
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-50">
  {#if mounted}
    <!-- Header Section -->
    <section class="max-w-4xl mx-auto mt-20 mb-16 px-4 text-center relative z-[2]" in:fade={{ duration: 1200 }}>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Visual Art</h1>
      <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        I've been drawing and painting since before I could speak, and it remains a deeply therapeutic and joyful way for me to express myself. 
        <br/>While many of my pieces find homes as heartfelt gifts for friends and family, this space showcases the diverse range of my work, 
        from traditional sketches and detailed drawings to digital illustrations, custom logos, and even cartoons and cards.
        
        <br/>
        <br/>
        <i>Interested in a collaboration or commissioning a unique piece?<br/>I'd love to hear from you!</i>
      </p>
      <button
        on:click={handleCommissionClick}
        class="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-3xl shadow-lg hover:bg-gray-700 transition-all duration-200 hover:shadow-xl"
      >
        Contact Me!
      </button>
    </section>

    <!-- Artwork Grid -->
    <section class="max-w-6xl mx-auto px-4 mb-20 flex-1 relative z-[2]" in:fade={{ duration: 1400 }}>
      {#if loading}
        <div class="flex justify-center items-center py-20">
          <div class="text-xl text-gray-600">Loading artwork...</div>
        </div>
      {:else if artwork.length === 0}
        <div class="text-center py-20">
          <p class="text-gray-600">No artwork available at the moment.</p>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {#each artwork as item}
            <div class="group cursor-pointer" on:click={() => openModal(item)}>
              <!-- Square Card with Image -->
              <div class="relative aspect-square bg-white border-1 border-zinc-100 group-hover:border-zinc-300 rounded-none shadow-2xl overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
                <!-- Inner square space with consistent margins -->
                <div class="absolute inset-2 flex items-center justify-center">
                  <img
                    src={item.thumbnail || item.image}
                    alt={item.title || 'Artwork'}
                    class="max-w-full max-h-full object-contain"
                    loading="lazy"
                    on:error={(e) => (e.target as HTMLImageElement).src = '/assets/placeholderImage.png'}
                  />
                </div>
                
                <!-- Enlarge overlay on hover -->
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div class="bg-white/70 rounded-full px-5 py-2 text-zinc-700 font-semibold text-base shadow">
                    ENLARGE
                  </div>
                </div>
              </div>
              
              <!-- Caption outside the card -->
              <div class="text-center">
                {#if item.title}
                  <h3 class="font-semibold text-gray-900 text-lg mb-1">{item.title}</h3>
                {/if}
                <p class="text-gray-600 text-sm italic mb-2">{item.caption}</p>
                <span class="inline-block px-3 py-1 bg-gradient-to-tr from-gray-200 via-white to-zinc-200 border-1 border-zinc-100 text-zinc-400 text-sm font-medium rounded-full">
                  {item.medium}
                </span>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </section>
  {:else}
    <!-- Placeholder to maintain layout -->
    <div class="max-w-4xl mx-auto mt-20 mb-16 px-4 text-center relative z-[2]">
      <div class="h-32"></div>
    </div>
    <div class="max-w-6xl mx-auto px-4 mb-20 flex-1 relative z-[2]">
      <div class="h-96"></div>
    </div>
  {/if}

  <!-- Modal -->
  {#if showModal && selectedArtwork}
    <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4" on:click={closeModal}>
      <!-- Absolute close button -->
      <button 
        class="fixed top-6 right-6 z-50 text-white hover:text-amber-300 transition-colors p-3" 
        on:click={closeModal}
        aria-label="Close modal"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <!-- Title -->
      {#if selectedArtwork.title}
        <div class="w-full max-w-4xl text-center mb-4">
          <h3 class="text-2xl font-semibold text-zinc-200 truncate">{selectedArtwork.title}</h3>
        </div>
      {/if}
      <!-- Image section with chevrons -->
      <div class="relative flex items-center justify-center w-full max-w-6xl">
        {#if artwork.length > 1}
          <!-- Left chevron -->
          <button
            class="fixed left-8 top-1/2 -translate-y-1/2 z-50 ml-2 p-2 rounded-full bg-black/40 hover:bg-zinc-700/80 hover:text-zinc-200 text-white transition-colors"
            on:click|stopPropagation={showPrev}
            aria-label="Previous artwork"
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        {/if}
        <img
          src={selectedArtwork.image}
          alt={selectedArtwork.title || 'Artwork'}
          class="max-w-full max-h-[80vh] w-auto h-auto object-contain"
          loading="lazy"
          on:error={(e) => (e.target as HTMLImageElement).src = '/assets/placeholderImage.png'}
        />
        {#if artwork.length > 1}
          <!-- Right chevron -->
          <button
            class="fixed right-8 top-1/2 -translate-y-1/2 z-50 mr-2 p-2 rounded-full bg-black/40 hover:bg-zinc-700/80 hover:text-zinc-200 text-white transition-colors"
            on:click|stopPropagation={showNext}
            aria-label="Next artwork"
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        {/if}
      </div>
      <!-- Footer info (now right under the image) -->
      <div class="w-full max-w-2xl mx-auto mt-6 text-center">
        <p class="text-zinc-300 italic text-md mb-4">{selectedArtwork.caption}</p>
        <span class="inline-block px-3 py-1.5 bg-zinc-800 text-zinc-200 text-sm font-medium rounded-full">
          {selectedArtwork.medium}
        </span>
      </div>
    </div>
  {/if}

  <Footer />
</div> 