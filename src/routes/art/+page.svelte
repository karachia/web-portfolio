<script lang="ts">
  import { onMount } from 'svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { goto } from '$app/navigation';

  let artwork: any[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch('/data/art.json');
      artwork = await response.json();
    } catch (err) {
      console.error('Failed to load artwork:', err);
    } finally {
      loading = false;
    }
  });

  function handleCommissionClick() {
    // TODO: Link to future contact form
    goto('/contact');
  }
</script>

<svelte:head>
  <title>Sina Karachiani - Art</title>
  <meta name="description" content="Explore the visual art of Sina Karachiani." />
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-50">
  <!-- Header Section -->
  <section class="max-w-4xl mx-auto mt-20 mb-16 px-4 text-center">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Visual Art</h1>
    <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
      I create visual art that explores the intersection of music, technology, and human expression. 
      My work ranges from traditional sketches and drawings to digital illustrations and experimental pieces 
      that bridge the gap between sound and visual form.
    </p>
    <button
      on:click={handleCommissionClick}
      class="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-200 hover:shadow-xl"
    >
      Get Commission / Collaborate
    </button>
  </section>

  <!-- Artwork Grid -->
  <section class="max-w-6xl mx-auto px-4 mb-20 flex-1">
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
          <div class="group cursor-pointer">
            <!-- Square Card with Image -->
            <div class="relative aspect-square bg-white border-1 border-zinc-100 rounded-none shadow-2xl overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
              <!-- Inner square space with consistent margins -->
              <div class="absolute inset-2 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title || 'Artwork'}
                  class="max-w-full max-h-full object-contain"
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

  <Footer />
</div> 