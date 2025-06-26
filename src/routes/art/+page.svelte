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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each artwork as item}
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div class="aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.title || 'Artwork'}
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                on:error={() => this.src = '/assets/placeholderImage.png'}
              />
            </div>
            <div class="p-6">
              {#if item.title}
                <h3 class="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              {/if}
              <p class="text-gray-600 mb-3">{item.caption}</p>
              <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
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