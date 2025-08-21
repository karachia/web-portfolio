<script lang="ts">
  import { onMount } from 'svelte';
  import FeaturedItemMinimal from './FeaturedItemMinimal.svelte';

  let featuredItems: any[] = [];
  let mounted = false;
  let scrollContainer: HTMLElement;

  onMount(async () => {
    try {
      const response = await fetch('/data/featured_items.json');
      featuredItems = await response.json();
      mounted = true;
    } catch (error) {
      console.error('Error loading featured items:', error);
      mounted = true;
    }
  });

  function handleScroll() {
    if (!scrollContainer) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const topFade = document.getElementById('top-fade');
    const bottomFade = document.getElementById('bottom-fade');
    
    if (topFade) {
      // Show top fade when scrolled down
      topFade.style.opacity = scrollTop > 10 ? '1' : '0';
    }
    
    if (bottomFade) {
      // Show bottom fade when not at bottom
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      bottomFade.style.opacity = isAtBottom ? '0' : '1';
    }
  }
</script>

{#if mounted && featuredItems.length > 0}
  <section class="w-full flex justify-center bg-gray-50">
    <!-- Centered container that matches hero content width -->
    <div class="w-full max-w-2xl lg:max-w-3xl">
      <!-- Section with subtle purple gradient background -->
      <div class="relative">
        <!-- Purple gradient background with transparent edges -->
        <div class="absolute inset-0"></div>
        
        <!-- Content container -->
        <div class="relative px-4 sm:px-6 py-6 sm:py-8">
          <!-- Section header -->
          <div class="flex justify-center sm:justify-start mb-6">
            <h2 class="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-900 via-amber-800 to-pink-700 bg-clip-text text-transparent inline-block">
              Latest Releases & News
            </h2>
          </div>
          
          <!-- Scrollable vertical stack of featured items (shows ~3 items) -->
          <div class="relative">
            <!-- Top fade overlay -->
            <div 
              id="top-fade" 
              class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-50 via-gray-50/80 to-transparent z-10 opacity-0 transition-opacity duration-300 pointer-events-none rounded-t-2xl"
            ></div>
            
            <!-- Bottom fade overlay -->
            <div 
              id="bottom-fade" 
              class="absolute -mb-1 bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent z-10 opacity-100 transition-opacity duration-300 pointer-events-none rounded-b-2xl"
            ></div>
            
            <div 
              bind:this={scrollContainer}
              on:scroll={handleScroll}
              class="max-h-64 overflow-y-auto scrollable-items pt-2 bg-gradient-to-tr from-transparent via-purple-200/30 to-transparent rounded-2xl"
            >
              <div>
                {#each featuredItems as item}
                  <FeaturedItemMinimal 
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    link={item.link}
                  />
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  /* Custom scrollbar styling for better cross-browser support */
  .scrollable-items {
    scrollbar-width: thin;
    scrollbar-color: rgb(196 181 253 / 0.5) transparent;
  }
  
  .scrollable-items::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollable-items::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollable-items::-webkit-scrollbar-thumb {
    background-color: rgb(196 181 253 / 0.5);
    border-radius: 3px;
  }
  
  .scrollable-items::-webkit-scrollbar-thumb:hover {
    background-color: rgb(196 181 253 / 0.7);
  }
</style>
